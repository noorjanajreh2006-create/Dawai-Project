import jwt from "jsonwebtoken"; // to verify the token

function authMiddleware(req, res, next) { // Checks if the user is authenticated before accessing protected routes
  const authHeader = req.headers.authorization; // Stores the Authentication header: "Bearer <token>"

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const [scheme, token] = authHeader.split(" "); // split the Bearer and token into an array, scheme = Bearer & token = actual token

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || "dev-secret"); // return the decoded token, which contains the user information, and store it in req.user
    next(); // You can go to the next function in the route handler
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

export default authMiddleware;
