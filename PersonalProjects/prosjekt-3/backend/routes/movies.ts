import * as express from "express";
import { QueryResult } from "pg";

import { Actor, Genre, Movie, RatingType, RatingTypeExtended } from "../types";
import { getActors } from "../crud/actor";

import { Language } from "./../types";
import { getLanguages } from "./../crud/language";

import client from "./../db";
import { getDirectors } from "./../crud/director";
import { Director } from "../types";
import { getMovieRating } from "../crud/rating";
import { Rating } from "../types";
import { Country } from "../types";
import { getCountries } from "../crud/country";
import { Writer } from "../types";
import { getWriters } from "../crud/writer";
import { getGenres } from "../crud/genre";

const router = express.Router();

// Get poster to images
const getPoster = (movie: Movie) => {
  // static_endpoint is added as we didn't want to hardcode our endpoint, turned out to be ok as port can be modified
  return process.env.STATIC_ENDPOINT + `/static/posters/${movie.id}.png`;
};

// Aggregate more data to movies where we want nested data:)
const movieFields = async (result: QueryResult) => {
  for (let i = 0; i < result.rows.length; i++) {
    const row = result.rows[i];
    row.poster = getPoster(row);
    row.actors = await (<Promise<Actor[]>>getActors(row, client));
    row.directors = await (<Promise<Director[]>>getDirectors(row, client));
    row.languages = await (<Promise<Language[]>>getLanguages(row, client));
    row.ratings = await (<Promise<Rating[]>>getMovieRating(row, client));
    row.countries = await (<Promise<Country[]>>getCountries(row, client));
    row.writers = await (<Promise<Writer[]>>getWriters(row, client));
    row.genres = await (<Promise<Genre[]>>getGenres(row, client));
  }

  return result.rows;
};

