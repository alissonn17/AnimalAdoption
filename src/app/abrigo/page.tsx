import { JSX } from "react";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import { Main } from "../components/Main";

export default function abrigo(): JSX.Element{
    
    return <>
    <Header />
    <Main>
        <h1>Hello</h1>
    </Main>
    <Footer />
    </>
} 