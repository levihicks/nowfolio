import styled from "styled-components";

const PlaceholderMsg = styled.div`
  margin: 20%;
  background: rgba(43, 168, 74, 0.1);
  border-radius: 30px;
  font-weight: bold;
  padding: 20px;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${(props) => props.theme.gray};
`;

export default PlaceholderMsg;
