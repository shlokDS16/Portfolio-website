import React from "react";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import SkillsPreview from "../components/sections/SkillsPreview";
import FeaturedProjects from "../components/sections/FeaturedProjects";
import HomeCTA from "../components/sections/HomeCTA";

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <About />
      <SkillsPreview />
      <FeaturedProjects />
      <HomeCTA />
    </main>
  );
};

export default Home;
