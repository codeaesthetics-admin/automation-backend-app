const mysql = require('mysql');
module.exports = async function () {
    try {
        // Database connection
        let pool = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '12345',
            database: 'automation',
            multipleStatements: true
        });
        await pool.connect((err) =>{
            if(err){
                console.log("Cannot connect to the database", err)
            }else{
                console.log("MYSQL Database connected!")
            }
        });
    } catch (err) {
        console.log("Cannot connect to the database", err)
    }
}