import * as express from "express";
import { QueryResult } from "pg";

import client from "../db";

const router = express.Router();

// Get all countries

router.get("/", async (req: express.Request, res: express.Response) => {
  const result: QueryResult = await client.query(
    "select id, name from country order by name"
  );
  res.json(result.rows);
});

export default router;
