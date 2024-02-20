import Explore from "@/components/homepage/sections/explore/Explore";
import Features from "@/components/homepage/sections/features/Features";
import Footer from "@/components/homepage/sections/footer/Footer";
import Games from "@/components/homepage/sections/games/Games";
import Header from "@/components/homepage/sections/header/Header";
import Hero from "@/components/homepage/sections/hero/Hero";
import Map from "@/components/homepage/sections/map/Map";
import Platform from "@/components/homepage/sections/platform/Platform";


export default function Home() {
  return (
    <main>
      {/* <h1>Projet fil rouge</h1>
      <h2>Brainbolt | Free Online Games</h2> */}
      <Header />
      <Hero />
      <Platform />
      <Games />
      <Features />
      <Explore />
      <Map />
      <Footer />
    </main>
  );
}
