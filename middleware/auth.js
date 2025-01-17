const jwt = require("jsonwebtoken")
const dotenv  = require("dotenv");
dotenv.config();

const JWT_SECRET ='soumen'

exports.authentication = async (req, res, next)=>{
    try{
        const authHeader = req.header("Authorization");
        console.log(authHeader)
        if (!authHeader) {
            return res.status(401).json({ message: "Missing Authorization Header" });
        }
        const token = authHeader.split(" ")[1];
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2UzMGIxMTI2OGFmY2NkMzdmZjdmZiIsInVzZXJOYW1lIjoiYmFuZGFuYTUzNSIsImlhdCI6MTczNjMyNjEwNywiZXhwIjoxNzM2NDEyNTA3fQ.cCJAifpV0WqhZcy3yZbUIHaMbwSEWi4Tl0fxNoU8O6A"
        console.log(token)
        if(!token){
            return res.status(401).json({message: "Missing Token"});
        }
        try{
            const verified = await jwt.verify(token, JWT_SECRET);
            // console.log("verified")
            req.user = verified;
        }catch(err){
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token expired" });
            } else if (err.name === "JsonWebTokenError") {
                return res.status(401).json({ message: "Token is invalid" });
            } else {
                return res.status(500).json({ message: "Token verification error" });
            }
        }
        next();
    }catch(err){
        return res.status(401).json({
			message: `Something Went Wrong While Validating the Token`,
		});
    }
}