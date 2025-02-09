import "./styles/Work.css";
import { FaTools, FaShieldAlt, FaCode, FaDatabase, FaLock, FaRocket } from "react-icons/fa"; // colorful free icons
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;
    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: "bottom bottom",  // Adjust the end of the scroll trigger
        scrub: true,
        pin: true,
        pinType: !ScrollTrigger.isTouch ? "transform" : "fixed",
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      duration: 40,
      delay: 0.2,
    });
  }, []);

  const tools = [
    {
      id: 1,
      name: "Website Comparison Tool",
      category: "Automation",
      tools: "Python, Selenium, BeautifulSoup, Difflib",
      description: "Automates website comparison for SQA tasks, including HTML content comparison, screenshot capture, and element analysis.",
      icon: <FaTools color="#FF6347" size={50} />,
      pricing: "Free",
    },
    {
      id: 2,
      name: "Web Vulnerability Scanner",
      category: "Security",
      tools: "Python, Requests, BeautifulSoup",
      description: "Scans websites for vulnerabilities like SQL injection and XSS, providing detailed exploitation instructions.",
      icon: <FaShieldAlt color="#FFD700" size={50} />,
      pricing: "Basic",
    },
    {
      id: 3,
      name: "API Checker (Automation)",
      category: "Automation",
      tools: "Python, Postman, Requests",
      description: "Automates API testing with Python, covering test case creation, execution, and reporting.",
      icon: <FaCode color="#32CD32" size={50} />,
      pricing: "Premium",
    },
    {
      id: 4,
      name: "Fagun SQA Testing Tools",
      category: "Browser Extension",
      tools: "JavaScript, HTML, CSS",
      description: "A browser extension for software testers, offering essential tools for manual, automation, API, and security testing.",
      icon: <FaDatabase color="#1E90FF" size={50} />,
      pricing: "Free",
    },
    {
      id: 5,
      name: "Password Checker",
      category: "Security",
      tools: "Python, Flask",
      description: "A tool to check password strength and security, designed for SQA and cybersecurity purposes.",
      icon: <FaLock color="#8A2BE2" size={50} />,
      pricing: "Basic",
    },
    {
      id: 6,
      name: "SQL Injection Scanner",
      category: "Security",
      tools: "Python, SQLMap",
      description: "Scans websites for SQL injection vulnerabilities using a list of common payloads.",
      icon: <FaRocket color="#FF4500" size={50} />,
      pricing: "Premium",
    },
  ];

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          Use Our <span>Other Tools</span>
        </h2>
        <div className="work-flex">
          {tools.map((tool, index) => (
            <div className="work-box" key={tool.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{tool.name}</h4>
                    <p>{tool.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{tool.tools}</p>
                <h4>Pricing</h4>
                <p>{tool.pricing}</p>
              </div>
              <div className="work-icon">{tool.icon}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
