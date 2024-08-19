import { SearchEnginesRank, searchEnginesArray } from "@/types/seo-checker";

export default function DisplaySection({
  searchEngineRanks,
}: {
  searchEngineRanks: SearchEnginesRank;
}) {
  return (
    <div className="mt-10">
      <div>
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Search Results
        </h3>
      </div>
      {searchEnginesArray.map((searchEngine) => (
        <div key={searchEngine}>
          {searchEngine.charAt(0).toUpperCase() + searchEngine.slice(1)}:{" "}
          {searchEngineRanks[searchEngine]}
        </div>
      ))}
    </div>
  );
}
