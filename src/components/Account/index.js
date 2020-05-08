import React, { useContext } from "react";
import styled from "styled-components";
import { doSignOut } from "../../firebase";
import { AuthContext } from "../../session";
import * as ROUTES from "../../constants/routes";
import { Redirect } from "react-router-dom";
import FormSubmit from "../UI/FormSubmit";

const AccountPage = styled.div`
  padding-top: 30px;
`;

const AccountPageHeader = styled.div`
  font-size: 2rem;
  color: ${(props) => props.theme.black};
  font-weight: bold;
  border-bottom: 2px solid ${(props) => props.theme.lightGreen};
  margin-bottom: 20px;
`;

const Account = () => {
  const authContext = useContext(AuthContext);

  let content = (
    <AccountPage className="offset-2">
      <AccountPageHeader>Account</AccountPageHeader>
      <FormSubmit
        click={(event) => {
          event.preventDefault();
          console.log("clicked");
          doSignOut();
        }}
        val="Sign Out"
      />
    </AccountPage>
  );

  return (
    <React.Fragment>
      {authContext ? content : <Redirect to={ROUTES.HOME} />}
    </React.Fragment>
  );
};

export default Account;
