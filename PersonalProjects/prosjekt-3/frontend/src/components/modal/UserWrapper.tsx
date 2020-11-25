import React, { useEffect, useState } from "react";

import styled from "styled-components";
import getUrl from "../../api/client";

import { Link } from "react-router-dom";

import { ModalBody, ModalFullScreen, ModalTitle } from "./Modal";

const Button = styled.button`
  background: ${(props) => props.color};
  color: white;
  margin: 1em;
  border: 2px solid ${(props) => props.color};
  border-radius: 2px;
  box-shadow: 0px 0px 2px #00000077;

  :hover {
    cursor: pointer;
    box-shadow: none;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 4em;
`;

const UserWrapper = () => {
  const [userId, setUserId] = useState<string | undefined>(
    localStorage.getItem("userId") || undefined
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!userId) {
      setShowModal(true);
      fetch(`${getUrl()}/health`, { mode: "cors" })
        .then((r) => r.json())
        .then((r) => {
          if (r.alive) {
            setLoading(false);
          } else {
            setError(true);
          }
        })
        .catch(() => setError(true));
    }
  }, [userId]);

  const start = () => {
    if (!userId) {
      fetch(`${getUrl()}/user/register`, { method: "POST", mode: "cors" })
        .then((r) => r.json())
        .then((r) => {
          localStorage.setItem("userId", r.id);
          setUserId(r.id);
          setShowModal(false);
        })
        .catch(() => setError(true));
    }
  };

  if (loading) {
    return (
      <ModalFullScreen>
        <ModalBody closeModal={() => setShowModal(false)}>
          <ModalTitle>loading....</ModalTitle>
        </ModalBody>
      </ModalFullScreen>
    );
  }

  if (showModal) {
    return (
      <ModalFullScreen>
        <ModalBody closeModal={() => setShowModal(false)}>
          <ModalTitle>Velkommen til gruppe 80 sitt prosjekt 3</ModalTitle>
          <p>
            For å evaluere prosjektet vårt må du lage en annonym bruker. Trykk
            på start for å lage bruker og få muligheten til å rate filmer{" "}
            <span role="img" aria-labelledby="coolGuy">
              😎
            </span>
          </p>
          {error && process.env.NODE_ENV === "development" && (
            <p>
              Det ser ut til at du ikke er tilkoblet VM-en vår. Logg på VPN for
              å fullføre prosjektet. Dersom du ønsker å kjøre med vår lokale
              backend kan du endre backend her:{" "}
              <Link to={"/devops"}>/devops</Link>
            </p>
          )}
          {error && process.env.NODE_ENV === "production" && (
            <p>
              Det ser ut til at du ikke er koblet til vår VM. Derimot er du i et
              produksjons environment. Kjør frontenden lokalt via NPM, i stedet
              for via docker, så får du tilgang til{" "}
              <Link to={"/devops"}>/devops</Link> hvor man kan velge backend:)
            </p>
          )}
          <ButtonWrapper>
            {!error && !loading && (
              <Button color={"green"} onClick={start}>
                Start
              </Button>
            )}
            <Button
              color={"rgb(108, 108, 108)"}
              onClick={() => setShowModal(false)}
            >
              Lukk
            </Button>
          </ButtonWrapper>
        </ModalBody>
      </ModalFullScreen>
    );
  }

  return <div></div>;
};

export default UserWrapper;
