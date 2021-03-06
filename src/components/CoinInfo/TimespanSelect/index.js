import React, { useState } from "react";
import styled from "styled-components";

import DropdownIcon from "../../../assets/dropdown.svg";

const StyledTimespanSelect = styled.div`
  border: 1px solid ${(props) => props.theme.gray};
  right: 0;
  position: absolute;
  background: ${(props) => props.theme.white};
  min-width: 120px;
  z-index: 2;
`;

const StyledTimespanSelectButton = styled.button`
  border: none;
  font-weight: bold;
  background: ${(props) => props.theme.white};
  &:focus {
    outline: none;
  }
  img {
    height: 10px;
  }
`;

const TimespanOptions = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const TimespanOptionEl = styled.button`
  border: none;
  margin: auto;
  margin-top: 5px;
  font-size: 1rem;
  width: 100%;
  background: ${(props) => props.theme.white};
  &:hover {
    color: ${(props) => props.theme.green};
  }
  &:focus {
    outline: none;
  }
`;

const TimespanSelect = (props) => {
  const timespans = ["Past Day", "Past Week", "Past Month"];

  const { selectedTimespan, setSelectedTimespan } = props;

  const [optionsDisplayed, setOptionsDisplayed] = useState(false);

  return (
    <StyledTimespanSelect>
      <StyledTimespanSelectButton
        onClick={() => setOptionsDisplayed(!optionsDisplayed)}
      >
        {selectedTimespan}
        <img
          src={DropdownIcon}
          style={{
            transform: optionsDisplayed ? "rotate(180deg)" : "none",
            marginLeft: "10px",
          }}
          alt=""
        />
      </StyledTimespanSelectButton>
      {optionsDisplayed && (
        <TimespanOptions>
          {timespans.map((t) => {
            if (t !== selectedTimespan)
              return (
                <TimespanOptionEl
                  onClick={() => setSelectedTimespan(t)}
                  key={t}
                >
                  {t}
                </TimespanOptionEl>
              );
            else return null;
          })}
        </TimespanOptions>
      )}
    </StyledTimespanSelect>
  );
};

export default TimespanSelect;
