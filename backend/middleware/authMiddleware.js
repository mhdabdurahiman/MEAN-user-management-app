import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token);
  if (!token) {
    console.log("No token found");
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = data.id;
    req.idAdmin = data.isAdmin;
    return next();
  } catch {
    return res.sendStatus(403);
  }
}

export { authMiddleware }