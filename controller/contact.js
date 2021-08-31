const db = require("../models");
const Contact = db.Contact;

module.exports = (app) => {
  app.post("/contact", async (req, res) => {
    try {
      const { name, email, personalNumber, phone } = req.body;

      const contact = await Contact.create({
        name: name,
        email: email,
        personalNumber: personalNumber,
        phone: phone,
      });

      return res.status(200).json(contact);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  });
};
