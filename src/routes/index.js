import { Auth } from "../pages/Auth";
import { ErrorPage } from "../pages/ErrorPage";
import { Transactions } from "../pages/Transactions";

export const privateRoutes = [
  { path: "/transactions", element: <Transactions />, exact: true },
  { path: "/error", element: <ErrorPage />, exact: true },
];

export const publicRoutes = [
  { path: "/auth", element: <Auth />, exact: true },
];
