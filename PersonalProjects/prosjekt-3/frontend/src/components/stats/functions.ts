//The charts only supports data with these keys
export const createChartData = (
  data: Record<string, string | number>[] | undefined,
  axisKeys: Record<string, string>
) => {
  if (!data) return null;
  const newData = data
    .filter((item: Record<string, string | number>) => item[axisKeys.value] > 0)
    .map((item: Record<string, string | number>) => {
      return {
        category: item[axisKeys.label],
        nameKey: "xx",
        [axisKeys.value]: parseInt(item[axisKeys.value].toString(), 10),
      };
    });
  return newData;
};

export const ensureNumber = (param: string | number) => {
  if (typeof param === "number") {
    return param;
  }
  return parseInt(param, 10);
};

export const getTotalCount = (
  chartData: Record<string, string | number>[],
  key: string
) => chartData.reduce((acc, data) => acc + ensureNumber(data[key]), 0);
