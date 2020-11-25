import React, { useEffect, useState } from "react";
import { Header, Segment } from "semantic-ui-react";
import styled from "styled-components";
import { getMyVotes, getSingleMovie } from "../../store/actionCreators";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store/types";
import { MovieData } from "../../movieType";
import { useHistory } from "react-router-dom";
import Loading from "../Loading";
import { Button } from "semantic-ui-react";
import RatingModal from "../modal/RatingModal";
import { ensureNumber } from "../stats/functions";

const ImageWrapper = styled.img`
  border-radius: 20px;
  max-height: 450px;
  margin: 15px;
  @media (max-width: 500px) {
    max-height: 300px;
    max-width: 200px;
  }
`;

const InfoName = styled.div`
  font-weight: bold;
`;

const InfoWrapper = styled.div`
  font-size: 20px;
  max-width: 500px;
  text-align: center;
  margin: 10px auto;
`;

// Wraps content except for Header
const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: flex-start;
  margin: 10px;
`;

// Splits content into left and right divs
const LeftRightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px 20px 5px 20px;
`;

const BackButton = styled.img`
  position: absolute;
  top: 2px;
  left: 2px;
  width: 100px;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 900px) {
    width: 50px;
  }
`;

const CustomHeader = styled(Header)`
  margin: 20px 100px 20px 100px !important;
  @media (max-width: 700px) {
    margin: 20px 10px 20px 10px !important;
  }
`;

const SmallImageWrapper = styled.img`
  border-radius: 6px;
  max-height: 220px;
`;

// for e.g all actors and their images
const ImageInfoWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`;

// for e.g. a single actor
const SingleImageInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 40px 20px 40px;
`;

// for e.g. actor name
const ImageHeader = styled.div`
  margin: 2px;
  font-weight: normal;
  font-size: 25px;
`;

const RatingFeedback = styled.span`
  font-size: 1.4em;
  color: #000;
  font-weight: bold;
`;

const RatingFeedbackInline = styled.span`
  font-size: 1.2em;
  color: #000;
  margin-top: 0;
  margin-bottom: 2em;
`;

interface InfoProps {
  id?: string;
  label: string;
  content: string | JSX.Element[] | JSX.Element;
}

// for general info
const Info = ({ id, label, content }: InfoProps) => (
  <InfoWrapper>
    <InfoName>{label}</InfoName>
    <div id={id}>{content}</div>
  </InfoWrapper>
);

// for actors and directors to show images
const imageInfo = (info: { id: string; name: string; image: string }[]) => (
  <ImageInfoWrapper>
    {info.map((data: { id: string; name: string; image: string }) => {
      return (
        <SingleImageInfoWrapper key={data.id}>
          <SmallImageWrapper key={data.image} src={data.image} />
          <ImageHeader>{data.name}</ImageHeader>
        </SingleImageInfoWrapper>
      );
    })}
  </ImageInfoWrapper>
);

// array of info to string
const genericInfo = (info: { id: string; name: string }[]) => {
  let result = "";
  info.map(
    (data: { id: string; name: string }, i: number) =>
      (result += i !== 0 ? ", " + data.name : data.name)
  );
  return result;
};

const MovieComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [movie, setMovie] = useState<MovieData>();
  const [showRateModal, setShowRateModal] = useState<boolean>(false);

  const id = new URL(window.location.href).pathname.split("/")[2];

  const {
    singleMovie: moviePromise,
    isLoading: movieIsLoading,
    errorMessage: movieErrorMessage,
  } = useSelector((state: State) => state.singleMovieReducer);

  const myVotes = useSelector((state: State) => state.userVoteReducer);

  useEffect(() => {
    if (myVotes.isLoading && !myVotes.isFetching) {
      dispatch(getMyVotes());
    }
  }, [dispatch, myVotes]);

  useEffect(() => {
    if (moviePromise) {
      if (!movie) {
        dispatch(getSingleMovie(id));
      }
      moviePromise.then((r) => {
        setMovie(r);
      });
    } else {
      dispatch(getSingleMovie(id));
    }
  }, [moviePromise, dispatch, id, movie]);

  if (!movie) return null;

  const ratingsInfo = movie.ratings.map(
    (rating: { name: string; top: number; value: number }, i: number) => (
      <div key={i}>
        {rating.name +
          ": " +
          Math.round(ensureNumber(rating.value) * 10) / 10 + // Round user rating to one decimal without affecting other ratings
          "/" +
          rating.top}
      </div>
    )
  );
  const dateList = movie.released.split("T")[0].split("-");

  if (movieErrorMessage) throw movieErrorMessage;
  if (myVotes.errorMessage) throw myVotes.errorMessage;

  if (!movie || movieIsLoading || !myVotes || myVotes.isLoading) {
    return <Loading></Loading>;
  }

  const myVote = myVotes.votes.filter((vote) => vote.movieid === id);
  const ratedThis = myVote.length === 1;

  return (
    <Segment padded raised textAlign="center" color="teal">
      {showRateModal && (
        <RatingModal
          movie={movie}
          closeModal={() => {
            setShowRateModal(false);
          }}
          id={id}
        />
      )}
      <BackButton src="/back.png" onClick={() => history.goBack()} />
      <CustomHeader
        content={movie.title + " (" + movie.year + ")"}
        size="huge"
      />
      <Wrapper>
        <LeftRightWrapper>
          {!ratedThis && (
            <Button size="massive" onClick={() => setShowRateModal(true)}>
              Rate
            </Button>
          )}
          {ratedThis && (
            <RatingFeedback>Du ratet: {myVote[0].value}</RatingFeedback>
          )}

          <ImageWrapper src={movie.poster} />
          <Info label="Rated" content={movie.rated} />
          <Info
            label="Released"
            content={dateList[2] + "/" + dateList[1] + " " + dateList[0]}
          />
          <Info
            label="Runtime"
            content={(movie.runtime / 3600).toFixed(2) + " Hours"}
          />
          <Info label="Production" content={movie.production} />
          <Info label="Genres" content={genericInfo(movie.genres)} />
          <Info label="Ratings" content={ratingsInfo} />
          {ratedThis && (
            <RatingFeedbackInline>
              Du ratet: {myVote[0].value}
            </RatingFeedbackInline>
          )}

          <Info label="Languages" content={genericInfo(movie.languages)} />
          <Info label="Countries" content={genericInfo(movie.countries)} />

          <Info label="Writers" content={genericInfo(movie.writers)} />
        </LeftRightWrapper>
        <LeftRightWrapper>
          <Info id="plot" label="Plot" content={movie.plot} />
          <Info label="Actors" content={imageInfo(movie.actors)} />
          <Info label="Directors" content={imageInfo(movie.directors)} />
        </LeftRightWrapper>
      </Wrapper>
    </Segment>
  );
};

export default MovieComponent;
