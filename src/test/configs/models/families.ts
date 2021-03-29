export default {
  name: 'families',
  connector: 'mainDatabase',
  visible: true,
  relations: [
    {
      type: '1:n',
      foreignKey: 'FamilyId',
      remoteEntity: 'products'
    }
  ],
  properties: [
    {
      name: 'id',
      type: 'number',
      isPk: true
    },
    {
      name: 'order',
      type: 'int',
    },
    {
      name: 'imageUrl',
      type: 'varchar(255)',
    },
    {
      name: 'name',
      type: 'varchar(255)',
    },
    {
      name: 'email',
      type: 'varchar(255)',
    },
    {
      name: 'createdAt',
      type: 'datetime',
    },
    {
      name: 'updatedAt',
      type: 'datetime',
    }
  ],
  hooks: {
    count: {
      async afterQueryResult(props) {
        props.results = 69
        return props
      }
    }
  },
}