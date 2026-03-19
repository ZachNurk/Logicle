import cors from "cors";
import express from "express";
import authRouter from "./routes/auth.ts";
import daysRouter from "./routes/days.ts";
import userDataRouter from "./routes/userData.ts";

const port = Number(process.env.PORT ?? 3001);
const app = express();

// tells express to add headers to every response to allow the brwose rto make req from diff origin
app.use(cors());
app.use(express.json());

app.use("/api", authRouter);
app.use("/api/days", daysRouter);
app.use("/api/users", userDataRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});
