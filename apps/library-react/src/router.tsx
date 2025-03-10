import {
  BrowserRouter as Router,
  Route,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import App from "./App";
import Game from "./page/game";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [],
  },
  {
    path: "/game",
    element: <Game />,
    children: [],
  },
]);
export default router;
