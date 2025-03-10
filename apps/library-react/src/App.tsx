import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useNavigate } from "react-router-dom";
import FeatureCard from "./components/home/features-card";

function App() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const handleRedirectPage = (url: string) => {
    if (!url) return;
    navigate(url);
  };
  return (
    <div className="container">
      <FeatureCard handleRedirectPage={handleRedirectPage} />
    </div>
  );
}

export default App;
