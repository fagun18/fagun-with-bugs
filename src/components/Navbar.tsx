import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap-trial/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        const targetLink = e.currentTarget as HTMLAnchorElement;

        // Skip smooth scrolling for external links
        if (targetLink.getAttribute("data-href") === "#try-now") {
          return;
        }

        if (window.innerWidth > 1024) {
          e.preventDefault();
          let section = targetLink.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
      });
    });

    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });

    return () => {
      links.forEach((elem) => {
        let element = elem as HTMLAnchorElement;
        element.removeEventListener("click", () => {});
      });
      window.removeEventListener("resize", () => {});
    };
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          Fagun With Bugs🐞
        </a>
        <a
          href="mailto:mejbaur.bahar@mail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a
              data-href="#try-now"
              href="https://chromewebstore.google.com/detail/fagun-with-bugs-%F0%9F%90%9E-%E2%80%93-sqa/peelhgmemfhajlldpkamljidapnfnaob"
              target="_blank"
              rel="noopener noreferrer"
            >
              <HoverLinks text="Try Now Free" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
