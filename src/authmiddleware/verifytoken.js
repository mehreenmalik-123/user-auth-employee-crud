import jwt from "jsonwebtoken";

const secretkey = "hello@123"; // same key you used while generating token

export const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({
            message: "Token is required"
        });
    }

    // Remove "Bearer " prefix (optional but recommended)
    token = token.replace("Bearer ", "");

    jwt.verify(token, secretkey, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                message: "Invalid / Expired token",
                error: err
            });
        }

        req.user = decoded;  // attach decoded user info in request
        next();  // continue request
    });
};
