import { DispatchType } from "./store/types";

export type MovieData = {
  id: string;
  title: string;
  year: number;
  rated: string;
  poster: string;
  released: string;
  runtime: number;
  imdbid: string;
  plot: string;
  production: string;
  imdbvotes: number;
  genres: {
    name: string;
    id: string;
  }[];
  actors: {
    name: string;
    id: string;
    image: string;
  }[];
  directors: {
    id: string;
    name: string;
    image: string;
  }[];
  languages: {
    name: string;
    id: string;
  }[];
  ratings: {
    name: string;
    top: number;
    value: number;
  }[];
  countries: {
    id: string;
    name: string;
  }[];
  writers: {
    name: string;
    id: string;
    role: string;
  }[];
};
