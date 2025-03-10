import { IconExternalLink } from "@tabler/icons-react";
import "./feature-card.css";

type Props = {
  handleRedirectPage: (url: string) => void;
};
const FeatureCard = ({ handleRedirectPage }: Props) => {
  return (
    <div className="features-card">
      <div className="card">
        <div className="img-card">
          <img
            src="/static/images/tic-tac-toe.png"
            alt="tic-tac-toe"
            className="img-content"
          />
        </div>
        <div className="info-card">
          <div className="info-card-content">
            <div className="left-content">
              <span className="badge">html</span>
              <span className="badge">react</span>
              <span className="badge">javascript</span>
              <span className="badge">css</span>
              <span className="badge">web</span>
              <span className="badge">UI</span>
            </div>
            <button
              onClick={() => {
                handleRedirectPage("/game");
              }}
              className="right-content"
            >
              <IconExternalLink width="24px" height="24px" stroke={2} />
            </button>
          </div>
        </div>
      </div>
      <div
        className="card"
        onClick={() => {
          handleRedirectPage("/game");
        }}
      >
        2
      </div>
      <div
        className="card"
        onClick={() => {
          handleRedirectPage("/game");
        }}
      >
        3
      </div>
      <div
        className="card"
        onClick={() => {
          handleRedirectPage("/game");
        }}
      >
        4
      </div>
    </div>
  );
};

export default FeatureCard;
