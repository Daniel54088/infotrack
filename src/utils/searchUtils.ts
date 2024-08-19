import {
  SearchEnginesHtmlString,
  SearchEnginesRank,
  SearchEngines,
} from "../types/seo-checker";

export const fetchHtmlFilesContent = <
  T extends string = SearchEngines
>(): SearchEnginesHtmlString<T> => {
  const searchEngines = ["google", "bing"] as const; // Add more search engines here
  const modules = import.meta.glob(
    ["../public/html/google/*.html", "../public/html/bing/*.html"],
    // add more search engines here, meta.glob is a Vite feature and refuse to use dynamic import
    {
      query: "?raw",
      eager: true,
    }
  );

  const htmlContent: Partial<SearchEnginesHtmlString<T>> = {};

  for (const engine of searchEngines) {
    htmlContent[engine as T] = "";
  }

  for (const key in modules) {
    const moduleContent = modules[key] as { default: string };

    for (const engine of searchEngines) {
      if (key.includes(engine)) {
        htmlContent[engine as T] += moduleContent.default;
      }
    }
  }

  return htmlContent as SearchEnginesHtmlString<T>;
};

export const findIndexOfTargetUrl = (
  links: HTMLAnchorElement[],
  targetUrl: string
) => {
  return links
    .map((link, index) => {
      if (link.href.includes(targetUrl)) {
        return index + 1; // Adjust for 1-based indexing if needed
      }
      return -1;
    })
    .filter((position) => position > 0)
    .filter((rank) => rank <= 50); // Limit to first 50 results
};

export const getTargetUrlRank = <T extends string = SearchEngines>(
  html: SearchEnginesHtmlString<T>,
  targetUrl: string
): SearchEnginesRank<T> => {
  const parser = new DOMParser();

  const result: Partial<SearchEnginesRank<T>> = {};
  const selectors: Record<string, string> = {
    google: "#rso a",
    bing: ".b_algo h2 a",
    // Add more search engines and their corresponding selectors here
  };

  for (const engine in html) {
    const doc = parser.parseFromString(html[engine as T], "text/html");
    const links = Array.from(
      doc.querySelectorAll<HTMLAnchorElement>(selectors[engine])
    );

    const filteredLinks = links.filter(
      (link) =>
        !link.href.startsWith("http://localhost:5173") &&
        !link.href.startsWith("https://webcache.googleusercontent.com/search?")
    );

    const indexes = findIndexOfTargetUrl(filteredLinks, targetUrl);
    result[engine as T] = indexes.length > 0 ? indexes.join(", ") : "0";
  }

  return result as SearchEnginesRank<T>;
};

export const searchInPages = <T extends string = SearchEngines>(
  targetUrl: string,
  htmlContent: SearchEnginesHtmlString<T>
): SearchEnginesRank<T> => {
  return getTargetUrlRank(htmlContent, targetUrl);
};
