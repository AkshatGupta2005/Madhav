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
  try {
    const response = await axios.get(
      "https://bhagavad-gita3.p.rapidapi.com/v2/chapters/?skip=5&limit=18",
      { headers: headerData }
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error : ", error.message);
  }
});

app.listen(port, () => {
  console.log(`Jai shree krishna, Server active at ${port}`);
});
