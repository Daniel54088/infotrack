import { screen, rtlRender } from "@/testing/test-utils";

import DisplaySection from "../components/display-section";
import { SearchEnginesRank } from "@/types/seo-checker";

const mockSearchEngineRanks: SearchEnginesRank = {
  google: "1",
  bing: "2",
};

test("renders DisplaySection correctly with given props", async () => {
  await rtlRender(<DisplaySection searchEngineRanks={mockSearchEngineRanks} />);

  // Check for the presence of each search engine rank
  const googleRankElement = screen.getByText(/Google: 1/);
  expect(googleRankElement).toBeInTheDocument();

  const bingRankElement = screen.getByText(/Bing: 2/);
  expect(bingRankElement).toBeInTheDocument();

  // Check for the heading text
  const headingElement = screen.getByText("Search Results");
  expect(headingElement).toBeInTheDocument();

  // Check for default classes
  const containerElement = screen.getByRole("heading", { level: 3 });
  expect(containerElement).toHaveClass(
    "scroll-m-20 text-xl font-semibold tracking-tight"
  );
});

test("renders DisplaySection with empty ranks", async () => {
  const emptyRanks: SearchEnginesRank = {
    google: "0",
    bing: "0",
  };

  await rtlRender(<DisplaySection searchEngineRanks={emptyRanks} />);

  // Check for the presence of empty ranks
  const googleRankElement = screen.getByText(/Google: 0/);
  expect(googleRankElement).toBeInTheDocument();

  const bingRankElement = screen.getByText(/Bing: 0/);
  expect(bingRankElement).toBeInTheDocument();
});
