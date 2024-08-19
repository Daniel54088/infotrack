import { describe, it, expect } from "vitest";
import { SearchEnginesHtmlString } from "@/types/seo-checker";
import {
  findIndexOfTargetUrl,
  getTargetUrlRank,
  searchInPages,
} from "../searchUtils";

describe("findIndexOfTargetUrl", () => {
  it("should return correct indexes for matching URLs", () => {
    const mockLinks = [
      { href: "https://example.com/page1" } as HTMLAnchorElement,
      { href: "https://target.com/page2" } as HTMLAnchorElement,
      { href: "https://example.com/page3" } as HTMLAnchorElement,
      { href: "https://target.com/page4" } as HTMLAnchorElement,
    ];

    const result = findIndexOfTargetUrl(mockLinks, "target.com");

    expect(result).toEqual([2, 4]); // Expect 1-based index
  });

  it("should return empty array if no matching URL is found", () => {
    const mockLinks = [
      { href: "https://example.com/page1" } as HTMLAnchorElement,
      { href: "https://example.com/page2" } as HTMLAnchorElement,
    ];

    const result = findIndexOfTargetUrl(mockLinks, "target.com");

    expect(result).toEqual([]);
  });

  it("should filter results beyond the top 50", () => {
    const mockLinks = Array.from({ length: 60 }, (_, i) => ({
      href: `https://target.com/page${i + 1}`,
    })) as HTMLAnchorElement[];

    const result = findIndexOfTargetUrl(mockLinks, "target.com");

    expect(result).toHaveLength(50);
  });
});

describe("getTargetUrlRank", () => {
  const mockHtml: SearchEnginesHtmlString = {
    google: '<div id="rso"><a href="https://target.com/page1">Link 1</a></div>',
    bing: '<li class="b_algo"><h2><a href="https://target.com/page1">Link 1</a></h2></li>',
  };

  it("should return the correct rank for the target URL", () => {
    const result = getTargetUrlRank(mockHtml, "target.com");

    expect(result).toEqual({
      google: "1",
      bing: "1",
    });
  });

  it('should return "0" if the target URL is not found', () => {
    const result = getTargetUrlRank(mockHtml, "notfound.com");

    expect(result).toEqual({
      google: "0",
      bing: "0",
    });
  });
});

describe("searchInPages", () => {
  it("should return correct ranks for the target URL", () => {
    const mockHtmlContent: SearchEnginesHtmlString = {
      google:
        '<div id="rso"><a href="https://target.com/page1">Link 1</a></div>',
      bing: '<li class="b_algo"><h2><a href="https://target.com/page1">Link 1</a></h2></li>',
    };

    const result = searchInPages("target.com", mockHtmlContent);

    expect(result).toEqual({
      google: "1",
      bing: "1",
    });
  });

  it('should return "0" if the target URL is not found in either search engine', () => {
    const mockHtmlContent: SearchEnginesHtmlString = {
      google:
        '<div id="rso"><a href="https://example.com/page1">Link 1</a></div>',
      bing: '<li class="b_algo"><h2><a href="https://example.com/page1">Link 1</a></h2></li>',
    };

    const result = searchInPages("target.com", mockHtmlContent);

    expect(result).toEqual({
      google: "0",
      bing: "0",
    });
  });
});
