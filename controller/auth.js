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

      return res
        .cookie("access_token", token, {
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "",
        })
        .status(200)
        .json(user);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  });

  app.get("/auth/logout", (req, res) => {
    return res.clearCookie("access_token").status(200).json({
      message: "Logged out",
    });
  });
};
