//import json
const fragrances = require("./fragrance.json");
console.log(fragrances);

//instantiate express
let express = require("express");
const res = require("express/lib/response");
let app = express();

//show static website
app.use("/", express.static("public"));

//different queries to filter for: brand and gender
app.get("/fragrance", (req, res) => {
  console.log(req.query.brand);
  if (req.query.brand) {
    let brandQuery = req.query.brand;
    let result = {};
    for (brandName in fragrances) {
      let fragrance = fragrances[brandName];
      //realized that the query input will be different so have to strip white space and lower case them
      let modFragrance = fragrance.brand.toLowerCase();
      modFragrance = modFragrance.replace(/\s/g, "");
      if (modFragrance == brandQuery.toLowerCase()) {
        result[brandName] = fragrance;
      }
    }
    res.json(result);
  }
  //for genders
  if (req.query.gender) {
    let genderQuery = req.query.gender;

    let result = {};
    for (brandName in fragrances) {
      let fragrance = fragrances[brandName];
      if (fragrance.gender == genderQuery) {
        result[brandName] = fragrance;
      }
    }
    res.json(result);
  }
  res.json(fragrances);
});
//gets top 3 (used a ranking field for the data)
app.get("/fragrance/top", (req, res) => {
  console.log("top3");
  let result = {};
  for (brandName in fragrances) {
    if (fragrances[brandName].ranking <= 3)
      result[brandName] = fragrances[brandName];
  }
  res.json(result);
});
//can get the ranking of eahch but didn't implement on the front end side
app.get("/fragrance/:num", (req, res) => {
  console.log(req.params.num);
  let ranking = req.params.num;

  for (brandName in fragrances) {
    if (fragrances[brandName].ranking == ranking)
      result[brandName] = fragrances[brandName];
  }
  res.json(result);
});
app.listen(5000, () => {
  console.log("server is up");
});
