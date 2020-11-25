import { Client, QueryResult, QueryResultRow } from "pg";

import { Genre } from "../types";

export const getGenres = async (
  row: QueryResultRow,
  client: Client
): Promise<Genre[]> => {
  const result: QueryResult = await client.query(
    "select g.name, g.id from moviegenre mg inner join genre g on g.id = mg.genreid where mg.movieid = $1::uuid",
    [row.id]
  );
  return result.rows;
};
