/** Local/self-hosted entry point (`npm run server`). Vercel uses `api/index.ts` instead. */
import app from "../server/app.ts";

const port = Number(process.env.PORT ?? 3001);

app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});
