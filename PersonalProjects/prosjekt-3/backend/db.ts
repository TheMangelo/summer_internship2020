import { Client } from "pg";

import * as dotenv from "dotenv";
dotenv.config();

// Connect to our database!

// Sorry for not letting you connect. We really are
const client: Client = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASS,
  port: 5432,
});
client.connect();

export default client;
