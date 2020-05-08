import React, { useContext, useState } from "react";
import styled from "styled-components";

import NowfolioIcon from "../../assets/nowfolio.svg";
import HomeIcon from "../../assets/home.svg";
import SearchIcon from "../../assets/search.svg";
//import CompareIcon from '../../assets/compare.svg';
import SignInIcon from "../../assets/signIn.svg";
import AccountIcon from "../../assets/account.svg";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../session";
import HamburgerIcon from "../../assets/hamburger.svg";

import * as ROUTES from "../../constants/routes";

const StyledSidebarNav = styled.div`
  background: ${(props) => props.theme.black};
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: white;
  position: fixed;
  padding: 0;
  z-index: 1000;
  @media (max-width: 767px) {
    top: 0;
    height: ${(props) => (props.menuActive ? "100vh" : "50px")};
  }
`;

const StyledSidebarNavHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 80px;
  padding-left: 20px;
  @media (max-width: 767px) {
    min-height: 50px;
  }
`;

const NavEl = styled.img`
  max-width: 50%;
  cursor: pointer;
  max-height: 40px;
`;

const StyledNavLink = styled(NavLink)`
  margin: 10px 0;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 30px;
  @media (max-width: 767px) {
    justify-content: flex-start;
    padding-left: 30px;
  }
`;

const StyledHamburgerIcon = styled.img`
  height: 25px;
  display: inline;
  margin-right: auto;
`;

const NavLinks = styled.div`
  width: 100%;
  display: inline-block;
  @media (max-width: 767px) {
    display: ${(props) => (props.menuDisplayed ? "inline-block" : "none")};
  }
  overflow: visible;
  background: ${(props) => props.theme.black};
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const StyledNowfolioIcon = styled.img`
  max-width: 50%;
  max-height: 60px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  @media (max-width: 767px) {
    height: 30px;
  }
`;

const MobileMenuText = styled.div`
  color: ${(props) => props.theme.white};
  font-weight: bold;
  font-size: 1.25rem;
  margin-left: 25px;
  @media (min-width: 767px) {
    display: none;
  }
`;

const SidebarNav = (props) => {
  const sidebarActiveStyle = { background: "#2BA84A" };
  const authContext = useContext(AuthContext);
  const [menuActive, setMenuActive] = useState(false);
  return (
    <StyledSidebarNav className="col-md-1" menuActive={menuActive}>
      <StyledSidebarNavHeader>
        <StyledHamburgerIcon
          src={HamburgerIcon}
          className="d-md-none"
          onClick={() => {
            setMenuActive(!menuActive);
          }}
        />
        <StyledNowfolioIcon src={NowfolioIcon} />
      </StyledSidebarNavHeader>
      <NavLinks menuDisplayed={menuActive}>
        <StyledNavLink
          exact
          to={ROUTES.HOME}
          activeStyle={sidebarActiveStyle}
          onClick={() => setMenuActive(false)}
        >
          <NavEl src={HomeIcon} />
          <MobileMenuText>Home</MobileMenuText>
        </StyledNavLink>
        <StyledNavLink
          to={ROUTES.SEARCH}
          activeStyle={sidebarActiveStyle}
          onClick={() => setMenuActive(false)}
        >
          <NavEl src={SearchIcon} />
          <MobileMenuText>Search</MobileMenuText>
        </StyledNavLink>
        {/*
                <StyledNavLink 
                    to={ROUTES.COMPARE} 
                    activeStyle={sidebarActiveStyle} 
                    onClick={() => setMenuActive(false)}>
                    <NavEl src={CompareIcon} />
                    <MobileMenuText>Compare</MobileMenuText>
                </StyledNavLink>
                */}
        {authContext ? (
          <StyledNavLink
            to={ROUTES.ACCOUNT}
            activeStyle={sidebarActiveStyle}
            style={{ marginTop: "auto" }}
            onClick={() => setMenuActive(false)}
          >
            <NavEl src={AccountIcon} />
            <MobileMenuText>Account</MobileMenuText>
          </StyledNavLink>
        ) : (
          <StyledNavLink
            to={ROUTES.SIGN_IN}
            activeStyle={sidebarActiveStyle}
            style={{ marginTop: "auto" }}
            onClick={() => setMenuActive(false)}
          >
            <NavEl src={SignInIcon} />
            <MobileMenuText>Authentication</MobileMenuText>
          </StyledNavLink>
        )}
      </NavLinks>
    </StyledSidebarNav>
  );
};

export default SidebarNav;
