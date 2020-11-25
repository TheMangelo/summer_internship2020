import React from "react";

import styled from "styled-components";

export const ModalFullScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0000008f;
  z-index: 1500;
`;
const ModalBodyElement = styled.div`
  background-color: #fff;
  border-radius: 5px;
  width: 500px;
  height: fit-content;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 2em;
`;

export const CloseButton = styled.button`
  padding: none;
  background: none;
  border: navajowhite;
  font-size: 2;
  position: absolute;
  right: 1em;
  top: 0.5em;
  margin-bottom: 1em;
  background: #ddd;
  border-radius: 5px;
  box-shadow: 0px 0px 4px #00000077;

  :hover {
    box-shadow: none;
    cursor: pointer;
  }
`;

export const ModalTitle = styled.h1``;

interface ModalBodyProps {
  closeModal: () => void;
  children: React.ReactNode;
}

export const ModalBody = ({ closeModal, children }: ModalBodyProps) => {
  return (
    <ModalBodyElement>
      <CloseButton id="closemodalbutton" onClick={closeModal}>
        X
      </CloseButton>
      {children}
    </ModalBodyElement>
  );
};
