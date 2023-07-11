const Joi = require("joi"),
  bcrypt = require("bcrypt"),
  { readJSON, writeJSON } = require("../util/reader");

const schema = Joi.object({
  name: Joi.string().trim().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .pattern(/^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[cC][oO][mM]$/)
    .trim()
    .required(),
  password: Joi.string()
    .trim()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  confirm_password: Joi.string()
    .trim()
    .valid(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match provided password" }),
  age: Joi.number().integer().min(18).max(100).required(),
  gender: Joi.string().valid("male", "female", "other").required(),
  phoneNumber: Joi.string().length(3).pattern(/^\d+$/).required(),
});

module.exports = signup = async (req, res) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { name, email, password, confirm_password, age, phoneNumber, gender } =
    req.body;

  let jsonData;

  try {
    jsonData = await readJSON();
    console.log(jsonData, "jsonData");
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).send(error);
  }

  if (jsonData.some((user) => user.name === name)) {
    return res.status(409).json({ message: "Username already exists" });
  }

  if (jsonData.some((user) => user.email === email)) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = {
    id: jsonData.length + 1,
    name,
    email,
    password: hashedPassword,
    age,
    gender,
    phoneNumber,
  };

  jsonData.push(user);

  try {
    const response = await writeJSON(jsonData);
    if (response) {
      return res.status(201).send(user);
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).send(error);
  }
};
