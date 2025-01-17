const express = require('express')
const app = express();
const mongoose = require("mongoose")
// const database = require("./database")
const cors = require('cors')
const dotenv = require("dotenv");
const authRoute = require("./routes/auth")
const postRoute = require("./routes/post")
const {cloudinaryConnect} = require("./cloudinary")
const fileUpload = require("express-fileupload")
dotenv.config();


app.use(express.json());
app.use(cors());
const PORT = 8000;

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
cloudinaryConnect();


app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)
mongoose
    .connect("mongodb://127.0.0.1:27017/instagram", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

// database.connect();

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: 'Your server is up and running....'
    });
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})
