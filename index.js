import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const headerData = {
  "x-rapidapi-host": "bhagavad-gita3.p.rapidapi.com",
  "x-rapidapi-key": "dd580d6bc6msh766841a9fe110fcp1480bcjsn2506daa2e22e",
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
