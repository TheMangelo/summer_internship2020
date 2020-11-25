import { Client, QueryResult, QueryResultRow } from "pg";
import { Director } from "../types";

const getExtras = async (result: QueryResult) => {
  for (let i = 0; i < result.rows.length; i++) {
    const row = result.rows[i];
    row.image = process.env.STATIC_ENDPOINT + `/static/directors/${row.id}.jpg`;
  }
  return result.rows;
};

export const getDirectors = async (
  row: QueryResultRow,
  client: Client
): Promise<Director[]> => {
  const result = await client.query(
    "select d.id, d.name from moviedirector md inner join director d on d.id = md.directorid  where md.movieid = $1::uuid",
    [row.id]
  );
  const rows = getExtras(result);
  return rows;
};
