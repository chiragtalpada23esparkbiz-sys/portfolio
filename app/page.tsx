import dynamic from "next/dynamic";
import {
  Hero,
  About,
  Experience,
  Education,
  TechStack,
  Projects,
  AchievementsRecognition,
  Testimonials,
  BlogPreview,
} from "@/components/sections";
import { getAllPosts } from "@/lib/mdx";

const Contact = dynamic(() =>
  import("@/components/sections/contact").then((mod) => mod.Contact),
);

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <>
      <Hero />
      <About />
      <TechStack />
      <Experience />
      <Education />
      <Projects />
      <AchievementsRecognition />
      <Testimonials />
      <BlogPreview
        posts={posts.slice(0, 3)}
        baseUrl={"https://www.chiragtalpada.in"}
      />
      <Contact />
    </>
  );
}
