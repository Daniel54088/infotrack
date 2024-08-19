import {
  render as rtlRender,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { AppProvider } from "@/app/main-provider";

export const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(
    () => [
      ...screen.queryAllByTestId(/loading/i),
      ...screen.queryAllByText(/loading/i),
    ],
    { timeout: 4000 }
  );

export const renderApp = async (
  ui: any,
  { url = "/", path = "/", ...renderOptions }: Record<string, any> = {}
) => {
  // if you want to render the app unauthenticated then pass "null" as the user

  const router = createMemoryRouter(
    [
      {
        path: path,
        element: ui,
      },
    ],
    {
      initialEntries: url ? ["/", url] : ["/"],
      initialIndex: url ? 1 : 0,
    }
  );

  const returnValue = {
    ...rtlRender(ui, {
      wrapper: () => {
        return (
          <AppProvider>
            <RouterProvider router={router} />
          </AppProvider>
        );
      },
      ...renderOptions,
    }),
    user: null,
  };

  await waitForLoadingToFinish();

  return returnValue;
};

export * from "@testing-library/react";
export { userEvent, rtlRender };
