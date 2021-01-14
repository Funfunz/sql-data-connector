export const databaseTypeQuestion = {
  type: 'select',
  name: 'DBType',
  message: 'What is your database?',
  limit: 5,
  choices: [
    'PostgreSQL or Amazon Redshift',
    'MySQL or MariaDB',
    'SQLite3',
    'MSSQL'
  ], 
}

export const databaseQuestions = {
  'MySQL or MariaDB': [
    {
      type: 'input',
      name: 'DBHost',
      message: 'The hostname of the database you are connecting to.',
      initial: 'localhost',
      required: true,
    },
    {
      type: 'input',
      name: 'DBPort',
      message: 'The port number to connect to.',
      initial: '3306',
      required: true,
    },
    {
      type: 'input',
      name: 'DBLocalAddress',
      message: 'The source IP address to use for TCP connection.',
    },
    {
      type: 'input',
      name: 'DBSocketPath',
      message: 'The path to a unix domain socket to connect to. When used host and port are ignored.',
    },
    {
      type: 'input',
      name: 'DBUser',
      message: 'The MySQL user to authenticate as.',
      initial: 'root',
    },
    {
      type: 'password',
      name: 'DBPassword',
      message: 'The password of that MySQL user.',
      initial: '',
    },
    {
      type: 'input',
      name: 'DBDatabase',
      message: 'Name of the database to use for this connection.',
      initial: 'example_database',
    },
    {
      type: 'input',
      name: 'DBCharset',
      message: 'The charset for the connection. This is called "collation" in the SQL-level of MySQL (like utf8_general_ci). If a SQL-level charset is specified (like utf8mb4) then the default collation for that charset is used.',
      initial: 'UTF8_GENERAL_CI',
    },
    {
      type: 'input',
      name: 'DBTimezone',
      message: 'The timezone configured on the MySQL server. This is used to type cast server date/time values to JavaScript Date object and vice versa. This can be \'local\', \'Z\', or an offset in the form +HH:MM or -HH:MM.',
      initial: 'local',
    },
    {
      type: 'number',
      name: 'DBConnectTimeout',
      message: 'The milliseconds before a timeout occurs during the initial connection to the MySQL server.',
      initial: 10000,
    },
    {
      type: 'confirm',
      name: 'DBStringifyObjects',
      message: 'Stringify objects instead of converting to values. See issue #501.',
      initial: false,
    },
    {
      type: 'confirm',
      name: 'DBInsecureAuth',
      message: 'Allow connecting to MySQL instances that ask for the old (insecure) authentication method?',
      initial: false,
    },
    {
      type: 'confirm',
      name: 'DBTypeCast',
      message: 'Determines if column values should be converted to native JavaScript types.',
      initial: true,
    },
    {
      type: 'confirm',
      name: 'DBSupportBigNumbers',
      message: 'When dealing with big numbers (BIGINT and DECIMAL columns) in the database, you should enable this option.',
      initial: false,
    },
    {
      type: 'confirm',
      name: 'DBBigNumberStrings',
      message: 'Enabling both supportBigNumbers and bigNumberStrings forces big numbers (BIGINT and DECIMAL columns) to be always returned as JavaScript String objects. Enabling supportBigNumbers but leaving bigNumberStrings disabled will return big numbers as String objects only when they cannot be accurately represented with [JavaScript Number objects] (http://ecma262-5.com/ELS5_HTML.htm#Section_8.5) (which happens when they exceed the [-2^53, +2^53] range), otherwise they will be returned as Number objects. This option is ignored if supportBigNumbers is disabled.',
      initial: false,
    },
    {
      type: 'confirm',
      name: 'DBDateStrings',
      message: 'Force date types (TIMESTAMP, DATETIME, DATE) to be returned as strings rather than inflated into JavaScript Date objects. Can be true/false or an array of type names to keep as strings.',
      initial: false,
    },
    {
      type: 'confirm',
      name: 'DBDebug',
      message: 'Prints protocol details to stdout. Can be true/false or an array of packet type names that should be printed.',
      initial: false,
    },
    {
      type: 'confirm',
      name: 'DBTrace',
      message: 'Prints protocol details to stdout. Can be true/false or an array of packet type names that should be printed.',
      initial: false,
    },
    {
      type: 'confirm',
      name: 'DBSSL',
      message: 'Use SSL for the connection',
      initial: false,
    },
  ]
}