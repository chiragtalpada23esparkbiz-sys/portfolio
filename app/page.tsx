import {
  Hero,
  About,
  Experience,
  Education,
  TechStack,
  Projects,
  Certifications,
  Achievements,
  Testimonials,
  Companies,
  Approach,
  Contact,
  BlogPreview,
} from "@/components/sections";
import { getAllPosts } from "@/lib/mdx";

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
      <Certifications />
      <Achievements />
      <Testimonials />
      <Companies />
      <Approach />
      <BlogPreview posts={posts.slice(0, 3)} />
      <Contact />
    </>
  );
}
