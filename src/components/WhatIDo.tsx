import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };

  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);

  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          <span className="hat-h2">Bugs🐞</span>
          <div>
            <span className="do-h2">Hub</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-content what-noTouch" ref={(el) => setRef(el, 0)}>
            <div className="what-content-in">
              <h3>Browser Extension for Testers</h3>
              <h4>Description</h4>
              <p>
                To organize and access tools for manual testing, automation, API testing, and security analysis.
              </p>
              <h5>Key Features</h5>
              <ul>
                <li>✅ Centralized resource directory</li>
                <li>✅ One-click access to essential tools</li>
                <li>✅ Lightweight & secure</li>
                <li>✅ Customizable to fit workflow</li>
              </ul>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div className="what-content what-noTouch" ref={(el) => setRef(el, 1)}>
            <div className="what-content-in">
              <h3>Supported Platforms & Usage</h3>
              <h4>Description</h4>
              <p>
                Works seamlessly across Windows, Mac, and Linux.
              </p>
              <h5>How to Use</h5>
              <ul>
                <li>1️⃣ Install from the Chrome Web Store</li>
                <li>2️⃣ Open the extension for categorized resources</li>
                <li>3️⃣ Click on a resource for quick access</li>
                <li>4️⃣ Customize your favorite tools</li>
              </ul>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);
    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
