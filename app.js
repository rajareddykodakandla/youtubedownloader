require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ytdl = require("ytdl-core");
const cors = require("cors");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;
app.listen(PORT,(req, res)=> {
    console.log(`server is running at ${PORT}`);
})

app.get("/", (req, res) => {
    res.render("index")
})
 
app.post("/download", async (req, res) => {
    const url = req.body.url;
    console.log(url);
        await ytdl(url, { filter: format => format.container === 'mp4' })
            .pipe(res).on('finish', (err) => {
                if (err) console.log(err);
                else console.log('Stream saved successfully.');
            })
})