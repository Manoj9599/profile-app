const fs = require("fs"),
  path = require("path");

exports.readJSON = async () => {
  try {
    const filePath = path.join(__dirname, "users.json");
    const fileData = fs.readFileSync(filePath, "utf8");

    if (fileData.length > 0) {
      return JSON.parse(fileData);
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error reading JSON file:", error);
    throw error;
  }
};

exports.writeJSON = async (jsonData) => {
  try {
    const filePath = path.join(__dirname, "users.json");
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
    return true;
  } catch (err) {
    console.error("Error writing JSON file:", err);
    return false;
  }
};
