"use client";
import Navbar from "./Components/Navbar/Navbar";
import Banner from "./Components/Banner/Banner";
import Cards from "./Components/Cards/Cards";
import Footer from "./Components/Footer/Footer";


export default function Home() {

  return (
    <div className="page-container relative min-h-screen">
      <Navbar />
      <main className="pb-48 pt-20">
        <Banner />
        <Cards />
      </main>
      <Footer />
    </div>
  );
}
