import React from "react";
import Analytics from "../Analytics.js";
import { render } from "@testing-library/react";
import { MemoryRouter as Router} from "react-router-dom";

it("renders without crashing", () => {
    render(
      <Router>
        <Analytics/>
      </Router>
    );
  });

  it("renders 'Analytics' heading", () => {
    const { getByText } = render(
      <Router>
        <Analytics />
      </Router>
    );
  
    const heading = getByText(/analytics/i);
    expect(heading).toBeInTheDocument();
  });  

  it("renders stats", () => {
    const { getByText, findAllByText } = render(
      <Router>
        <Analytics />
      </Router>
    );
  
    // const followers = findAllByText(/followers/i);
    const retweets = getByText(/retweets/i);
    const likes = getByText(/likes/i);
    const engagement = getByText(/engagement/i);
  
    // expect(followers).toBeInTheDocument();
    expect(retweets).toBeInTheDocument();
    expect(likes).toBeInTheDocument();
    expect(engagement).toBeInTheDocument();
  });

  it("renders popular words component", () => {
    const { getByText } = render(
      <Router>
        <Analytics />
      </Router>
    );
  
    const mainHeading = getByText(/need/i);
    const mainHeading2 = getByText(/inspiration/i);
    const subHeading = getByText(/gain insights into the words your followers engage with most/i);
  
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading2).toBeInTheDocument();
    expect(subHeading).toBeInTheDocument();
  });

  it("renders start analysis button and learn more", () => {
    const { getByText } = render(
      <Router>
        <Analytics/>
      </Router>
    );
  
    const startAnalysis = getByText(/start analysis/i);
    const learnMore = getByText(/learn more/i);
  
    expect(startAnalysis).toBeInTheDocument();
    expect(learnMore).toBeInTheDocument();
  });