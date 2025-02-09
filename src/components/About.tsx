import "./styles/About.css";
import SEO from "./SEO";

const About = () => {
  return (
    <>
      <SEO
        title="About Mejbaur Bahar Fagun | Senior QA & Security Testing Expert"
        description="Discover Mejbaur Bahar Fagun's journey as an SQA Team Lead at Developer eXperience Hub. Expert in software quality assurance, security testing, and test automation with CEH certification."
        keywords="SQA Team Lead, Software Quality Assurance, Security Testing, Test Automation, CEH Certified, Manual Testing, Automated Testing, BSc CSE, Digital Forensic Expert, Reverse Engineering, Malware Analysis, Cybersecurity, Quality Control"
        path="/about"
      />
      <div className="about-section" id="about">
        <div className="about-me">
          <h3 className="title">About Tool</h3>
          <p className="para">
        1,000 Problems🐞, 1 Solution🫡 : Revolutionize Your Workflow with the Ultimate Chrome Extension 🎯
          <a
            href="https://chromewebstore.google.com/detail/fagun-with-bugs-%F0%9F%90%9E-%E2%80%93-sqa/peelhgmemfhajlldpkamljidapnfnaob"
            className="try-now-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Try Now Free🚀
          </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
