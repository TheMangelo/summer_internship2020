import * as express from "express";
import { QueryResult } from "pg";

import client from "./../db";

const router = express.Router();

// Just an endpoint:)
router.get("/", async (req: express.Request, res: express.Response) => {
  res.json({
    ChartData: "/stats/moviesFromCountries",
    moviesByYear: "/stats/moviesByYear",
    moviesByRated: "/stats/moviesByRated",
  });
});

router.get(
  "/moviesFromCountries",
  async (req: express.Request, res: express.Response) => {
    const result = await client.query(
      "select c.name, c.id, count(c.id) from moviecountry mc inner join country c on c.id = mc.countryid group by c.id order by count(c.id) desc"
    );
    result.rows.forEach((row) => {
      row.count = Number(row.count);
    });

    const numberOfMovies = await client.query("select count(id) from movie");

    res.json({
      rows: result.rows,
      numberOfMovies: Number(numberOfMovies.rows[0].count),
    });
  }
);

router.get(
  "/moviesByYear",
  async (req: express.Request, res: express.Response) => {
    const result: QueryResult = await client.query(
      "select year, count(id) from movie group by year order by year asc"
    );
    result.rows.forEach((row) => {
      row.count = Number(row.count);
    });
    res.json(result.rows);
  }
);

// I do find these kind of self explaining
router.get(
  "/moviesByRated",
  async (req: express.Request, res: express.Response) => {
    const result: QueryResult = await client.query(
      "select rated, count(rated) from movie group by rated order by count(rated) desc"
    );
    result.rows.forEach((row) => {
      row.count = Number(row.count);
    });
    res.json(result.rows);
  }
);

export default router;
