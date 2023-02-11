const mongoose = require("mongoose");

const { MONGO_URI } = process.env;
mongoose.set("strictQuery", false);

async function main() {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

main()
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((err) => console.log(err));

module.exports = mongoose;