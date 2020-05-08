import React from "react";
import styled from "styled-components";

import Backdrop from "./Backdrop";

const StyledModal = styled.div`
  font-weight: bold;
  z-index: 100;
  background: ${(props) => props.theme.white};
  position: fixed;
  min-height: 300px;
  min-width: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
`;

const Modal = (props) => {
  return (
    <React.Fragment>
      <Backdrop click={props.hide} />
      <StyledModal>{props.children}</StyledModal>
    </React.Fragment>
  );
};

export default Modal;
