export default {
  name: 'products',
  connector: 'mainDatabase',
  visible: true,
  properties: [
    {
      name: 'id',
      type: 'number',
      isPk: true
    },
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'color',
      type: 'string',
    },
    {
      name: 'type',
      type: 'number',
    },
    {
      name: 'createdAt',
      type: 'string',
    },
    {
      name: 'updatedAt',
      type: 'string',
    },
    {
      name: 'FamilyId',
      type: 'number',
    },
    {
      name: 'active',
      type: 'number',
    }
  ],
  hooks: {
    count: {
      async beforeResolver(props) {
        props.args.filter =  { id: { _eq: 1 }}
        return props
      }
    }
  },
  relations: [
    {
      type: 'n:1',
      foreignKey: 'FamilyId',
      remoteEntity: 'families'
    },
    {
      type: '1:n',
      foreignKey: 'ProductId',
      remoteEntity: 'images'
    }
  ]
}