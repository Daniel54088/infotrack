export const fetchPage = async (pageUrl: string) => {
  const response = await fetch(pageUrl);
  const text = await response.text();
  return text;
};
