const MySQLAdapter = require('@bot-whatsapp/database/mysql')
const mysql = require('mysql2/promise');

/**
 * Declaramos las conexiones de MySQL
 */
/*
const MYSQL_DB_HOST = 'localhost'
const MYSQL_DB_USER = 'root'
const MYSQL_DB_PASSWORD = '1234'
const MYSQL_DB_NAME = 'bot'
const MYSQL_DB_PORT = '3306'
*/

const MYSQL_DB_HOST = 'junction.proxy.rlwy.net';
const MYSQL_DB_USER = 'root';
const MYSQL_DB_PASSWORD = 'GHokBXMoTedzAWIqDPiNnAPgSNFYEiMj';
const MYSQL_DB_NAME = 'railway'; // O usa el nombre de tu base de datos si es diferente
const MYSQL_DB_PORT = 21421;

// Configuración de la conexión a la base de datos
const bd = mysql.createPool({
    host: MYSQL_DB_HOST,     // Cambia por la dirección de tu servidor MySQL
    user: MYSQL_DB_USER,          // Usuario de MySQL
    password: MYSQL_DB_PASSWORD,          // Contraseña de MySQL
    database: MYSQL_DB_NAME, // Nombre de tu base de datos
    port: MYSQL_DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const bd1 = new MySQLAdapter({
    host: MYSQL_DB_HOST,
    user: MYSQL_DB_USER,
    database: MYSQL_DB_NAME,
    password: MYSQL_DB_PASSWORD,
    port: MYSQL_DB_PORT,
})

module.exports = { 
    bd,
    bd1
};
