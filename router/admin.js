const { readJSON, writeJSON } = require("../util/reader");

module.exports = admin = async (req, res) => {
  const email = req.params.email;
  let jsonData;
  try {
    jsonData = await readJSON();
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).send(error);
  }

  let user = jsonData?.find((user) => user.email === email);

  if (!user) {
    return res.status(500).json("No User available");
  }
  const index = jsonData.findIndex((item) => item.email === email);
  if (index !== -1) {
    jsonData[index].isAdmin = true;
  }

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
