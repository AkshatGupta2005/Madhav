import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import "dotenv/config";
import nodemailer from "nodemailer";
const app = express();
const port = process.env.port;
const headerData = {
  "x-rapidapi-host": process.env.hostKey,
  "x-rapidapi-key": process.env.apiKey,
};
const transporter = nodemailer.createTransport({
  host: `smtppro.zoho.in`,
  port: "465",
  secure: true,
  auth: {
    user: process.env.userEmail,
    pass: process.env.pass,
  },
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.get("/", async (req, res) => {
  res.render("index.ejs");
});
app.get("/chapters", (req, res) => {
  res.render("chapters.ejs");
});
app.get("/verses", (req, res) => {
  res.render("verse.ejs");
});

app.post("/searchChapter", (req, res) => {
  const chapterNumber = req.body.chapterNumber;
  const language = req.body.language;
  if (chapterNumber != NaN) {
    if (chapterNumber < 19 && chapterNumber > 0) {
      res.redirect("/chapters/" + chapterNumber + "/" + language);
    } else {
      res.redirect("/chapters");
    }
  } else {
    res.redirect("/chapters");
  }
});
app.post("/searchVerse", async (req, res) => {
  const chapterNumber = req.body.chapterNumber;
  const verseNumber = req.body.verseNumber;
  const language = req.body.language;
  if (verseNumber != NaN && chapterNumber != NaN) {
    if (chapterNumber < 19 && chapterNumber > 0) {
      try {
        const response = await axios.get(
          "https://bhagavad-gita3.p.rapidapi.com/v2/chapters/" +
            chapterNumber +
            "/",
          { headers: headerData }
        );
        const verseCount = response.data.verses_count;
        if (verseNumber > 0 && verseNumber <= verseCount) {
          res.redirect(
            "/verse/" +
              chapterNumber +
              "/" +
              verseNumber +
              "/" +
              language +
              "/" +
              verseCount
          );
        } else {
          res.redirect("/verses");
        }
      } catch (error) {
        console.error("Error : ", error.message);
      }
    } else {
      res.redirect("/verses");
    }
  } else {
    res.redirect("/verses");
  }
});
app.get("/nextChapter/:chapter_number/:language", async (req, res) => {
  console.log(chapter_number);
  const language = req.params.language;
  try {
    const response = await axios.get(
      "https://bhagavad-gita3.p.rapidapi.com/v2/chapters/" +
        chapter_number +
        "/",
      { headers: headerData }
    );
    const verseCount = response.data.verses_count;
    res.redirect(
      "/verse/" + chapter_number + "/1/" + language + "/" + verseCount
    );
  } catch (error) {
    console.error("Error : ", error.message);
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

app.get(
  "/verse/:chapterNumber/:verseNumber/:language/:verseCount",
  async (req, res) => {
    try {
      const chapterNumber = req.params.chapterNumber;
      const verseNumber = req.params.verseNumber;
      const language = req.params.language;
      const verseCount = req.params.verseCount;
      const response = await axios.get(
        "https://bhagavad-gita3.p.rapidapi.com/v2/chapters/" +
          chapterNumber +
          "/verses/" +
          verseNumber +
          "/",
        { headers: headerData }
      );
      res.render("verse.ejs", {
        verseData: response.data,
        language: language,
        verseCount: verseCount,
      });
    } catch (error) {
      console.error("Error : ", error.message);
    }
  }
);
app.post("/searchVerse/:chapterNumber/:language/:verseCount", (req, res) => {
  const chapterNumber = req.params.chapterNumber;
  const verseNumber = req.body.searchInput;
  const language = req.params.language;
  const verseCount = req.params.verseCount;
  res.redirect(
    "/verse/" +
      chapterNumber +
      "/" +
      verseNumber +
      "/" +
      language +
      "/" +
      verseCount
  );
});
app.get("/authors", (req, res) => {
  res.render("authors.ejs");
});
app.post("/sendReview", async (req, res) => {
  const user = req.body.name;
  const feedbackEmail = req.body.email;
  const feedBack = req.body.review;

  async function main() {
    const info = await transporter.sendMail({
      from: `${user} <${process.env.userEmail}>`,
      to: "akshatguptaip@gmail.com",
      subject: "From Madhav",
      text: feedBack,
    });
    const reply = await transporter.sendMail({
      from: `"Madhav" <${process.env.userEmail}>`,
      to: `${feedbackEmail}`,
      subject: "Thank You for the Feedback!",
      text: `Radhe Radhe! ${user},

    I hope this message finds you well. I would like to extend my sincere thanks for taking the time to provide valuable feedback on Madhav. Your input is highly appreciated, and I assure you that I will carefully review your suggestions as I continue to refine and enhance the platform.

    Your feedback plays a crucial role in helping me deliver a better experience, and I am committed to implementing thoughtful updates and improvements based on the insights shared.

    Please note that this is an auto-generated email, and no reply is necessary. However, I look forward to your continued engagement with the platform as it evolves.

    Thank you once again for your contribution.

    Best regards,
    Akshat Gupta`,
    });
    console.log("Message sent: %s", info.messageId);
  }
  main().catch(console.error);
  res.redirect("/");
});
app.listen(port, () => {
  console.log(`Jai shree krishna, Server active at ${port}`);
});
