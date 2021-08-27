const db = require("../models");
const User = db.User;

module.exports = (app) => {
  app.post("/user", async (req, res) => {
    try {
      const { firstName, lastName, email, password, personalNumber } = req.body;

      const user = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        personalNumber: personalNumber,
      });

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err.message);
    }
  });

  app.get("/user", async (req, res) => {
    try {
      const users = await User.findAll();
      if (!users) {
        throw new Error("no users provided!");
      }

      res.json(users);
    } catch (err) {
      res.status(500).json(err.message);
    }
  });
};
