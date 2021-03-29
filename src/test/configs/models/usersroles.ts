export default {
  name: 'usersroles',
  connector: 'mainDatabase',
  visible: true,
  properties: [
    {
      name: 'createdAt',
      type: 'string',
    },
    {
      name: 'updatedAt',
      type: 'string',
    },
    {
      name: 'userId',
      type: 'number',
      isPk: true
    },
    {
      name: 'roleId',
      type: 'number',
      isPk: true
    }
  ],
  relations: [
    {
      type: 'n:1',
      foreignKey: 'userId',
      remoteEntity: 'users'
    },
    {
      type: 'n:1',
      foreignKey: 'roleId',
      remoteTable: 'roles'
    }
  ]
}