const db = require("../models");
const User = db.User;
const { login } = require("../service/auth.service");

module.exports = (app) => {
  app.post("/auth/login", async (req, res) => {
    const { password, email } = req.body;

    if (!password || !email) {
      res.status(500).json({
        message: "No pasword or email!",
      });
    }
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw new Error("No user found.");
      }

      const token = login(res, req.body, user);

      return res.status(200).json({ user: user, token: token });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  });
};
