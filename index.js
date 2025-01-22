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
app.use(		
	cors({
		// origin:"https://study-monk-client.vercel.app",
		// origin:"http://localhost:3000",
		// credentials:true,
	})
)
const PORT = 8000;

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB Connected"))
    .catch( (error) => {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    } )
cloudinaryConnect();


app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)

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
