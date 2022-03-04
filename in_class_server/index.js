let campusCats = {
  laalo: {
    colour: "orange",
    hangout: "D2",
    age: 3,
  },
  grumpy: {
    colour: "black",
    hangout: "C2",
    age: 3,
  },
  snow: {
    colour: "white",
    hangout: "A5",
    age: 4,
  },
};

let express = require("express");
const res = require("express/lib/response");
let app = express();

app.use("/", express.static("public"));
app.get("/about", (req, res) => {
  res.send("this is maybe an about page");
});
app.get("/cats", (req, res) => {
  if (req.query.ageGreaterThan) {
    let minAge = req.query.ageGreaterThan;
    result = {};
    for (catName in campusCats) {
      let cat = campusCats[catName];
      if (cat.age >= minAge) {
        result[catName] = cat;
      }
    }
    res.json(result);
  }
  res.json(campusCats);
});
app.get("/cats/:cat", (req, res) => {
  console.log(req.params.cat);
  let name = req.params.cat;
  if (!campusCats[name]) {
    res.json({ error: "datano available" });
  }
  console.log(campusCats[name]);
  res.send(campusCats[name]);
});
app.listen(3000, () => {
  console.log("ifojrijigre");
});
