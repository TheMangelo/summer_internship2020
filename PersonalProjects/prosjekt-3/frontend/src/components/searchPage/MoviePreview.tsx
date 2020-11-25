import React from "react";
import { Header } from "semantic-ui-react";
import styled from "styled-components";
import { MovieData } from "../../movieType";
import { useHistory } from "react-router-dom";
import { AnimationWrapper } from "react-hover-animation";

const ImageWrapper = styled.img`
  border-radius: 6px;
  max-width: 100%;
`;

const CustomAnimationWrapper = styled(AnimationWrapper)`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
  width: 16.666%;
  padding: 15px;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 1100px) {
    width: 25%;
    max-width: 200px;
  }
  @media (max-width: 900px) {
    width: 33.33%;
  }
  @media (max-width: 450px) {
    width: 50%;
  }
  @media (max-width: 370px) {
    width: 60%;
  }
`;

const CustomHeader = styled(Header)`
  position: relative;
  bottom: 3px;
  text-align: center;
  margin: 6px !important;
  width: 120px;
`;

interface MoviePreviewProps {
  data: MovieData;
}

// preview with image and title
const MoviePreview: React.FC<MoviePreviewProps> = ({ data }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push("movies/" + data.id);
  };
  return (
    <CustomAnimationWrapper onClick={handleClick}>
      {data && data?.title && data?.poster && (
        <>
          <ImageWrapper key={data.poster} src={data.poster} />
          <CustomHeader content={data.title} size="small" />
        </>
      )}
    </CustomAnimationWrapper>
  );
};

export default MoviePreview;
