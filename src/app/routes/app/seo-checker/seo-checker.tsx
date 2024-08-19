import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ContentLayout } from "@/components/layouts";
import { Spinner } from "@/components/ui/spinner";

import SeoChecker from "@/features/seo-checker";

export const SeoCheckerRoute = () => {
  return (
    <>
      <ContentLayout title="Seo Checker">
        <Suspense
          fallback={
            <div className="flex size-full items-center justify-center">
              <Spinner size="xl" />
            </div>
          }
        >
          <ErrorBoundary
            fallback={
              <div>Failed to load Seo Checker. Try to refresh the page.</div>
            }
          >
            <SeoChecker />
          </ErrorBoundary>
        </Suspense>
      </ContentLayout>
    </>
  );
};
