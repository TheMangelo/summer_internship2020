import * as express from "express";

import client from "../db";

import * as bodyParser from "body-parser";
import { QueryResult } from "pg";

const router = express.Router();

// generate new user!
router.post(
  "/register",
  async (req: express.Request, res: express.Response) => {
    // database has defaults to all
    const result = await client.query(
      "insert into appuser default values returning *"
    );
    res.send({ id: result.rows[0].id });
  }
);

router.get("/votes", async (req: express.Request, res: express.Response) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Unathorized");
  }
  const userId = req.headers.authorization.split(" ")[1];
  if (userId !== "null") {
    // if userid is set
    const result: QueryResult = await client.query(
      "select uv.value, m.id as movieid from uservote uv inner join movie m on m.id = uv.movieid where uv.userid = $1::uuid",
      [userId]
    );
    for (let i = 0; i < result.rows.length; i++) {
      result.rows[i].value = Number(result.rows[i].value); // we like numbers
    }
    res.send(result.rows);
  } else {
    res.status(401).send([]);
  }
});

// vote a movie!!
// could also have a put in ordre to update, however, it would complicate frontend work, so why don't do it here as we would want a check either way?
router.post(
  "/vote/:movieid",
  bodyParser.json(), // didnt wont to use the middleware on all requests as we only require it here atm
  async (req: express.Request, res: express.Response) => {
    if (!req.headers.authorization) {
      return res.status(401).send("Unathorized");
    }
    try {
      if (req.params.movieid && req.body.value) {
        const userId: string = req.headers.authorization.split(" ")[1];
        const result: QueryResult = await client.query(
          "insert into uservote (userid, movieid, value) values ($1::uuid, $2::uuid, $3) returning *",
          [userId, req.params.movieid, req.body.value]
        ); // could throw duplicate value if user tries to vote again
        res
          .status(201) // created
          .send({ id: result.rows[0].id, value: result.rows[0].value });
      } else {
        res.status(400).send({ error: true, err: "missing movieid" }); // bad request
      }
    } catch (e) {
      if (
        e.toString() ===
        'error: duplicate key value violates unique constraint "uniquemiduid"'
      ) {
        const userId: string = req.headers.authorization.split(" ")[1];
        const result: QueryResult = await client.query(
          "update uservote set value = $3 where userid=$1::uuid and movieid = $2::uuid returning *",
          [userId, req.params.movieid, req.body.value]
        );
        return res
          .status(200)
          .send({ id: result.rows[0].id, value: result.rows[0].value });
      }
      return res.status(401).send("Unathorized");
    }
  }
);

export default router;
