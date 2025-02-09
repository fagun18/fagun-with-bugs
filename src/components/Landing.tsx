import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>1,000 Problems 🐞</h2>
            <h1>
              1 🫡
              <br />
              <span>solution</span>
            </h1>
          </div>
          <div className="landing-info">
          <h3>SQA</h3>
          <h2 className="landing-info-h2">
            <div className="landing-h2-1">Testing</div>
            <div className="landing-h2-2">Testers Tools</div>
          </h2>
          <h2>
            <div className="landing-h2-info">Tools</div>
            <div className="landing-h2-info-1"></div>
          </h2>
        </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
