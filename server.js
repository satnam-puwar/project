import express from "express";
import { webhookHandler } from "./testing";
console.log(webhookHandler,"test..")
const app = express();
const port = 8000;
app.use(express.json())
app.post("/webhook", async (req, res) => {
    try {
      const response = await webhookHandler(req.body);
      res.status(response.status).send(response.body);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

app.listen(port, () => {
  console.log("server started on http://localhost:", port);
});
