// Chart data must be on this format
export type ChartDataFormat = {
  [x: string]: string | number;
  category: string | number;
  nameKey: number | string;
};

// Basis for all chart props
export interface BaseChartProps {
  chartData: ChartDataFormat[];
  valueKey: string;
}

// Props for cartesian charts
export interface CartesianChartProps extends BaseChartProps {
  yAxisLabel: string;
}

export type CountryChartRow = {
  name: string;
  id: string;
  count: number;
};

// data from backend for country, movies and rated charts.
export type CountryChartData = {
  rows: CountryChartRow[];
  numberOfMovies: number;
};

export type MoviesByYearChartData = {
  year: number;
  count: number;
}[];

export type RatedChartData = {
  rated: string;
  count: number;
}[];
