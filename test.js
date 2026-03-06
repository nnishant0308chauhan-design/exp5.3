const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://nnishant0308chauhan_db_user:Chauhan.10@cluster0.0yxhjrq.mongodb.net/ecommerceDB"
)
.then(() => console.log("Connected"))
.catch(err => console.log("Error:", err));