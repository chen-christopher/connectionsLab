let express = require("express");
let Datastore = require("nedb");

const app = express();
app.use(express.json());

//initialize db

let db = new Datastore("posts.db");
db.loadDatabase();
app.use(
  express.urlencoded({
    extended: true,
  })
);

const posts = [];

app.use("/", express.static("public"));

app.post("/message", (req, res) => {
  db.insert(req.body, function (err, newDoc) {
    console.log(newDoc);
  });
  posts.push(req.body);
  console.log(posts);
  res.json({ message: "ok" });
});
app.get("/message", (req, res) => {
  let dataToSend;
  db.find({}, function (err, docs) {
    console.log(docs);
    dataToSend = { data: docs };
    res.json(dataToSend);
  });
});
app.listen("9000", () => {
  console.log("server is up");
});
