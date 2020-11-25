import { Client, QueryResultRow } from "pg";
import { Writer } from "./../types";

export const getWriters = async (movie: QueryResultRow, client: Client) => {
  const result = await client.query(
    "select w.name, w.id, mw.role from moviewriter mw inner join writer w on w.id = mw.writerid where mw.movieid = $1::uuid",
    [movie.id]
  );
  return result.rows;
};
