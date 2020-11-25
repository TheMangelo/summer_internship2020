import React from "react";
import renderer from "react-test-renderer";
import MoviePreview from "../components/searchPage/MoviePreview";

const data = {
  title: "Wreck-It Ralph",
  id: "0029e024-29ab-4fad-83a9-bcaf8ddd58d8",
  year: 2012,
  rated: "PG",
  released: "2012-11-02T00:00:00.000Z",
  runtime: 6060,
  imdbid: "tt1772341",
  plot:
    "A video game villain wants to be a hero and sets out to fulfill his dream, but his quest brings havoc to the whole arcade where he lives.",
  production: "Walt Disney Animation",
  imdbvotes: 373654,
  poster:
    "http://it2810-80.idi.ntnu.no:3000/static/posters/0029e024-29ab-4fad-83a9-bcaf8ddd58d8.png",
  actors: [
    {
      name: "Pierce Brosnan",
      id: "c992636a-c578-48aa-9192-933ce0291150",
      image: "image",
    },
    {
      name: "Salma Hayek",
      id: "47f3bf69-8386-4c2c-b740-9e373400cb69",
      image: "image",
    },
    {
      name: "Woody Harrelson",
      id: "4d615f11-c87e-41d7-9030-77e9fe779c97",
      image: "image",
    },
    {
      name: "Don Cheadle",
      id: "545937de-01be-41d7-857d-9c580f01c976",
      image: "image",
    },
  ],
  directors: [
    {
      id: "44c6bba0-57b7-493d-aade-4606ee3a83e2",
      name: "Brett Ratner",
      image: "image",
    },
  ],
  languages: [
    {
      name: "English",
      id: "e5535d33-fbdd-401c-9ddb-805c892ad7d6",
    },
  ],
  ratings: [
    {
      name: "Internet Movie Database",
      top: 10,
      value: 6.3,
    },
    {
      name: "Rotten Tomatoes",
      top: 100,
      value: 18,
    },
    {
      name: "Metacritic",
      top: 100,
      value: 38,
    },
  ],
  countries: [
    {
      id: "554be33c-5fd2-4f36-bd15-f23f3c4d42db",
      name: "USA",
    },
  ],
  genres: [
    {
      id: "554be33c-5fd2-4f36-bd15-f23f3c4d42db",
      name: "Action",
    },
  ],
  writers: [
    {
      name: "Paul Zbyszewski",
      id: "986f67d6-6049-4987-9889-7f01406be7e6",
      role: "story",
    },
    {
      name: "Paul Zbyszewski",
      id: "986f67d6-6049-4987-9889-7f01406be7e6",
      role: "screenplay",
    },
    {
      name: "Craig Rosenberg",
      id: "1fceca8c-6516-4dc2-a858-65f4c1b487e1",
      role: "screenplay",
    },
  ],
};

test("<MoviePreview/> test ", () => {
  const component = renderer.create(<MoviePreview data={data} />).toJSON();
  expect(component).toMatchSnapshot();
});
