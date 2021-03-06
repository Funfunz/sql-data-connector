const config = {
  connectors: {
    mainDatabase: {
      type: "@funfunz/sql-data-connector",
      config: {
        client: 'mysql2',
        host: "127.0.0.1",
        database: "test_db",
        user: "root",
        password: process.env.DB_PASSWORD || '',
        port: "3306"
      },
    }
  }
}
export default config