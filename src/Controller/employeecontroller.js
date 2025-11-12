import mysqlcon from '../DatabaseConn/db_connect.js';
import jwt from 'jsonwebtoken';
import emailValidator from 'email-validator';
import md5 from 'md5';
let secretkey = "hello@123";


export const add_employee = async (req, res) => {
    try {
        let { emp_id, emp_name, emp_salary, emp_department } = req.body;

        if (!emp_id || !emp_name || !emp_department || !emp_salary) {
            return res.status(202).json({
                message: "please required all the fields"
            })

        }
        let details = {
            emp_id,
            emp_name,
            emp_salary,
            emp_department
        }
        let sql_query = `Insert Into tbl_emp_data Set ?`;
        let result = await mysqlcon(sql_query, details);

        if (result) {
            return res.status(200).json({
                message: "Employee added Successfully",
                data: details
            })

        }
    } catch (error) {
        return res.status(500).json({
            message: error
        })

    }
}

export const read_employee = async (req, res) => {

    try {
        let { emp_id } = req.body;
        let sql_query = `Select * from tbl_emp_data Where emp_id =?`;
        let result = await mysqlcon(sql_query, [emp_id])

        if (result) {
            return res.status(200).json({
                message: "fetch employee detail successfully",
                data: result
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error
        })

    }
}

export const update_employee = async (req, res) => {
    try {
        const { emp_id } = req.body;
        const fields = req.body;

        if (!emp_id) {
            return res.status(400).json({ message: "Employee ID is required" });
        }

        if (Object.keys(fields).length === 0) {
            return res.status(400).json({ message: "No fields provided to update" });
        }

        // generat SQL dynamically
        const sql = `
      UPDATE tbl_emp_data 
      SET ${Object.keys(fields).map(key => `${key} = ?`).join(", ")}
      WHERE emp_id = ?
    `;

        const values = [...Object.values(fields), emp_id];

        const result = await mysqlcon(sql, values);

        return res.status(200).json({
            message: "Employee Updated Successfully",
            updatedFields: fields,
            data: result,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};


export const delete_employee = async (req, res) => {

    try {
        let { emp_id } = req.body;
        let sql_query = `Delete  from tbl_emp_data Where emp_id =?`;
        let result = await mysqlcon(sql_query, [emp_id])

        if (result) {
            return res.status(200).json({
                message: "Delete employee data ",
                data: result
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error
        })

    }

}


