import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import styled from "styled-components";
import { getSearchMovies } from "../../store/actionCreators";
import Loading from "../Loading";

const DashboardWrapper = styled.div`
  display: flex;
  min-width: 200px;
  height: 45px;
  margin: 10px;
  align-items: center;
`;

const SortOrderButton = styled.img`
  max-width: 40px;
  max-height: 30px;
  &:hover {
    cursor: pointer;
  }
`;

// dropdown data is on this format
const sortOptions = [
  {
    key: "TITLE",
    text: "Movie title",
    value: "TITLE",
  },
  {
    key: "YEAR",
    text: "Production year",
    value: "YEAR",
  },
  {
    key: "IMDB",
    text: "IMDB rating",
    value: "IMDB",
  },
];

const Sort = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [sortType, setSortType] = useState<string | null>("TITLE");
  const [sortValue, setSortValue] = useState<string>("ASC");

  useEffect(() => {
    const searchKeys = new URL(window.location.href).search
      .substring(1)
      .split("&");
    searchKeys
      .map((e) => e.split("="))
      .forEach(([key, value]): void => {
        if (key === "sorttype") {
          setSortType(value);
        } else setSortType("TITLE");
        if (key === "sortvalue") setSortValue(value);
      });
  }, []);

  // sets url search values
  const generateNewUrl = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", "0");
    sortType
      ? url.searchParams.set("sorttype", sortType)
      : url.searchParams.delete("sorttype");
    sortValue
      ? url.searchParams.set("sortvalue", sortValue)
      : url.searchParams.delete("sortvalue");
    return url.search;
  };

  const executeSort = () => {
    const searchText = generateNewUrl();
    history.push("/search" + searchText);
    search(searchText);
  };

  const search = React.useCallback(
    (search: string) => dispatch(getSearchMovies(search)),
    [dispatch]
  );

  // executes sorting on state update
  useEffect(() => {
    executeSort();
    // eslint-disable-next-line
  }, [sortType, sortValue]); // disable linting because executeSort changes on every render and cannot be included in dependencys

  if (!sortType) return <Loading />;
  return (
    <DashboardWrapper>
      <Dropdown
        placeholder="Select sort (default: title)"
        defaultValue={sortType}
        fluid
        selection
        options={sortOptions}
        onChange={(e, data) => data.value && setSortType(data.value.toString())}
      />
      <SortOrderButton
        src="/sort.png"
        onClick={() => setSortValue(sortValue === "ASC" ? "DESC" : "ASC")}
      />
    </DashboardWrapper>
  );
};

export default Sort;
