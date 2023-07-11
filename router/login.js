const bcrypt = require("bcrypt"),
  Joi = require("joi"),
  { readJSON } = require("../util/reader");

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .trim()
    .pattern(/^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[cC][oO][mM]$/)
    .required(),
  password: Joi.string()
    .trim()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

module.exports = login = async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { email, password } = req.body;
  let jsonData;

  try {
    jsonData = await readJSON();
    console.log(jsonData, "jsonData");
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).send(error);
  }

  const user = jsonData.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  if (!user) {
    return res
      .status(401)
      .json({ message: "user does not exist, please sign up" });
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  res.json(user);
};
