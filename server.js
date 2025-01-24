const express = require("express");
const cors=require("cors")
const webhookHandler=require("./testing")
const app = express();
const port = 8000;
app.use(express.json())
app.use(cors())
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
