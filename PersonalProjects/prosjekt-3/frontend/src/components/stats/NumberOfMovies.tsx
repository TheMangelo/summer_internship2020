import React, { useEffect, useState } from "react";
import BigNumber from "./BigNumber";
import { useSelector } from "react-redux";
import { State } from "../../store/types";

const NumberOfMovies = () => {
  const [count, setCount] = useState<number>(0);

  const { countries: countriesPromise, isLoading, errorMessage } = useSelector(
    (state: State) => state.countryNumReducer
  );

  useEffect(() => {
    if (countriesPromise !== undefined) {
      countriesPromise.then((r) => {
        setCount(r.numberOfMovies);
      });
    }
  }, [countriesPromise]);

  if (errorMessage) throw errorMessage;
  if (isLoading) {
    return <div>loading...</div>;
  }
  return <BigNumber header="Number of movies in DB" value={count} />;
};

export default NumberOfMovies;
