require("dotenv").config()

const express = require('express')
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("connected successfully")

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    mobileNumber: Number,
    email: String,
    address: String,
    institute: String

  });

const User = mongoose.model('userdetail', userSchema);

// const user = new User({ firstName: 'dilraj', lastName: 'singh', mobileNumber: '8890049370', email: 'happydilraj1022@gmail.com', address: 'alipura', institute: 'IIT BHU' });

// user.save();

app.post("/register", async (req, resp) => {
    try {
        const user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        if (result) {
            // delete result.password;
            resp.send(req.body);
            console.log(result);
        } else {
            console.log("User already register");
        }
 
    } catch (e) {
        resp.send("Something Went Wrong");
    }
});

app.listen(port);