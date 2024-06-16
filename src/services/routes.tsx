/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  LoaderFunction,
  ActionFunction,
  createBrowserRouter,
} from "react-router-dom";

interface RouteCommon {
  loader?: LoaderFunction;
  action?: ActionFunction;
  ErrorBoundary?: React.ComponentType;
}

interface IRoute extends RouteCommon {
  path: string;
  Element: React.ComponentType;
}

// Use import.meta.globEager to import all .tsx files in the pages directory
const pages: any = import.meta.glob("../pages/**/*.tsx");

// Initialize an empty array to store the routes
const routes: IRoute[] = [];

// Loop through all the imported pages
for (const path of Object.keys(pages)) {
  // Extract the filename from the path
  const fileName = path.match(/pages(.*)(index.tsx)/)?.[1];
  // If the filename is not found, skip this iteration
  if (!fileName) {
    continue;
  }

  // Normalize the path name by replacing square brackets with colons and removing /index
  const normalizedPathName = fileName
    .replace(/\[(.*?)\]/g, ":$1")
    .replace(/\/index$/, "");

  // Use React.lazy to create a lazy-loaded component. The import function returns a promise that resolves to the component.
  const LazyComponent = React.lazy(pages[path]);

  // Push the route to the routes array
  routes.push({
    path: fileName === "index" ? "/" : `/${normalizedPathName.toLowerCase()}`,
    Element: LazyComponent,
    loader: pages[path]?.loader as LoaderFunction | undefined,
    action: pages[path]?.action as ActionFunction | undefined,
    ErrorBoundary: pages[path]?.ErrorBoundary,
  });
}

// Create a BrowserRouter with the routes. Each route is wrapped with a Suspense component to show a fallback UI while the component is loading.
const router = createBrowserRouter(
  routes.map(({ Element, ErrorBoundary, ...rest }) => ({
    ...rest,
    element: (
      <>
        <Element />
      </>
    ),
    ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
  }))
);

export default router;
