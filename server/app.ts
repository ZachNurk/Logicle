import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import authRouter from "./routes/auth.ts";
import daysRouter from "./routes/days.ts";
import userDataRouter from "./routes/userData.ts";

const isProduction = process.env.NODE_ENV === "production";
const app = express();

app.use(helmet());

// Behind a reverse proxy (Vercel, Railway, etc.) in prod so we can trust x-forwarded-proto.
if (isProduction) {
  app.set("trust proxy", 1);
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https") {
      res.redirect(301, `https://${req.header("host")}${req.originalUrl}`);
      return;
    }
    next();
  });
}

// Credentialed CORS: cookies require an explicit origin (not "*"). In dev the
// frontend is same-origin via the Vite proxy, so this only matters in prod.
const frontendOrigin = process.env.FRONTEND_ORIGIN;
app.use(
  cors({
    origin: frontendOrigin ?? true,
    credentials: true,
  }),
);
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use("/api", authRouter);
app.use("/api/days", daysRouter);
app.use("/api/users", userDataRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Not Found" });
});

export default app;
