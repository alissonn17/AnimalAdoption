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

import { resgetprop } from "../types/abrigo-types";
import Image from "next/image";

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
            <h1 className="font-bold">Abrigos</h1><br />
            <Image src="/casa.png" alt="casinha para pet" width="527" height="438"/><br />

            <p id="abrigoIntro">Informações sobre abrigos para pets, caso saiba de alguns que nós não conhecemos insira no nosso cadastro, assim fazendo com que mais abrigos fiquem conhecidos e mais pets sejam ajudados</p><br/>

            <Getabrigoid/><br/>

            <Postabrigo /><br/>

            <Putabrigo /><br/>

            <Deleteabrigo /><br />

            <div id="gets" className="bg-blue-200 flex flex-col rounded-2xl p-3.5 items-center justify-center">
                <h1 className="font-bold">Abrigos:</h1>
                {res.map((abrigo) => (
                    <div key={abrigo.id}><br/>
                        <h1 className="font-bold">{abrigo.nome}</h1>
                        <p>Endereço: {abrigo.endereco}</p>
                        <p>Capacidade: {abrigo.capacidade}</p>
                        <p>Criado em: {new Date(abrigo.createdAt).toLocaleString()}</p>
                        <p>Atualizado em: {new Date(abrigo.updatedAt).toLocaleString()}</p>
                    </div>
                ))}
            </div>

        </section>        
    </Main>
    <Footer />
    </>
} 