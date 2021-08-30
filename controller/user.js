const db = require("../models");
const User = db.User;
const authorization = require("../middleware/auth.middleware");

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

  app.get("/user/:id", authorization, async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findOne({
        where: {
          id: id,
        },
      });
      if (!user) {
        throw new Error("no user provided!");
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err.message);
    }
  });
};
