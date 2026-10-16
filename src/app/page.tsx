import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Fleet } from "@/components/sections/fleet";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Navbar } from "@/components/sections/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Fleet />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
