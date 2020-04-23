import React from 'react';
import {ThemeProvider} from 'styled-components';

const theme = {
    black: "#040F0F",
    gray: "#2D3A3A",
    green: "#248232",
    lightGreen: "#2BA84A",
    white: "#FCFFFC",
    red: "#A82C33",
    buttonHoverOpacity: "0.5"
};

export const withTheme = Component => props => (
    <ThemeProvider theme={theme}>
      <Component {...props} />
    </ThemeProvider>
);