"use client"
import { JSX, useEffect, useState } from "react";
import axios from "axios";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { resgetprop } from "../types/abrigo-types";
import { schemapost } from "../types/abrigo-types";

const schema = schemapost;

type schemaAbrigo = z.infer<typeof schema>

export default function Postabrigo(): JSX.Element{
    const [res, setRes] = useState<resgetprop[]>([]);
    const [data, setdata] = useState<object>();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
        } = useForm<schemaAbrigo>({
        resolver: zodResolver(schema)
    });

    useEffect(()=>{
        async function fetchabrigo(){
            if (!data || data === null) return;

            try{
                await axios.post(`${process.env.NEXT_PUBLIC_URL}/Abrigos`, data);
                const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/Abrigos`);
                setRes(response.data);
                console.log(`${process.env.NEXT_PUBLIC_URL}/Abrigos/`);

            } catch (error) {
                console.log("Erro durante a requisição!", error);
            }
        }

        fetchabrigo();
    },[data]);

    function onSubmit(data: schemaAbrigo){
        setdata({
            nome: data.nome, 
            endereco:data.endereco,
            capacidade: data.capacidade
        });
        reset();
    }

    return <>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center">
            
            <div className="flex flex-col items-center justify-center">
                <h1 className="font-bold">Adicionar abrigo.</h1><br />
                <div>
                    <label className="font-bold" htmlFor="nome">Nome: </label>
                    <input className="bg-blue-300 rounded-2xl border-1 border-black p-1 hover:bg-blue-100"
                    type="text" 
                    {...register("nome")}
                    id="inputnome" 
                    placeholder="Digite o nome." />
                </div>
                {errors.nome && (
                    <span className="text-red-500 text-sm mt-1">
                        {errors.nome.message} 
                    </span>
                )}<br />

                <div>
                    <label className="font-bold" htmlFor="endereco">Endereco: </label>
                    <input className="bg-blue-300 rounded-2xl border-1 border-black p-1 hover:bg-blue-100"
                    type="text" 
                    {...register("endereco")}
                    id="inputendereco" 
                    placeholder="Digite o endereço." />
                </div>
                {errors.endereco && (
                    <span className="text-red-500 text-sm mt-1">
                        {errors.endereco.message} 
                    </span>
                )}<br />

                <div>
                    <label className="font-bold" htmlFor="capacidade">Capacidade: </label>
                    <input className="bg-blue-300 rounded-2xl border-1 border-black p-1 hover:bg-blue-100"
                    type="text" 
                    {...register("capacidade")}
                    id="inputcapacidade" 
                    placeholder="Digite o endereço." />
                </div>
                {errors.capacidade && (
                    <span className="text-red-500 text-sm mt-1">
                        {errors.capacidade.message} 
                    </span>
                )}<br />

            <button className="bg-blue-200 border-1 border-black rounded-2xl p-1 hover:bg-blue-400" type="submit">Enviar</button>
            </div><br />
        </form>

        <section className="flex flex-col items-center">
            {res.map((abrigo) => (
                <div key={abrigo.id}>
                    <h1 className="font-bold">{abrigo.nome}</h1>
                    <p>Endereço: {abrigo.endereco}</p>
                    <p>Capacidade: {abrigo.capacidade}</p>
                    <p>Criado em: {new Date(abrigo.createdAt).toLocaleString()}</p>
                    <p>Atualizado em: {new Date(abrigo.updatedAt).toLocaleString()}</p><br/>
                </div>
            ))}
        
        </section>        
    </>
} 