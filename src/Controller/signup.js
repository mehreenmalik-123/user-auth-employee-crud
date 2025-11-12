import mysqlcon from '../DatabaseConn/db_connect.js';
import jwt from 'jsonwebtoken';
import emailValidator from 'email-validator';
import md5 from 'md5';
let secretkey = "hello@123"

export const signup_emp = async (req, res) => {

    try {
        let { username, email, password, confirm_password } = req.body;

        if (password !== confirm_password) {
            return res.status(202).json({
                message: "password mismatch"
            });
        }

        let details = {
            username,
            email,
            password: md5(password),
            confirm_password: confirm_password
        };

        console.log(details);

        let sql_query = `INSERT INTO tbl_signup SET ?`;
        let result = await mysqlcon(sql_query, [details]);


        if (result) {
            return res.status(200).json({
                message: "Signup Successfully",
                data: details,
            });
        } else {
            return res.status(202).json({
                message: "not Successfully",
                data: result
            })
        }
    } catch (err) {
        console.log("❌ ERROR:", err);  // <-- Add this line
        return res.status(500).json({
            message: "internal server error",
            error: err
        });
    }
}

export const login = async (req, res) => {

    try {
        let { email, password } = req.body;

        if (!email && !password) {
            return res.status(404).json({
                message: "please enter required data"
            })
        }
        if (!emailValidator.validate(email)) {
            return res.status(404).json({
                message: "invalid email"
            })
        }
        let sql = `SELECT * FROM tbl_signup WHERE email=? AND password=?`;
        let result = await mysqlcon(sql, [email, md5(password)])

        let token = jwt.sign(
            { id: result[0].id, email: result[0].email },
            secretkey,
            { expiresIn: "1h" }
        );

        if (result.length > 0) {
            return res.status(200).json({
                message: "Login Successfully",
                data: result[0],
                token: token
            })
        }

    } catch (err) {
        return res.status(500).json({
            message: "internal server error",
            error: err
        })
    }


}

