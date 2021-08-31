const db = require("../models");
const Company = db.Company;

module.exports = (app) => {
  app.post("/company", async (req, res) => {
    try {
      const { name, price } = req.body;

      const company = await Company.create({
        name: name,
        price: price,
      });

      return res.status(200).json(company);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  });
};
