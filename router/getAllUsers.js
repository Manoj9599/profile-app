const { readJSON } = require("../util/reader");

module.exports = getallUsers = async (req, res) => {
  try {
    let jsonData = await readJSON();
    res.status(200).send(jsonData);
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).send(error);
  }
};
