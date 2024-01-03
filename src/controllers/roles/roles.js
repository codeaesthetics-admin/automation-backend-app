const connection = require("../../db/sequelize_connection");
const { QueryTypes } = require("sequelize");

exports.createRole = async (req, res, next) => {
    try {
        let { role_name } = req.body;
        let queryString = `insert into roles (role_name, status ) 
            values (?, ?) `;
        let role = await connection.query(queryString, {
            replacements: [
                role_name, '0'
            ]
        });
        console.log(role)
        if (role) {
            res.status(200).json({
                status: true,
                message: 'Role created successfully'
            });
        } else {
            res.status(200).json({
                status: false,
                message: 'SomeThing Went Wrong Please Try Again Later..'
            })
        }

    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            status: false,
            message: 'SomeThing Went Wrong Please Try Again Later..'
        })
    }
};
exports.viewAllRoles = async (req, res, next) => {
    try {
        let { role_name } = req.body;
        let queryString = `Select * from roles`;
        let roles = await connection.query(queryString, {
            type: QueryTypes.SELECT
          });
        console.log(roles)
        if (roles && roles.length > 0) {
            res.status(200).json({
                status: true,
                message: 'Data fetched successfully',
                roles
            });
        } else {
            res.status(200).json({
                status: false,
                message: 'SomeThing Went Wrong Please Try Again Later..'
            })
        }

    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            status: false,
            message: 'SomeThing Went Wrong Please Try Again Later..'
        })
    }
};