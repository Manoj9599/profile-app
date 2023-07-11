const { readJSON } = require("../util/reader");

module.exports = getBYyId = async (req, res) => {
  try {
    const id = req.params.id;
    let jsonData = await readJSON();
    const user = jsonData?.find((user) => user.id === parseInt(id));
    if (!user) {
      return res.status(500).json({ message: "No user available" });
    }
    return res.status(200).send(user);
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).send(error);
  }
};
