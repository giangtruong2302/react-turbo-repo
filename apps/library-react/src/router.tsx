import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Game from "./page/game";
import Gallary from "./page/gallary";
import Movie from "./page/movie";

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
  {
    path: "/gallary",
    element: <Gallary />,
  },
  {
    path: "/movie",
    element: <Movie />,
  },
]);
export default router;
