import React from "react";
import styled from "styled-components";
import { Header } from "./consts";

type BigNumberProps = {
  header: string;
  value: string | number;
  label?: string;
};

const TextWrapper = styled.div`
  opacity: 0.7;
  font-size: 14px;
`;

const NumberWrapper = styled.div`
  font-size: 80px;
  padding: 40px 0px 30px 0px;
`;

const ContentWrapper = styled.div`
  text-align: center;
`;

const Wrapper = styled.div`
  max-width: 290px;
  height: 50%;
  border-radius: 3px;
  border: solid;
  margin: 10px;
  background: rgb(250, 250, 250); ;
`;

const BigNumber = ({ header, label, value }: BigNumberProps) => (
  <Wrapper>
    <Header>{header}</Header>
    <ContentWrapper>
      <NumberWrapper>{value}</NumberWrapper>
      <TextWrapper>{label}</TextWrapper>
    </ContentWrapper>
  </Wrapper>
);

export default BigNumber;
