import React, { useEffect, useState } from "react";
import { createChartData } from "./functions";
import { CountryChartData } from "./types";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCountriesNum } from "../../store/actionCreators";
import { State } from "../../store/types";
import { Header, keys, Wrapper } from "./consts";
import BarChartComponent from "./BarChartComponent";
import Loading from "../Loading";

const CountryBarChart = () => {
  const [countries, setCountries] = useState<CountryChartData>({
    rows: [{ name: "", id: "", count: 0 }],
    numberOfMovies: 0,
  });

  const dispatch = useDispatch();

  const { countries: moviesPromise, isLoading, errorMessage } = useSelector(
    (state: State) => state.countryNumReducer
  );

  useEffect(() => {
    if (moviesPromise) {
      moviesPromise.then(
        (r: {
          rows: { name: string; id: string; count: number }[];
          numberOfMovies: number;
        }) => {
          setCountries(r);
        }
      );
    } else {
      dispatch(getCountriesNum());
    }
  }, [moviesPromise, dispatch]);

  const data: Record<string, string | number>[] = [];
  let countryMap: Map<string, number> = new Map();

  if (countries.rows === undefined) {
    return <div>loading...</div>;
  }

  for (let i = 0; i < countries.rows.length; i++) {
    countryMap.set(countries.rows[i].name, countries.rows[i].count);
  }

  for (let [key, value] of countryMap) {
    data.push({ [keys.label]: key, [keys.value]: value });
  }
  const chartData = createChartData(data, keys);

  if (!chartData) return null;
  if (errorMessage) throw errorMessage;
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Wrapper>
      <Header>Top 10 countries</Header>
      <BarChartComponent
        chartData={chartData.slice(0, 10)}
        valueKey={keys.value}
        yAxisLabel="Movie Count"
      />
    </Wrapper>
  );
};

export default CountryBarChart;
