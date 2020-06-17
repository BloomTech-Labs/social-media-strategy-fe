import React from "react";
import { render } from "@testing-library/react";
import Home from "../Home.js";
import theme from "../../../muiCustomTheme.js";
import Kanban from "../../kanban/Kanban.js";
import { ThemeProvider } from "@material-ui/core/styles";

jest.mock("../../kanban/Kanban.js", () => {
  return () => <div>Mock Kanban</div>;
});

describe("Home component", () => {
  it("renders without crashing", () => {
    render(
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    );
  });
});
