import { Client, QueryResultRow } from "pg";

import { Language } from "../types";

export const getLanguages = async (
  movie: QueryResultRow,
  client: Client
): Promise<Language[]> => {
  const result = await client.query(
    "select l.name, l.id from movielanguage ml inner join language l on l.id = ml.languageid WHERE ml.movieid = $1::uuid",
    [movie.id]
  );
  return result.rows;
};
