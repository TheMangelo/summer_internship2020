export type Actor = {
  name: string;
  id: string;
  image: string;
};

export type Language = {
  name: string;
  id: string;
};

export type Rating = {
  name: string;
  top: number;
  value: number;
};

export type RatingType = {
  id: string;
  ratingname: string;
  ratingtop: number;
};

export type RatingTypeExtended = RatingType & {
  ratingBest: string;
  ratingWorst: string;
};

export type Writer = {
  name: string;
  id: string;
};

export type Country = {
  name: string;
  id: string;
};

export type Director = {
  name: string;
  id: string;
  image: string;
};

export type Genre = {
  name: string;
  id: string;
};

export type Movie = {
  title: string;
  year: number;
  id: string;
  rated: string;
  production: string;
  imdvotes: number;
  plot: string;
  released: string;
  runtime: number;
};
