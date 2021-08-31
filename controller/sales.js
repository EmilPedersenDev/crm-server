const db = require("../models");
const Company = db.Company;
const Contact = db.Contact;

module.exports = (app) => {
  app.post("/sales", async (req, res) => {
    try {
      const { contactId, companyId } = req.body;

      const company = await Company.findByPk(companyId);
      const contact = await Contact.findByPk(contactId);

      if (!company || !contact) {
        throw new Error("No Company or Contact found.");
      }

      await contact.addCompany(company);

      return res.status(200).json(company);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  });
};
