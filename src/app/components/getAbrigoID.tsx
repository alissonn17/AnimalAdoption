"use client"
import { JSX, useEffect, useState } from "react";
import axios from "axios";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { resgetprop } from "../types/abrigo-types";
import { schemaid } from "../types/abrigo-types";

const schema = schemaid;

type schemaId = z.infer<typeof schema>

export default function Getabrigoid(): JSX.Element{
    const [res, setRes] = useState<resgetprop>();
    const [id, setid] = useState<string>("");
    const [load, setLoad] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
        } = useForm<schemaId>({
        resolver: zodResolver(schema)
    });

    useEffect(()=>{
        async function fetchabrigo(){
            if (!id || id.trim().length === 0) return;

            try{
                const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/Abrigos/${id}`);
                setRes(response.data);
                console.log(`${process.env.NEXT_PUBLIC_URL}/Abrigos/${id}`)

            } catch (error) {
                
                console.log("Erro durante a requisição!", error);
            }
        }

        fetchabrigo();
    },[id]);

    function onSubmit(data: schemaId){
        setid(data.id);
        setLoad(true);
        reset();
    }

    return <>
        <form onSubmit={handleSubmit(onSubmit)}>
            
            <div className="flex flex-col items-center justify-center">
                <h1 className="font-bold">Procure por um abrigo.</h1><br />
                <div>
                    <label className="font-bold" htmlFor="id">Abrigo(ID): </label>
                    <input className="bg-blue-300 rounded-2xl border-1 border-black p-1" 
                    type="text" 
                    {...register("id")}
                    id="inputid" 
                    placeholder="Digite o ID." />
                </div>
                {errors.id && (
                    <span className="text-red-500 text-sm mt-1">
                        {errors.id.message} 
                    </span>
                )}<br />
            <button className="bg-blue-200 border-1 border-black rounded-2xl p-1" type="submit">Enviar</button>
            </div><br />
            {load &&
                <div key={id}>
                    <h1 className="font-bold">{res?.nome}</h1>
                    <p>Endereço: {res?.endereco}</p>
                    <p>Capacidade: {res?.capacidade}</p>
                    <p>Criado em: {res?.createdAt ? new Date(res.createdAt).toLocaleString("pt-BR") : "Data não disponível"}</p>
                    <p>Atualizado em: {res?.updatedAt ? new Date(res.updatedAt).toLocaleString("pt-BR") : "Data não disponível"}</p>
                </div>
            }
        </form>
    </>
} 