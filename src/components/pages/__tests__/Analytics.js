import React from "react";
import { render } from "@testing-library/react";
import Analytics from "../Analytics.js";
import Stats from "../../analytics/Stats";
import PopularWords from "../../analytics/PopularWords";

// Understand
// Question: What does the user expect to see in this component?
// How does the user expect this component to behave?
// Things to test:
// 1. User expects to see Analytics heading
// 2. User expects to see Stats component
// 3. User expects to see popular words component

jest.mock("../../analytics/Stats", () => () => (
  <div>Mock Stats Component</div>
));

jest.mock("../../analytics/PopularWords", () => () => (
  <div>Mock popWords Component</div>
));


describe('Analytics Page', () => {
  it('renders without crashing', () => {
    render(
          <Analytics/>
    );
  });
  
    it("renders 'Analytics' heading", () => {
      const { getByText } = render(
          <Analytics />
      );
    
      const heading = getByText(/analytics/i);
      expect(heading).toBeInTheDocument();
    });  
  
    it("renders stats", () => {
      const { getByText } = render(
          <Analytics />
      );

      const statsComp = getByText(/mock stats component/i);

      expect(statsComp).toBeInTheDocument();
    });
  
    it("renders popWords component", () => {
      const { getByText } = render(
        <Analytics/>
      );

      const popWords = getByText(/mock popWords component/i);
      expect(popWords).toBeInTheDocument();
    });
});