import React, { useState } from "react";
import { Dropdown } from "semantic-ui-react";
import styled from "styled-components";
import { getMyVotes, getSingleMovie } from "../../store/actionCreators";
import { useDispatch } from "react-redux";
import getUrl from "../../api/client";
import { ModalBody, ModalFullScreen, ModalTitle } from "./Modal";
import { MovieData } from "../../movieType";

const SubmitButton = styled.button`
  padding: 12px 17px 12px 17px;
  color: white;
  margin: 1em;
  border: none;
  border-radius: 4px;
  background: red;
  box-shadow: 0px 0px 2px #00000077;

  :hover {
    cursor: pointer;
    box-shadow: none;
  }
`;

interface RatingModalParams {
  closeModal: () => void;
  id: string;
  movie: MovieData;
}

const RatingModal = ({ closeModal, id, movie }: RatingModalParams) => {
  const dispatch = useDispatch();

  const [state, setState] = useState<number>(0);
  const [userRating, setUserRating] = useState<number>(1);

  const ratingDropDownValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => ({
    key: item,
    value: item,
    text: item,
  }));

  const save = () => {
    setState(1);
    fetch(`${getUrl()}/user/vote/${id}`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "Application/Json",
        authorization: `Bearer ${localStorage.getItem("userId")}`,
      },
      body: JSON.stringify({ value: userRating }),
    })
      .then((r) => {
        if (r.status === 401) {
          // eslint-disable-next-line
          throw "Unathenticated";
        }
        return r;
      })
      .then((r) => r.json())
      .then(() => {
        setState(0);
        dispatch(getSingleMovie(id));
        dispatch(getMyVotes());
        closeModal();
      })
      .catch((err) => {
        if (err === "Unathenticated") {
          setState(3);
        } else {
          setState(2);
        }
      });
  };

  return (
    <ModalFullScreen>
      <ModalBody closeModal={closeModal}>
        <ModalTitle>Gi din vurdering</ModalTitle>
        <p>Hvor bra er filmen: {movie.title}</p>
        <Dropdown
          placeholder="Select Genres"
          defaultValue={1}
          selection
          options={ratingDropDownValues}
          onChange={(e, data) =>
            data.value && setUserRating(Number(data.value))
          }
        />
        <SubmitButton onClick={save}>Send</SubmitButton>
        {state === 2 && <p>Innsending feilet</p>}
        {state === 1 && <p>Loading...</p>}
        {state === 3 && (
          <>
            {" "}
            <p>Innsending feilet...</p>
            <p>Husket du å logge inn?</p>
            <p>
              Refresh siden for å få muligheten til å logge på. Trykk på
              "Start", slik at vi lager en annonym bruker til deg.
            </p>
          </>
        )}
      </ModalBody>
    </ModalFullScreen>
  );
};

export default RatingModal;
