import { Client, QueryResultRow } from "pg";
import { Rating } from "./../types";

export const getMovieRating = async (
  movie: QueryResultRow,
  client: Client
): Promise<Rating[]> => {
  const result = await client.query(
    "select rt.ratingname as name, rt.ratingtop as top, r.ratingvalue as value from movierating r inner join ratingtype rt on rt.id = r.ratingtype where movieid=$1::uuid union select 'User generated rating' as name, 10 as top, avg(value) as value from uservote where movieid =$1::uuid HAVING count(value) > 0",
    [movie.id]
  );
  for (let i = 0; i < result.rows.length; i++) {
    const row = result.rows[i];
    row.value = Number(row.value);
    row.top = Number(row.top);
  }
  return result.rows;
};
