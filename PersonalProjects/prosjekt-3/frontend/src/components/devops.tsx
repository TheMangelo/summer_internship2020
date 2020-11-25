import React, { useState } from "react";
import styled from "styled-components";
import getUrl, {
  toggleBackend,
  isBackendDev,
  clientError,
  testLocalHealth,
} from "../api/client";
import PageHeader from "./PageHeader";

const Wrapper = styled.div``;

const Heading = styled.h1``;

const Button = styled.button``;

// Sets local/online backend
const Devops = () => {
  const backend = getUrl();
  const [isLocal, setIsLocal] = useState<boolean>(isBackendDev());

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const toggleBackendServer = () => {
    toggleBackend();
    setIsLocal(!isLocal);
    setLoading(false);
  };

  const goLocal = async (): Promise<void> => {
    setLoading(true);
    if (await testLocalHealth()) {
      setError("");
      toggleBackendServer();
    } else {
      setLoading(false);
      setError(clientError.offline);
    }
  };

  const goOnline = (): void => {
    setLoading(true);
    toggleBackendServer();
    setError("");
  };

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <PageHeader />
      <Wrapper>
        <Heading>Group 80 Devops</Heading>
        {process.env.NODE_ENV === "development" && (
          <>
            <p>Current backend</p>
            <p>{backend}</p>
            {!isLocal && <Button onClick={goLocal}>Go local</Button>}
            {isLocal && <Button onClick={goOnline}>Go online</Button>}
          </>
        )}
        {process.env.NODE_ENV === "production" && (
          <>
            <p>
              Du er i et produksjonsenvironment, og det er dermed ikke mulig å
              endre backend!
            </p>
          </>
        )}

        <h4>{error}</h4>
      </Wrapper>
    </>
  );
};

export default Devops;
