import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";

// SEO metadata for different sections
const seoMetadata = {
  home: {
    title: "Mejbaur Bahar Fagun | Senior QA Engineer & Test Automation Expert",
    description: "Experienced Software QA Engineer specializing in Test Automation, API Testing, Performance Testing, and Quality Assurance. Expert in Selenium, Cypress, JMeter, Postman, and CI/CD integration.",
    keywords: "Mejbaur Bahar Fagun, Test Automation Expert, QA Engineer, Software Testing Professional"
  },
  about: {
    title: "About Mejbaur Bahar Fagun | Professional Software Testing Journey",
    description: "Learn about Mejbaur Bahar Fagun's expertise in Software Testing, Test Automation, and Quality Assurance. Discover my journey, skills, and professional achievements.",
    keywords: "QA Engineer Profile, Software Testing Experience, Test Automation Background, Quality Assurance Expert"
  },
  work: {
    title: "Portfolio & Projects | Mejbaur Bahar Fagun",
    description: "Explore my test automation projects, QA frameworks, and successful testing implementations. See how I've improved software quality across various projects.",
    keywords: "Test Automation Projects, QA Portfolio, Software Testing Cases, Quality Assurance Projects"
  },
  contact: {
    title: "Contact Mejbaur Bahar Fagun | Hire QA Expert",
    description: "Get in touch for software testing consultancy, test automation expertise, or quality assurance services. Let's discuss your testing needs.",
    keywords: "Hire QA Expert, Software Testing Consultant, Test Automation Services, Quality Assurance Professional"
  }
};

const App = () => {
  return (
    <>
      <Helmet>
        <title>{seoMetadata.home.title}</title>
        <meta name="description" content={seoMetadata.home.description} />
        <meta name="keywords" content={seoMetadata.home.keywords} />
        
        {/* Additional SEO meta tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seoMetadata.home.title} />
        <meta property="og:description" content={seoMetadata.home.description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoMetadata.home.title} />
        <meta name="twitter:description" content={seoMetadata.home.description} />
        
        {/* Technical SEO */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://mejbaurbaharfagun.com" />
      </Helmet>
      
      <LoadingProvider>
        <Suspense>
          <MainContainer>
            <Suspense>
              <CharacterModel />
            </Suspense>
          </MainContainer>
        </Suspense>
      </LoadingProvider>
    </>
  );
};

export default App;
