import * as express from "express";
import * as cors from "cors";

import client from "./db";

//import * as path from "path";

import * as dotenv from "dotenv";
dotenv.config();
//dotenv.config({ path: path.resolve(__dirname, "../.env") });

import movies from "./routes/movies";
import languages from "./routes/language";
import countries from "./routes/countries";
import stats from "./routes/statistics";
import genres from "./routes/genres";
import user from "./routes/user";

const app = express();

const port: number = 9000;

const initials = "jlj";
// const allowList = ["localhost:3000", "it2810-80.idi.ntnu.no", `${'https://3000-ec98b8c9-65e1-4bd9-adf2-31c671ba3d69.ws.gitpod.idi.ntnu.no'/* me must dynamically update url from gitpob here in a way? */}`];

// const corsOptions = {
//   origin: (origin: any, callback: any) => {
//     const allowCors = allowList.indexOf(origin) >= 0;
//     callback(null, allowCors);
//   },
// };

// app.use(cors(corsOptions));

app.use((req: express.Request, res: express.Response, next) => {
  res.header("Access-Control-Allow-Origin", req.get("Origin") || "*"); // This is borrowed from the internet ass all fields had to be set, and we were sick of gitlab and their urls
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization, Content-Type, X-Requested-With, Range"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  } else {
    return next();
  }
});

// API URLS
app.use("/movies", movies);
app.use("/stats", stats);
app.use("/countries", countries);
app.use("/languages", languages);
app.use("/genres", genres);
app.use("/user", user);

// Dummy response with our initials
app.get(`/`, async (req: express.Request, res: express.Response) => {
  res.send({ authors: ["jlj", "høm", "maj"] });
});

// Used by frontend in order to check if backend is online
app.get("/health", async (req: express.Request, res: express.Response) => {
  res.send({ alive: true });
});

// Start server 👌
app.listen(port, () => {
  console.log(`Woop woop 🥳 Backend listening at port ${port}`);
});

module.exports = {};
