import React, { useContext } from 'react';
import styled from 'styled-components';

import NowfolioIcon from '../../assets/nowfolio.svg';
import HomeIcon from '../../assets/home.svg';
import SearchIcon from '../../assets/search.svg';
import CompareIcon from '../../assets/compare.svg';
import SignInIcon from '../../assets/signIn.svg';
import AccountIcon from '../../assets/account.svg';
import { NavLink } from 'react-router-dom';
import {AuthContext} from '../../session';

import * as ROUTES from '../../constants/routes';

const StyledSidebarNav = styled.div
`
    background: ${props=>props.theme.black};
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    color: white;
    position: fixed;
    padding: 0;
`;

const NavEl = styled.img
`
    max-width: 50%;
    cursor: pointer;
`;

const StyledNavLink = styled(NavLink)
`
    margin: 10px 0;
    padding: 10px 0;
    display: flex;
    justify-content: center;
    width: 100%;
`;

const SidebarNav = props => {
    const sidebarActiveStyle = {background: "#2BA84A"};
    const authContext = useContext(AuthContext);
    // console.log(authContext.uid);
    return (
        <StyledSidebarNav className="col-sm-1">
            
            <NavEl src={NowfolioIcon} 
                style={{margin: "20px 0", cursor: "default"}}
                />
            <StyledNavLink 
                exact 
                to={ROUTES.HOME} 
                activeStyle={sidebarActiveStyle}>
                <NavEl src={HomeIcon} />
            </StyledNavLink>
            <StyledNavLink 
                to={ROUTES.SEARCH} 
                activeStyle={sidebarActiveStyle}>
                <NavEl src={SearchIcon} />
            </StyledNavLink>
            <StyledNavLink 
                to={ROUTES.COMPARE} 
                activeStyle={sidebarActiveStyle}>
                <NavEl src={CompareIcon} />
            </StyledNavLink>
            {
                authContext ?
                <StyledNavLink 
                    to={ROUTES.ACCOUNT} 
                    activeStyle={sidebarActiveStyle} 
                    style={{marginTop: "auto"}}>
                    <NavEl src={AccountIcon} />
                </StyledNavLink>
                :
                <StyledNavLink 
                    to={ROUTES.SIGN_IN}
                    activeStyle={sidebarActiveStyle} 
                    style={{marginTop: "auto"}}>
                    <NavEl src={SignInIcon} />
                </StyledNavLink>
            }
        </StyledSidebarNav>
    )
}

export default (SidebarNav);