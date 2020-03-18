const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017/test", function(err, client) {
  if (err) {
    console.log(err);
  } else {
    console.log("connected");
  }

  const db = client.db("test");

  db.collection("Student").insertOne(
    {
      name: "asd",
      age: 13,
      address: "dont know"
    },
    function(err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(JSON.stringify(result.ops, undefined, 2));
      }
    }
  );

  client.close();
});
