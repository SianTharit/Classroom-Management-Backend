import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello, welcome to the Classroom API!");
});

app.listen(port, () => {
  const url = `http://localhost:${port}`;
  console.log(`Server is running at ${url}`);
});