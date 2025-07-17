import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import Image from "next/image";


export default function Home(): React.ReactNode{

  return (<>
    <Header />
    <Main>
      <Image src="/ico.png" alt="" width="400" height="400"/>
      <h1 id="animTitle" className="font-bold text-[#164c66]">Animal Adoption</h1>
    </Main>
    <Footer/>
    </>);
}
