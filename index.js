import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import "dotenv/config";

const app = express();
const port = process.env.port;
const headerData = {
  "x-rapidapi-host": process.env.hostKey,
  "x-rapidapi-key": process.env.apiKey,
};
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.get("/", async (req, res) => {
  res.render("index.ejs");
});
app.get("/chapters/:chapterNumber/:lang", async (req, res) => {
  try {
    const chapterNumber = req.params.chapterNumber;
    const language = req.params.lang;
    const response = await axios.get(
      "https://bhagavad-gita3.p.rapidapi.com/v2/chapters/" +
        chapterNumber +
        "/",
      { headers: headerData }
    );
    res.render("chapters.ejs", {
      chapterData: response.data,
      language: language,
    });
  } catch (error) {
    console.error("Error : ", error.message);
  }
});
app.get("/verse/:verseNumber/:language", (req,res) =>{
  res.render("verse.ejs");
});
app.listen(port, () => {
  console.log(`Jai shree krishna, Server active at ${port}`);
});
