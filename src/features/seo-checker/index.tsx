import { useState } from "react";
import { searchInPages, fetchHtmlFilesContent } from "@/utils/searchUtils";
import { isURL } from "@/utils/isURL";

import DisplaySection from "./components/display-section";
import SearchSection from "./components/search-section";
import { SearchEnginesRank, searchEnginesArray } from "@/types/seo-checker";

export default function SeoChecker() {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchEngineRanks, setSearchEngineRanks] = useState<SearchEnginesRank>(
    searchEnginesArray.reduce((acc, engine) => {
      acc[engine] = "";
      return acc;
    }, {} as Record<(typeof searchEnginesArray)[number], string>)
  );
  const htmlContent = fetchHtmlFilesContent();

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    const isValidUrl = isURL(inputValue);
    if (!isValidUrl) {
      alert("Invalid URL, please type a valid URL");
      return;
    }
    const foundPositions = searchInPages(inputValue, htmlContent);
    setSearchEngineRanks(foundPositions);
  };

  return (
    <div>
      <SearchSection
        inputValue={inputValue}
        handleOnchange={handleOnchange}
        handleSearch={handleSearch}
      />
      <DisplaySection searchEngineRanks={searchEngineRanks} />
    </div>
  );
}
