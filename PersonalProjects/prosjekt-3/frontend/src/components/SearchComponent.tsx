import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Input } from "semantic-ui-react";
import { getSearchMovies } from "../store/actionCreators";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

type SearchComponentProps = {
  size?: "big" | "small" | "mini" | "large" | "huge" | "massive"; // semantic-ui sizes
  button?: boolean;
};

const Button = styled.button`
  cursor: pointer;
  display: inline-block;
  min-height: 1em;
  outline: 0;
  border: none;
  vertical-align: baseline;
  background: #e0e1e2 none;
  color: rgba(0, 0, 0, 0.6);
  font-family: Lato, "Helvetica Neue", Arial, Helvetica, sans-serif;
  margin: 0 0.25em 0 0;
  padding: 0.78571429em 1.5em 0.78571429em;
  text-transform: none;
  text-shadow: none;
  font-weight: 700;
  margin-top: -14px;
  line-height: 18px;
  font-style: normal;
  text-align: center;
  -webkit-text-decoration: none;
  position: relative;
  top: -2px;
  text-decoration: none;
  border-radius: 0.28571429rem;
  box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34, 36, 38, 0.15) inset;
  -webkit-user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: opacity 0.1s ease, background-color 0.1s ease,
    color 0.1s ease, box-shadow 0.1s ease, background 0.1s ease;
  transition: opacity 0.1s ease, background-color 0.1s ease, color 0.1s ease,
    box-shadow 0.1s ease, background 0.1s ease;
  will-change: "";
  -webkit-tap-highlight-color: transparent;
  :hover {
    background-color: #cacbcd;
    background-image: none;u
    box-shadow: 0 0 0 1px transparent inset,
      0 0 0 0 rgba(34, 36, 38, 0.15) inset;
    color: rgba(0, 0, 0, 0.8);
  }
`;

const CustomInput = styled(Input)`
  margin: 5px;
  @media (max-width: 530px) {
    width: 140px !important;
  }
`;

const SearchWrapper = styled.div`
  diplay: flex;
  justify-content: center;
  align-items: center;
`;

// Search for movies in PageHeader and at Home
const SearchComponent = ({ size = "large", button }: SearchComponentProps) => {
  let searchStringDefault = "";
  try {
    const queryString = window.location.href.split("?")[1];
    const queryData = queryString.split("&");
    queryData.forEach((element) => {
      const [key, value] = element.split("=");
      if (key === "title") searchStringDefault = value.replace("+", " ");
    });
  } catch {}

  const [searchString, setSearchString] = useState<string>(searchStringDefault);
  const dispatch = useDispatch();
  const history = useHistory();

  const search = React.useCallback(
    (text: string) => dispatch(getSearchMovies(text)),
    [dispatch]
  );

  const setUrlAndSearch = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("title", searchString);
    url.searchParams.set("page", "0");
    history.push("/search" + url.search);
    search(url.search || "");
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      setUrlAndSearch();
    }
  };
  return (
    <SearchWrapper>
      <CustomInput
        onKeyDown={(e: KeyboardEvent) => handleKeyDown(e)}
        icon="search"
        placeholder="Search..."
        size={size}
        autoFocus={true}
        value={searchString}
        onChange={(e: KeyboardEvent) =>
          setSearchString((e.target as HTMLTextAreaElement).value)
        }
      />
      {button && <Button onClick={() => setUrlAndSearch()}>Search</Button>}
    </SearchWrapper>
  );
};

export default SearchComponent;
