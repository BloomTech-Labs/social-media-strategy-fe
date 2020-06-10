import React from "react";
import Home from "../Home.js";
import { render } from "@testing-library/react";
import { MemoryRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../../muiCustomTheme.js";

describe("<Home />", () => {
  it("should render", () => {
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    );
  });
});
