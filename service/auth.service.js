let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.login = (res, userRequest, user) => {
  let isPasswordMatching = bcrypt.compareSync(
    userRequest.password,
    user.password
  );

  if (!isPasswordMatching) {
    return res.status(401).send({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign({ id: user.id, name: user.name }, process.env.SECRET, {
    expiresIn: 86400, // 24 hrs
  });

  return token;
};
