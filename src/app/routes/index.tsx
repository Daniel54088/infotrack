import { createBrowserRouter } from "react-router-dom";

export const createRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      lazy: async () => {
        const { SeoCheckerRoute } = await import(
          "./app/seo-checker/seo-checker"
        );
        return { Component: SeoCheckerRoute };
      },
    },
    {
      path: "*",
      lazy: async () => {
        const { NotFoundRoute } = await import("./not-found");
        return { Component: NotFoundRoute };
      },
    },
  ]);
