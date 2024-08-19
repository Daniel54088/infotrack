export const searchEnginesArray = ["google", "bing"] as const; // Add more search engines as needed

export type SearchEngines = (typeof searchEnginesArray)[number];

export type SearchEnginesRank<T extends string = SearchEngines> = {
  [K in T]: string;
};
export type SearchEnginesHtmlString<T extends string = SearchEngines> = {
  [K in T]: string;
};
