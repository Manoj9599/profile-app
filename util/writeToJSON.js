const fs = require("fs"),
  path = require("path");

module.exports = writeJSON = async (req, res, jsonData) => {
  try {
    const filePath = path.join(__dirname, "users.json");
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
    return res.status(201).send(user);
  } catch (err) {
    console.error("Error writing JSON file:", err);
    return res.sendStatus(500);
  }
};
