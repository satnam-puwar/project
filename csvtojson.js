const csv = require("csv-parser");

function parseCSVToJson(csvStream) {
  return new Promise((resolve, reject) => {
    const results = [];
    csvStream
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
}
module.exports = parseCSVToJson;
