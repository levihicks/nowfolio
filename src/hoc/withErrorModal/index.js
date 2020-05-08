import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../../components/UI/Modal";
import ErrorIcon from "../../assets/error.svg";

const ErrorModalContent = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const withErrorModal = (Component) => (props) => {
  const [error, setError] = useState(null);

  return (
    <React.Fragment>
      {error && (
        <Modal hide={() => setError(null)}>
          <ErrorModalContent>
            <img
              src={ErrorIcon}
              alt=""
              height="30"
              style={{ marginRight: "10px" }}
            />
            {error.message}
          </ErrorModalContent>
        </Modal>
      )}
      <Component {...props} setError={setError} />
    </React.Fragment>
  );
};
export default withErrorModal;
