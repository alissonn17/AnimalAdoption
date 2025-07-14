"use client"
import { JSX, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";
import axios from "axios";
import Getabrigoid from "../components/getAbrigoID";
import Postabrigo from "../components/postAbrigo";
import Putabrigo from "../components/putAbrigoID";
import Deleteabrigo from "../components/deleteAbrigo";

export default function Abrigo(): JSX.Element{
    const [res, setRes] = useState<resgetprop[]>([]);

    useEffect(()=>{
        async function fetchabrigo(){
        try{
            const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/Abrigos`);
        setRes(response.data);
      } catch (error) {
        console.log("Erro durante a requisição!", error);
      }
    }

    fetchabrigo();
    },[]);
    
    return <>
    <Header />
    <Main>
        <section className="flex flex-col items-center p-7">
        {res.map((abrigo) => (
            <div key={abrigo.id}>
                <h1 className="font-bold">{abrigo.nome}</h1>
                <p>Endereço: {abrigo.endereco}</p>
                <p>Capacidade: {abrigo.capacidade}</p>
                <p>Criado em: {new Date(abrigo.createdAt).toLocaleString()}</p>
                <p>Atualizado em: {new Date(abrigo.updatedAt).toLocaleString()}</p><br/>
            </div>
        ))}<br />

        <Getabrigoid/><br/>

        <Postabrigo /><br/>

        <Putabrigo /><br/>

        <Deleteabrigo /><br/>
        </section>        
    </Main>
    <Footer />
    </>
} 