import { Client, QueryResult, QueryResultRow } from "pg";

import { Actor } from "../types";

const getExtras = async (result: QueryResult) => {
  for (let i = 0; i < result.rows.length; i++) {
    const row = result.rows[i];
    row.image = process.env.STATIC_ENDPOINT + `/static/actors/${row.id}.jpg`;
  }
  return result.rows;
};

export const getActors = async (
  row: QueryResultRow,
  client: Client
): Promise<Actor[]> => {
  const result: QueryResult = await client.query(
    "select a.name, a.id from movieactor ma inner join actor a on a.id = ma.actorid where ma.movieid = $1::uuid",
    [row.id]
  );
  const rows = await getExtras(result);
  return rows;
};
