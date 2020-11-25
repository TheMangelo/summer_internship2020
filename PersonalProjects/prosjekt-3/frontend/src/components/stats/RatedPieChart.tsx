import React, { useEffect, useState } from "react";
import { createChartData } from "./functions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getRated } from "../../store/actionCreators";
import { State } from "../../store/types";
import { Header, keys, Wrapper } from "./consts";
import PieChartComponent from "./pieChartComponent/PieChartComponent";
import { RatedChartData } from "./types";

// Pie chart with age restrictions
const RatedPieChart = () => {
  const [rated, setRated] = useState<RatedChartData | undefined>(undefined);

  const dispatch = useDispatch();

  const { rated: ratedPromise, isLoading, errorMessage } = useSelector(
    (state: State) => state.ratedReducer
  );

  useEffect(() => {
    if (ratedPromise) {
      ratedPromise.then(
        (
          r: {
            rated: string;
            count: number;
          }[]
        ) => {
          setRated(r);
        }
      );
    } else {
      dispatch(getRated());
    }
  }, [ratedPromise, dispatch]);

  const data: Record<string, string | number>[] = [];
  let ratedMap: Map<string, number> = new Map();

  if (rated === undefined) return null;

  for (let i = 0; i < rated.length; i++) {
    ratedMap.set(rated[i].rated, rated[i].count);
  }

  for (let [key, value] of ratedMap) {
    data.push({ [keys.label]: key, [keys.value]: value });
  }
  const chartData = createChartData(data, keys);

  if (!chartData) return null;
  if (errorMessage) throw errorMessage;
  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <Wrapper>
      <Header>Rated movies</Header>
      <PieChartComponent valueKey={keys.value} chartData={chartData} />
    </Wrapper>
  );
};

export default RatedPieChart;
