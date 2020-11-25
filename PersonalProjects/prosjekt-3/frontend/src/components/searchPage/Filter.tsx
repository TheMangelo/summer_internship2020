import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import styled from "styled-components";
import {
  getAllCountries,
  getAllGenres,
  getAllLanguages,
  getSearchMovies,
} from "../../store/actionCreators";
import { NameIdList, State } from "../../store/types";
import { Input } from "semantic-ui-react";
import { Header } from "semantic-ui-react";

const FilterWrapper = styled.div`
  display: flex;
  width: 280px;
  flex-direction: column;
  margin: 10px;
`;

const LineWrapper = styled.div`
  margin: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.div`
  font-size: 15px;
`;

const CustomButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  margin: 5px;
  width: 100px;
  height: 40px;
  border: solid;
  border-radius: 3px;
  align-self: center;
  &:hover {
    cursor: pointer;
  }
`;

const Filter = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // States for backend data
  const [countries, setCountries] = useState<NameIdList>([]);
  const [languages, setLanguages] = useState<NameIdList>([]);
  const [genres, setGenres] = useState<NameIdList>([]);
  const [url, setUrl] = useState<URL>(new URL(window.location.href));

  // sets init values from url
  const [selectedCountries, setSelectedCountries] = useState<string | null>(
    url.searchParams.get("countries")
  );
  const [selectedLanguages, setSelectedLanguages] = useState<string | null>(
    url.searchParams.get("languages")
  );
  const [maxRuntime, setMaxRuntime] = useState<string | null>(
    url.searchParams.get("maxruntime")
  );
  const [minRuntime, setMinRuntime] = useState<string | null>(
    url.searchParams.get("minruntime")
  );
  const [minRating, setMinRating] = useState<string | null>(
    url.searchParams.get("minrating")
  );
  const [selectedGenres, setSelectedGenres] = useState<string | null>(
    url.searchParams.get("genres")
  );
  const [fromYear, setFromYear] = useState<string | null>(
    url.searchParams.get("minyear")
  );
  const [toYear, setToYear] = useState<string | null>(
    url.searchParams.get("maxyear")
  );

  // gets backend data
  const {
    countries: countriesPromise,
    isLoading: countriesLoading,
    errorMessage: countriesError,
  } = useSelector((state: State) => state.allCountriesReducer);

  const {
    languages: languagesPromise,
    isLoading: languagesLoading,
    errorMessage: languagesError,
  } = useSelector((state: State) => state.allLanguagesReducer);

  const {
    genres: genresPromise,
    isLoading: genresLoading,
    errorMessage: genresError,
  } = useSelector((state: State) => state.allGenresReducer);

  useEffect(() => {
    if (countriesPromise) {
      countriesPromise.then((r: NameIdList) => {
        setCountries(r);
      });
    } else {
      dispatch(getAllCountries());
    }
  }, [countriesPromise, dispatch]);

  // setting and getting backend data
  useEffect(() => {
    if (languagesPromise) {
      languagesPromise.then((r: NameIdList) => {
        setLanguages(r);
      });
    } else {
      dispatch(getAllLanguages());
    }
  }, [languagesPromise, dispatch]);

  useEffect(() => {
    if (genresPromise) {
      genresPromise.then((r: NameIdList) => {
        setGenres(r);
      });
    } else {
      dispatch(getAllGenres());
    }
  }, [genresPromise, dispatch]);

  if (languagesError) throw languagesError;
  if (countriesError) throw countriesError;
  if (genresError) throw genresError;

  // semantic ui dropdown input must be on this format
  const countriesDropdown = countries.map((country) => ({
    key: country.id,
    value: country.id,
    text: country.name,
  }));

  const languagesDropdown = languages.map((language) => ({
    key: language.id,
    value: language.id,
    text: language.name,
  }));

  const genresDropdown = genres.map((genre) => ({
    key: genre.id,
    value: genre.id,
    text: genre.name,
  }));

  // sets url search values
  const generateNewUrl = () => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("page", "0");
    maxRuntime
      ? newUrl.searchParams.set("maxruntime", maxRuntime)
      : newUrl.searchParams.delete("maxruntime");
    minRuntime
      ? newUrl.searchParams.set("minruntime", minRuntime)
      : newUrl.searchParams.delete("minruntime");
    selectedCountries
      ? newUrl.searchParams.set("countries", selectedCountries)
      : newUrl.searchParams.delete("countries");
    selectedLanguages
      ? newUrl.searchParams.set("languages", selectedLanguages)
      : newUrl.searchParams.delete("languages");
    selectedGenres
      ? newUrl.searchParams.set("genres", selectedGenres)
      : newUrl.searchParams.delete("genres");
    fromYear
      ? newUrl.searchParams.set("minyear", fromYear)
      : newUrl.searchParams.delete("minyear");
    toYear
      ? newUrl.searchParams.set("maxyear", toYear)
      : newUrl.searchParams.delete("maxyear");
    minRating
      ? newUrl.searchParams.set("minrating", minRating)
      : newUrl.searchParams.delete("minrating");
    setUrl(newUrl);
    return newUrl.search;
  };

  const executeFilter = () => {
    const searchText = generateNewUrl();
    history.push("/search" + searchText);
    search(searchText);
  };

  const search = React.useCallback(
    (search: string) => dispatch(getSearchMovies(search)),
    [dispatch]
  );

  return (
    <FilterWrapper>
      <Header as="h2" textAlign="center">
        Filter
      </Header>
      <LineWrapper>
        <Label>Min runtime:</Label>
        <Input
          placeholder="Minutes"
          value={
            minRuntime
              ? minRuntime === ""
                ? ""
                : parseFloat(minRuntime) / 60
              : ""
          }
          onChange={(e) => {
            if (e.target.value === "") setMinRuntime("");
            else if (parseFloat(e.target.value))
              setMinRuntime((parseFloat(e.target.value) * 60).toString());
          }}
        />
      </LineWrapper>
      <LineWrapper>
        <Label>Max runtime:</Label>
        <Input
          placeholder="Minutes"
          value={
            maxRuntime
              ? maxRuntime === ""
                ? ""
                : parseFloat(maxRuntime) / 60
              : ""
          }
          onChange={(e) => {
            if (e.target.value === "") setMaxRuntime("");
            else if (parseFloat(e.target.value))
              setMaxRuntime((parseFloat(e.target.value) * 60).toString());
          }}
        />
      </LineWrapper>
      <LineWrapper>
        <Label>Min rating:</Label>
        <Input
          placeholder="1-10"
          value={minRating ? minRating : ""}
          onChange={(e) => setMinRating(e.target.value)}
        />
      </LineWrapper>
      <LineWrapper>
        <Label>From year: </Label>
        <Input
          placeholder="Year (1920)"
          value={fromYear ? fromYear : ""}
          onChange={(e) => setFromYear(e.target.value)}
        />
      </LineWrapper>
      <LineWrapper>
        <Label>To year: </Label>
        <Input
          placeholder="Year (2020)"
          value={toYear ? toYear : ""}
          onChange={(e) => setToYear(e.target.value)}
        />
      </LineWrapper>
      <LineWrapper>
        <Label>Genres: </Label>
        {!genresLoading ? (
          <Dropdown
            placeholder="Select Genres"
            defaultValue={selectedGenres ? selectedGenres : ""}
            multiple
            search
            selection
            options={genresDropdown}
            onChange={(e, data) =>
              data.value && setSelectedGenres(data.value.toString())
            }
          />
        ) : (
          "loading..."
        )}
      </LineWrapper>
      <LineWrapper>
        <Label>Countries: </Label>
        {!countriesLoading ? (
          <Dropdown
            placeholder="Select Countries"
            defaultValue={selectedCountries ? selectedCountries : ""}
            multiple
            search
            selection
            options={countriesDropdown}
            onChange={(e, data) =>
              data.value && setSelectedCountries(data.value.toString())
            }
          />
        ) : (
          "loading..."
        )}
      </LineWrapper>
      <LineWrapper>
        <Label>Languages: </Label>
        {!languagesLoading ? (
          <Dropdown
            placeholder="Select Languages"
            defaultValue={selectedLanguages ? selectedLanguages : ""}
            search
            selection
            multiple
            options={languagesDropdown}
            onChange={(e, data) =>
              data.value && setSelectedLanguages(data.value.toString())
            }
          />
        ) : (
          "Loading..."
        )}
      </LineWrapper>
      <CustomButton id={"executeButton"} onClick={() => executeFilter()}>
        Execute
      </CustomButton>
    </FilterWrapper>
  );
};

export default Filter;
