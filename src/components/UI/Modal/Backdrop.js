import React from 'react';

import styled from 'styled-components';

const StyledBackdrop = styled.div
`
    z-index: 99;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: ${props => props.theme.black};
    opacity: .5;
`

const Backdrop = props => (
    <StyledBackdrop onClick={props.click} />
);

export default Backdrop;