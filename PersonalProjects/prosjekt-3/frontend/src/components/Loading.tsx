import React from "react";

import styled from "styled-components";

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #00000077;
`;

const InnerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const InnerLoading = styled.div`
  height: 100px;
  width: 100px;
  border: 15px solid gray;
  border-top: 15px solid rgb(55, 87, 162);
  border-radius: 50%;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// General loading that fills the whole screen.
const Loading = () => (
  <LoadingWrapper>
    <InnerWrapper>
      <InnerLoading />
    </InnerWrapper>
  </LoadingWrapper>
);

export default Loading;
