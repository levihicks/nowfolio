import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import OptionsIcon from "../../../../../assets/listItemOptions.svg";
import { CoinInfoContext } from "../../../../../contexts/CoinInfoContext";
import * as actions from "../../../../../store/actions";
import { AuthContext } from "../../../../../session";
import Modal from "../../../../UI/Modal";
import AddToPortfolioForm from "../../../../CoinInfo/AddToPortfolioForm";
const StyledCoinListItem = styled.div`
  border-top: 1px solid ${(props) => props.theme.gray};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  &:last-child {
    border-bottom: 1px solid ${(props) => props.theme.gray};
  }
`;

const CoinListItemEl = styled.div`
  padding: 10px;
  font-size: 1rem;
  font-weight: bold;
  color: ${(props) => (props.active ? props.theme.green : props.theme.gray)};
`;

const Popover = styled.div`
  position: absolute;
  z-index: 2;
  left: 100%;
  border: 1px solid ${(props) => props.theme.gray};
  padding: 5px;
  background: ${(props) => props.theme.white};
  button {
    color: ${(props) => props.theme.black};
    outline: none;
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    padding: 3px 0;
    &:hover {
      color: ${(props) => props.theme.lightGreen};
    }
  }
`;

const CoinListItem = ({
  name,
  quantity,
  tag,
  price,
  quoteCurrency,
  hasOptionsActive,
  openOptions,
  coinId,
}) => {
  const dispatch = useDispatch();

  const id = `${tag}-${quoteCurrency}`;

  const coinInfoContext = useContext(CoinInfoContext);

  const authContext = useContext(AuthContext);

  const [editing, setEditing] = useState(false);

  const setCoinInfo = () => {
    coinInfoContext.setNewCoin(coinId);
  };

  const toggleOptions = () => {
    if (hasOptionsActive === id) openOptions(null);
    else openOptions(id);
  };
  return (
    <StyledCoinListItem>
      <CoinListItemEl
        active={
          coinInfoContext.currentCoin &&
          coinInfoContext.currentCoin.tag +
            "-" +
            coinInfoContext.currentCoin.quoteCurrency ===
            id
        }
        style={{ marginRight: "auto", cursor: "pointer" }}
        onClick={setCoinInfo}
      >
        {id} {quantity && `(${quantity})`}
      </CoinListItemEl>
      <CoinListItemEl>{price}</CoinListItemEl>
      {/*
            <CoinListItemEl 
                style={{fontSize: ".75rem", 
                    color: delta[0] === "-" ? "#A82C33" : "#2BA84A"}}>
                {delta}
            </CoinListItemEl>
            */}
      <CoinListItemEl>
        <img
          height="30"
          alt=""
          src={OptionsIcon}
          style={{ cursor: "pointer" }}
          onClick={toggleOptions}
        />
      </CoinListItemEl>
      {hasOptionsActive === id && (
        <Popover>
          {editing && (
            <Modal hide={() => setEditing(false)}>
              <AddToPortfolioForm
                currentCoin={coinId}
                currentQuantity={quantity}
                currentPrice={price}
                submitted={() => {
                  setEditing(false);
                  openOptions(null);
                }}
              />
            </Modal>
          )}
          {quantity && <button onClick={() => setEditing(true)}>Edit</button>}
          <button
            onClick={() =>
              dispatch(actions.removeUserCoin(coinId, authContext.uid))
            }
          >
            Remove
          </button>
        </Popover>
      )}
    </StyledCoinListItem>
  );
};

export default CoinListItem;
