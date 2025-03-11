import FeatureCard from "../components/home/features-card";
import { useNavigate } from "react-router-dom";

const Gallary = () => {
  const navigate = useNavigate();
  const handleRedirectPage = (url: string) => {
    if (!url) return;
    navigate(url);
  };
  return (
    <div className="bg-white">
      <FeatureCard handleRedirectPage={handleRedirectPage} />
    </div>
  );
};

export default Gallary;
