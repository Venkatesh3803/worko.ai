import Jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.cookie;
    try {
        const token = authHeader.split("=")[1];
        if (!token) return res.status(403).json("token not avaliable");
        Jwt.verify(token, process.env.JWT_ACCESS_TOKEN, async (err, user) => {
            if (err) return res.status(401).json(err.message);
            req.user = user;
            req.isAdmin = user.isAdmin
            next();
        })

    } catch (error) {
        return res.status(401).json(error.message);
    }
}


export const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        try {
         
            if (req.user.id === req.body.userId || req.user.userId === req.body.userId) {
                next();
            } else {
                return res.status(401).json(".....");
            }
        } catch (error) {
            res.status(401).json(error.message);
        }

    });
};
