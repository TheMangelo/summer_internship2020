import { Client, QueryResultRow } from "pg";
import { Country } from "./../types";

export const getCountries = async (
  movie: QueryResultRow,
  client: Client
): Promise<Country[]> => {
  const result = await client.query(
    "select c.id, c.name from moviecountry mc inner join country c on c.id = mc.countryid where mc.movieid=$1::uuid ",
    [movie.id]
  );
  return result.rows;
};
