export default {
  name: 'images',
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
      name: 'main',
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
      name: 'ProductId',
      type: 'number',
    }
  ],
  relations: [
    {
      type: 'n:1',
      foreignKey: 'ProductId',
      remoteEntity: 'products'
    }
  ]
}