// MOVIES FLITERING
router.get("/", async (req: express.Request, res: express.Response) => {
  // inital data if params not set
  let maxRunTime: number = 13140 * 10 ** 2;
  let minRunTime: number = 0;
  let hardCodedQueryParams: number = 8;
  let maxyear: number = 2020;
  let minyear: number = 1900;

  let minRating: number = 0;
  let maxRating: number = 100;

  let pageLength: number = 24;
  let offset: number = 0;

  // These should just have been Number(req.query.*), however, it broke ~12 hours before delivery, went for a secure cast.
  if (req.query.num) {
    pageLength = parseInt(String(req.query.num));
  }

  if (req.query.page) {
    offset = parseInt(String(req.query.page)) * pageLength;
  }

  if (req.query.maxruntime) {
    maxRunTime = parseInt(String(req.query.maxruntime)); // frontend handles like int
  }

  if (req.query.minruntime) {
    minRunTime = parseInt(String(req.query.minruntime)); // frontend handles like int
  }

  if (req.query.minyear) {
    minyear = parseInt(String(req.query.minyear));
  }

  if (req.query.maxyear) {
    maxyear = parseInt(String(req.query.maxyear));
  }

  if (req.query.maxrating) {
    maxRating = parseFloat(String(req.query.maxrating));
  }

  if (req.query.minrating) {
    minRating = parseFloat(String(req.query.minrating));
  }

  let result: QueryResult;

  const orderingMap: Map<String, String> = new Map();
  // We really don't want you to alter our data. Injection safe quries
  orderingMap.set("YEAR", "m.year");
  orderingMap.set("IMDB", "mr.ratingvalue");
  orderingMap.set("ID", "m.id");
  orderingMap.set("TITLE", "m.title");

  const orderingOptions: Map<String, String> = new Map();
  orderingOptions.set("ASC", "ASC");
  orderingOptions.set("DESC", "DESC");

  let orderByKey: string = "m.id";
  let orderByOption: string = "asc";

  if (req.query.sorttype) {
    if (orderingMap.has(String(req.query.sorttype))) {
      orderByKey = String(orderingMap.get(req.query.sorttype.toString()));
    }
  }

  if (req.query.sortvalue) {
    if (orderingOptions.has(String(req.query.sortvalue))) {
      orderByOption = String(
        orderingOptions.get(req.query.sortvalue.toString())
      );
    }
  }

  let title: string = "";

  if (req.query.title) {
    title = String(req.query.title);
  }

  let countries: string[] = [];
  let genres: string[] = [];
  let languages: string[] = [];
  let numRows: QueryResult = await client.query("select 980 as count"); // hard coded data:) (Takes no time)

  if (req.query.all === "true") {
    // If user is crazy and want all data (Actually don't take that much time without aggregated data)
    result = await client.query("select * from movie");
  } else {
    if (req.query.countries) {
      countries = String(req.query.countries).split(",");
    }
    let countryParams: string[] = [];

    for (
      let i = hardCodedQueryParams + 1;
      i <= countries.length + hardCodedQueryParams;
      i++
    ) {
      countryParams.push("$" + i + "::uuid");
    }

    let countriesString = "";
    if (countries.length > 0) {
      countriesString =
        " AND mc.countryid in (" + countryParams.join(",") + ") ";
    }

    if (req.query.genres) {
      genres = String(req.query.genres).split(",");
    }

    let genreParams: string[] = [];

    for (
      let i = hardCodedQueryParams + 1 + countryParams.length;
      i < hardCodedQueryParams + 1 + countryParams.length + genres.length;
      i++
    ) {
      genreParams.push("$" + i + "::uuid");
    }
    let genreString: string = "";
    if (genres.length > 0) {
      genreString = " AND mg.genreid in (" + genreParams.join(",") + ") ";
    }

    if (req.query.languages) {
      languages = String(req.query.languages).split(",");
    }

    let languagesParams: string[] = [];

    let languagesString: string = "";

    for (
      let i =
        hardCodedQueryParams + 1 + countryParams.length + genreParams.length;
      i <
      hardCodedQueryParams +
        1 +
        countryParams.length +
        genreParams.length +
        languages.length;
      i++
    ) {
      languagesParams.push("$" + i + "::uuid");
    }
    // please
    if (languages.length > 0) {
      languagesString =
        " AND ml.languageid in (" + languagesParams.join(",") + ") ";
    }

    // give
    const movieSelections =
      "m.title, m.id, m.year, m.rated, m.released, m.runtime, m.imdbid, m.plot, m.production, m.imdbvotes"; // we are only fetching movie fields as there's no way setting aggregated data without more db calles
    // us
    const basicQuery = (selections: string) => {
      return (
        "select " +
        selections +
        " from movie m inner join moviecountry mc on m.id = mc.movieid inner join movierating mr on m.id = mr.movieid inner join ratingtype rt on rt.id = mr.ratingtype inner join moviegenre mg on mg.movieid = m.id inner join movielanguage ml on ml.movieid = m.id where runtime <= $3 AND runtime >= $4 AND year <= $5 AND year >= $6 AND mr.ratingvalue <= $7 AND mr.ratingvalue >= $8 AND rt.id = $2::uuid and m.title ILIKE $1 " +
        countriesString +
        genreString +
        languagesString
      );
    };

    // 5/5

    // Can't count number of rows as we are limiting, so we need to count in another qurie

    numRows = await client.query(basicQuery("distinct count( distinct m.id)"), [
      `%${title}%`,
      "0feca0eb-d8e4-488c-b1d1-885892ed655d", // IMBD ID
      maxRunTime,
      minRunTime,
      maxyear,
      minyear,
      maxRating,
      minRating,
      ...countries.map(String).map((r: any) => r.replace(" ", "")),
      ...genres.map(String).map((r: any) => r.replace(" ", "")),
      ...languages.map(String).map((r: any) => r.replace(" ", "")),
    ]);

    result = await client.query(
      basicQuery(movieSelections) +
        " GROUP BY m.id, mr.ratingvalue ORDER BY " +
        orderByKey +
        " " +
        orderByOption +
        " LIMIT $" +
        `${
          hardCodedQueryParams +
          countries.length +
          genres.length +
          languages.length +
          1
        }` +
        " OFFSET $" +
        `${
          hardCodedQueryParams +
          countries.length +
          genres.length +
          languages.length +
          2
        }`,
      [
        `%${title}%`,
        "0feca0eb-d8e4-488c-b1d1-885892ed655d", // IMBD ID
        maxRunTime,
        minRunTime,
        maxyear,
        minyear,
        maxRating,
        minRating,
        ...countries.map(String).map((r: any) => r.replace(" ", "")),
        ...genres.map(String).map((r: any) => r.replace(" ", "")),
        ...languages.map(String).map((r: any) => r.replace(" ", "")),
        pageLength,
        offset,
      ]
    );
  }

  for (let i = 0; i < result.rows.length; i++) {
    result.rows[i].poster = getPoster(result.rows[i]);
  }

  // const rows = await movieFields(result);
  res.json({
    rows: result.rows,
    numberOfRows: parseInt(numRows.rows[0].count),
  });
});

