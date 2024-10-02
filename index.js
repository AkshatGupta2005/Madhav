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
app.get("/chapters", (req,res) => {
  res.render("chapters.ejs")
})
app.post("/searchChapter",(req, res) => {
    const chapterNumber = req.body.chapterNumber;
    const language = req.body.language;
    if(chapterNumber < 19 && chapterNumber > 0){
    res.redirect("/chapters/" + chapterNumber + "/" + language);
    }
    else{
      res.redirect("/chapters");
    }  
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

app.get("/verse/:chapterNumber/:verseNumber/:language/:verseCount",async (req, res) => {
  try {
    const chapterNumber = req.params.chapterNumber;
    const verseNumber = req.params.verseNumber;
    const language = req.params.language;
    const verseCount = req.params.verseCount;
    const response = await axios.get(
      "https://bhagavad-gita3.p.rapidapi.com/v2/chapters/" + chapterNumber + "/verses/" + verseNumber + "/",
      { headers: headerData }
    );
    res.render("verse.ejs", {
      verseData: response.data,
      language: language,
      verseCount: verseCount
    });
  } catch (error) {
    console.error("Error : ", error.message);
  }
});
app.post("/searchVerse/:chapterNumber/:language/:verseCount", async (req, res) => {
  try {
    const chapterNumber = req.params.chapterNumber;
    const verseNumber = req.body.searchInput;
    const language = req.params.language;
    const verseCount = req.params.verseCount;
    const response = await axios.get(
      "https://bhagavad-gita3.p.rapidapi.com/v2/chapters/" + chapterNumber + "/verses/" + verseNumber + "/",
      { headers: headerData }
    );
    res.render("verse.ejs", {
      verseData: response.data,
      language: language,
      verseCount: verseCount
    });
  } catch (error) {
    console.error("Error : ", error.message);
  }
});
app.listen(port, () => {
  console.log(`Jai shree krishna, Server active at ${port}`);
});
