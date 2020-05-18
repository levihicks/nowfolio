import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import FormInput from "../../UI/FormInput";
import FormSubmit from "../../UI/FormSubmit";
import * as actions from "../../../store/actions";
import { AuthContext } from "../../../session";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 25px 60px;
  padding-bottom: 75px;
`;

const AddToPortfolioForm = (props) => {
  const { currentCoin, submitted, currentQuantity, currentPrice } = props;

  const [quantity, setQuantity] = useState(currentQuantity || "");
  const [price, setPrice] = useState(currentPrice || "");

  const dispatch = useDispatch();

  const authContext = useContext(AuthContext);

  const uid = authContext && authContext.uid;

  const handleSubmit = () => {
    if (currentQuantity) {
      // editing
      dispatch(
        actions.updateUserCoin(currentCoin, quantity, price, authContext.uid)
      );
    } else {
      const newCoinToAdd = {
        ...currentCoin,
        quantity: quantity,
        price: price,
      };
      dispatch(actions.addUserCoin(newCoinToAdd, uid));
    }
    submitted();
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <div style={{ margin: "auto" }}>
        <FormInput
          label="Quantity"
          type="text"
          value={quantity}
          change={(event) => setQuantity(event.target.value)}
        />
        <FormInput
          label="Price"
          type="text"
          value={price}
          change={(event) => setPrice(event.target.value)}
        />
        <FormSubmit val={currentQuantity ? "Edit" : "Add To Portfolio"} />
      </div>
    </StyledForm>
  );
};

export default AddToPortfolioForm;