// Used in order to serve the random movies on HOMESCREEN
router.get("/random", async (req: express.Request, res: express.Response) => {
  const mode: number = Math.floor(Math.random() * 3);

  let sources: RatingTypeExtended[] = [
    {
      ratingname: "IMDB",
      id: "0feca0eb-d8e4-488c-b1d1-885892ed655d",
      ratingtop: 10,
      ratingBest: "desc",
      ratingWorst: "asc",
    },
    {
      ratingname: "Rotten tomatos",
      id: "629a18c0-6d56-4903-86b8-f607571285fe",
      ratingtop: 100,
      ratingBest: "asc",
      ratingWorst: "desc",
    },
    {
      ratingname: "Metacritic",
      id: "16e2a4ec-5474-41ea-a582-6c5ca58b1e21",
      ratingtop: 100,
      ratingBest: "desc",
      ratingWorst: "asc",
    },
  ];
  let source: number = Math.floor(Math.random() * 3);
  const modeText: string[] = [
    "Tilfeldige filmer",
    `Topp 3 filmer, kilde: ${sources[source].ratingname}`,
    `Topp 3 dårlige filmer, kilde: ${sources[source].ratingname}`,
  ];

  let result;

  if (mode === 0) {
    result = await client.query(
      "select m.title, m.id, m.year, m.released, m.runtime, m.imdbid, m.plot, m.production, m.imdbvotes from movie m ORDER BY RANDOM() LIMIT 3"
    );
  } else if (mode === 1) {
    let query = `select m.title, m.id, m.year, m.released, m.runtime, m.imdbid, m.plot, m.production, m.imdbvotes from movierating mr inner join movie m on m.id = mr.movieid inner join ratingtype rt on rt.id = mr.ratingtype where rt.id = $1::uuid order by ratingvalue ${sources[source].ratingBest} limit 3`;
    result = await client.query(query, [sources[source].id]);
  } else if (mode === 2) {
    let query = `select m.title, m.id, m.year, m.released, m.runtime, m.imdbid, m.plot, m.production, m.imdbvotes from movierating mr inner join movie m on m.id = mr.movieid inner join ratingtype rt on rt.id = mr.ratingtype where rt.id = $1::uuid order by ratingvalue ${sources[source].ratingWorst} limit 3`;
    result = await client.query(query, [sources[source].id]);
  }

  let rows = await movieFields(result);

  res.json({ data: rows, mode: { id: mode, desc: modeText[mode] } });
});

router.get("/:id", async (req: express.Request, res: express.Response) => {
  const id = req.params.id;
  try {
    const result = await client.query(
      "select m.title, m.id, m.year, m.rated, m.released, m.runtime, m.imdbid, m.plot, m.production, m.imdbvotes from movie m where id = $1::uuid",
      [id]
    );
    if (result.rows.length !== 1) throw "Not found";
    const rows = await movieFields(result);
    res.json(rows[0]);
  } catch (e) {
    if (e.code === "22P02") res.json({ error: true, err: "Invalid uuid" });
    res.status(404).json({ error: true, err: "Not found" });
  }
});
export default router;
