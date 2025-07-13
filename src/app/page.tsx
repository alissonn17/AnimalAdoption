import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";


export default function Home(): React.ReactNode{

  return (<>
    <Header />
    <Main>
      <h1>Texto</h1>
    </Main>
    <Footer/>
    </>);
}
