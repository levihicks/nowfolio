import React from 'react';
import styled from 'styled-components';

import NowfolioIcon from '../../assets/nowfolio.svg';
import HomeIcon from '../../assets/home.svg';
import SearchIcon from '../../assets/search.svg';
import CompareIcon from '../../assets/compare.svg';
import SignInIcon from '../../assets/signIn.svg';

const StyledSidebarNav = styled.div`
    background: ${props=>props.theme.black};
    height: 100vh;
    display: flex;
    flex-direction: column;
    color: white;
    max-width: 80px;
`;

const NavEl = styled.img`
    height: 40px;
    margin-bottom: 20px;
`;

const SidebarNav = () => {
    return (
        <StyledSidebarNav className="col-sm-1">
            <NavEl src={NowfolioIcon} 
                style={{marginTop: "20px"}}/>
            <NavEl src={HomeIcon} />
            <NavEl src={SearchIcon} />
            <NavEl src={CompareIcon} />
            
            <NavEl src={SignInIcon}
                style={{marginTop: "auto"}} />
        </StyledSidebarNav>
    )
}

export default SidebarNav;