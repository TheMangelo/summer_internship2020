import { calculateScore } from "../components/stats/NumberOfPoints";
import {
  ensureNumber,
  getTotalCount,
  createChartData,
} from "../components/stats/functions";

// mainly funtions for charts and chart data
test("ensureNumber test", () => {
  const value = ensureNumber("34");
  expect(value).toBe(34);
});

test("getTotalCount test", () => {
  const value = getTotalCount(
    [
      { name: "1", count: 4 },
      { name: "2", count: 7 },
    ],
    "count"
  );
  expect(value).toBe(11);
});

test("createChartData test", () => {
  const value = createChartData(
    [
      { name: "1", count: 4 },
      { name: "2", count: 7 },
    ],
    { label: "name", value: "count" }
  );
  expect(value).toStrictEqual([
    { category: "1", count: 4, nameKey: "xx" },
    { category: "2", count: 7, nameKey: "xx" },
  ]);
});

test("calculateScore test", () => {
  const value = calculateScore(10, 10, 10);
  expect(value).toBe(25);
});
