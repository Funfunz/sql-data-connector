import knex, { Knex } from 'knex'
import Debug from 'debug'
import { Funfunz } from '@funfunz/core/lib/index'
import type { ICreateArgs, IQueryArgs, IRemoveArgs, IUpdateArgs, DataConnector, IDataConnector } from '@funfunz/core/lib/types/connector'
import type { IEntityInfo } from '@funfunz/core/lib/generator/configurationTypes'
import type { FilterValues, IFilter, OperatorsType } from '@funfunz/core/lib/middleware/utils/filter'

function getPKs(TABLE_CONFIG: IEntityInfo) {
  return TABLE_CONFIG.properties.filter(
    (entity) => entity.isPk
  ).map(
    (property) => property.name
  )
}

function getEntityConfig(entity: string, entities: IEntityInfo[]) {
  return entities.filter(
    (entityData) => entityData.name === entity
  )[0]
}

const debug = Debug('funfunz:SQLDataConnector')

export class Connector implements DataConnector{
  public connection: Knex
  private funfunz: Funfunz
  constructor(connector: IDataConnector, funfunz: Funfunz) {
    this.funfunz = funfunz
    const client = (connector.config as Record<string, string>).client
    const connection = {
      ...connector.config as Record<string, unknown>
    }
    delete connection.client
   
    this.connection = knex({
      client: client,
      connection,
      asyncStackTraces: true,
      debug: true
    })
    debug('Start')
    Object.keys(connector).forEach(
      (key) => {
        debug(key, (connector)[key])
      }
    )
    debug('End')
  }

  public stop(): void {
    this.connection.destroy()
  }

  public query(args: IQueryArgs): Promise<Record<string, unknown>[] | number> {
    const query = this.connection(args.entityName)
    if (args.fields) {
      query.select(args.fields)
    }
    if (args.filter) {
      this.applyQueryFilters(query, args.filter)
    }
    if (args.skip || args.take) {
      this.paginate(query, args.skip, args.take)
    }
    if (args.count) {
      query.count('*', {as: 'count'})
    }
    return query.then(
      (results) => {
        if (args.count) {
          return results[0].count as number
        }
        return results
      }
    )
  }

  public update(args: IUpdateArgs): Promise<Record<string, unknown>[] | number> {
    const updateQuery = this.connection(args.entityName)

    this.applyQueryFilters(updateQuery, args.filter)
    
    return updateQuery.update(args.data).then(
      (updatedCount) => {
        if (updatedCount === 0) {
          return []
        }
        return this.query(args as IQueryArgs)
      }
    )
  }

  public create(args: ICreateArgs): Promise<Record<string, unknown>[] | Record<string, unknown> | number> {
    const createQuery = this.connection(args.entityName)
    return createQuery.insert(args.data).then(
      (ids) => {
        const entityConfig = getEntityConfig(args.entityName, this.funfunz.config().entities)
        const pks = getPKs(entityConfig)
        
        const queryArgs: IQueryArgs = args as IQueryArgs
        queryArgs.filter = {
          _and: []
        }
        
        ids.forEach(
          (id) => {
            pks.forEach(
              (pk, index) => {
                if (!queryArgs.filter) {
                  queryArgs.filter = {
                    _and: []
                  }
                } else if (!queryArgs.filter._and) {
                  queryArgs.filter._and = []
                }
                (queryArgs.filter._and as Array<unknown>).push({
                  [pk]: {
                    _eq: Array.isArray(id) ? id[index] : id
                  }
                })
              }
            )
          }
        )
        
        return this.query(queryArgs)
      }
    )
  }

  public remove(args: IRemoveArgs): Promise<number> {
    const removeQuery = this.connection(args.entityName)

    this.applyQueryFilters(removeQuery, args.filter)

    return removeQuery.del()
  }

  private paginate(query: Knex.QueryBuilder, skip = 0, take = 0) {
    if (skip > 0) {
      query.offset(skip)
    }
    if (take > 0) {
      query.limit(take)
    }
    return query
  }

  private applyQueryFilters(
    QUERY: Knex.QueryBuilder,
    filters: IFilter,
    unionOperator?: string,
  ): Knex.QueryBuilder<Record<string, unknown>, unknown> {
    let whereFound = false
    Object.keys(filters).forEach(
      (key) => {
        if (key === '_and' || key === '_or') {
          
          const value = (filters[key] as IFilter['_and'] | IFilter['_or']) || []
          let where = 'where'
          if (key === '_or'){
            where = 'orWhere'
          } else if (key === '_and') {
            if (!whereFound) {
              where = 'andWhere'  
            }
            whereFound = true
          }
  
          value.forEach(
            (entry) => {
              QUERY[where](
                (innerQuery) => {
                  this.applyQueryFilters(
                    innerQuery,
                    entry,
                    key === '_and' ? 'and' : 'or'
                  )
                }
              )
            }
          )
        } else if (key === '_exists') {
          console.log('exists')
        } else {
          const OPERATOR: OperatorsType = Object.keys(filters[key] as Record<OperatorsType, FilterValues>)[0] as OperatorsType
          let finalUnionOperator = ''
          if (unionOperator) {
            finalUnionOperator = unionOperator
          }
          this.operatorMatcher(OPERATOR, key, (filters[key] as Record<string, FilterValues>)[OPERATOR], QUERY, finalUnionOperator)
        }
      }
    )
    return QUERY
  }

  private operatorMatcher(
    operator: OperatorsType,
    column: string,
    value: FilterValues,
    query: Knex.QueryBuilder,
    unionOperator?: string
  ) {
    let where = 'where'
    if (unionOperator) {
      where = unionOperator === 'or' ? 'orWhere' : 'where'
    }
    switch (operator) {
    case '_eq':
      return query[where](column, value)
    case '_neq':
      return query[`${where}Not`](column, value)
    case '_lt':
      return query[where](column, '<', value)
    case '_lte':
      return query[where](column, '<=', value) 
    case '_gt':
      return query[where](column, '>', value)
    case '_gte':
      return query[where](column, '>=', value)
    case '_in':
      return query[`${where}In`](column, value as FilterValues[]) 
    case '_nin':
      return query[`${where}NotIn`](column, value as FilterValues[])
    case '_like':
      return query[where](column, 'like', value)
    case '_nlike':
      return query[where](column, 'not like', value) 
    case '_is_null':
      return query[`${where}Null`](column) 
    }
    
  }
}