import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const userLogin = async (req, res) => {
  const { user } = req.params;
  const username = { name: user };
  const accessToken = jwt.sign(username, process.env.ACCESS_TOKEN, {
    expiresIn: "1h",
  });
  res.json({ accessToken });
};

export default userLogin;
