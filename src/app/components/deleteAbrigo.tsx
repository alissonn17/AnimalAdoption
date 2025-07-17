"use client"
import { JSX, useEffect, useState } from "react";
import axios from "axios";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { schemadel } from "../types/abrigo-types";

const schema = schemadel;

type schemaId = z.infer<typeof schema>

export default function Deleteabrigo(): JSX.Element{
    const [res, setRes] = useState<string>();
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
                await axios.delete(`${process.env.NEXT_PUBLIC_URL}/Abrigos/${id}`);
                setRes("Abrigo deletado com sucesso!");
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
                <h1 className="font-bold">Deletar abrigo.</h1><br />
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
            {load &&
                <h1 className="font-bold">{res}</h1>
            }
            </div>

        </form>
    </>
} 