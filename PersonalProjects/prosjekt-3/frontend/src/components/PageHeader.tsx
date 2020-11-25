import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import SearchComponent from "./SearchComponent";
import { Provider } from "react-redux";
import { store } from "..";

const HeaderWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 3px 20px 3px 20px;
  background: #142740;
  height: 60px;
`;

const Header = styled.div`
  font-weight: bold;
  font-size: 40px;
  margin: 4px;
  color: #ffffff;
  &:hover {
    color: #f23e16;
    cursor: pointer;
  }
  @media (max-width: 400px) {
    font-size: 25px;
  }
`;

// Used in all other components than Home
const PageHeader = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/");
  };
  return (
    <Provider store={store}>
      <HeaderWrapper>
        <Header onClick={handleClick}>MovieDB</Header>
        <SearchComponent />
      </HeaderWrapper>
    </Provider>
  );
};

export default PageHeader;
