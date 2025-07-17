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
import { FiMapPin, FiUsers, FiCalendar, FiHeart, FiHome, FiPlus, FiEdit3, FiTrash2, FiSearch } from "react-icons/fi";

export default function Abrigo(): JSX.Element{
    const [res, setRes] = useState<resgetprop[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showActions, setShowActions] = useState(false);

    useEffect(()=>{
        async function fetchabrigo(){
        try{
            setLoading(true);
            const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/Abrigos`);
            setRes(response.data);
            setError(null);
        } catch (error) {
            console.log("Erro durante a requisição!", error);
            setError("Erro ao carregar abrigos. Tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    }

    fetchabrigo();
    },[]);

    const filteredAbrigos = res.filter(abrigo => 
        abrigo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        abrigo.endereco.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return <>
    <Header />
    <Main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <FiHome className="h-20 w-20 text-purple-600 animate-pulse" />
                            <FiHeart className="h-8 w-8 text-red-500 absolute -top-2 -right-2 animate-bounce" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Abrigos Parceiros
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Conheça os abrigos que trabalham incansavelmente para cuidar e encontrar lares para animais em situação de vulnerabilidade
                    </p>
                </div>

                <div className="flex justify-center mb-8">
                    <Image 
                        src="/casa.png" 
                        alt="Casa para pets" 
                        width={400} 
                        height={300}
                        className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                    />
                </div>

                <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center">
                    <FiPlus className="h-12 w-12 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-3">Contribua com a Causa</h3>
                    <p className="text-lg mb-6">
                        Conhece algum abrigo que deveria estar aqui? Ajude-nos a expandir nossa rede de parceiros!
                    </p>
                    <button 
                        onClick={() => setShowActions(!showActions)}
                        className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105"
                    >
                        {showActions ? 'Ocultar Ações' : 'Gerenciar Abrigos'}
                    </button>
                </div>
            </div>
        </section>

        {/* Search Section */}
        <section className="py-8 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative max-w-md mx-auto">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                        type="text"
                        placeholder="Buscar abrigos por nome ou localização..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                    />
                </div>
            </div>
        </section>

        {/* Management Actions */}
        {showActions && (
            <section className="py-8 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                            <FiSearch className="h-8 w-8 text-blue-600 mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Buscar Abrigo</h3>
                            <Getabrigoid />
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                            <FiPlus className="h-8 w-8 text-green-600 mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Adicionar Abrigo</h3>
                            <Postabrigo />
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                            <FiEdit3 className="h-8 w-8 text-yellow-600 mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Editar Abrigo</h3>
                            <Putabrigo />
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                            <FiTrash2 className="h-8 w-8 text-red-600 mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Remover Abrigo</h3>
                            <Deleteabrigo />
                        </div>
                    </div>
                </div>
            </section>
        )}

        {/* Abrigos List */}
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Nossos Abrigos Parceiros
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        {filteredAbrigos.length} abrigo{filteredAbrigos.length !== 1 ? 's' : ''} encontrado{filteredAbrigos.length !== 1 ? 's' : ''}
                    </p>
                </div>

                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                        <span className="ml-3 text-gray-600">Carregando abrigos...</span>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                        <div className="text-red-600 mb-2">❌ Erro ao carregar</div>
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                {!loading && !error && filteredAbrigos.length === 0 && (
                    <div className="text-center py-12">
                        <FiHome className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">
                            Nenhum abrigo encontrado
                        </h3>
                        <p className="text-gray-500">
                            {searchTerm ? 'Tente ajustar sua busca' : 'Ainda não há abrigos cadastrados'}
                        </p>
                    </div>
                )}

                {!loading && !error && filteredAbrigos.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredAbrigos.map((abrigo) => (
                            <div 
                                key={abrigo.id} 
                                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex items-center mb-4">
                                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                                        <FiHome className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                                        {abrigo.nome}
                                    </h3>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-start space-x-3">
                                        <FiMapPin className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                                        <p className="text-gray-600 text-sm">
                                            {abrigo.endereco}
                                        </p>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <FiUsers className="h-5 w-5 text-gray-500" />
                                        <p className="text-gray-600 text-sm">
                                            <span className="font-semibold">Capacidade:</span> {abrigo.capacidade} animais
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100">
                                        <div className="flex items-center space-x-2 text-xs text-gray-500 mb-1">
                                            <FiCalendar className="h-4 w-4" />
                                            <span>Criado em: {new Date(abrigo.createdAt).toLocaleDateString('pt-BR')}</span>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                                            <FiEdit3 className="h-4 w-4" />
                                            <span>Atualizado em: {new Date(abrigo.updatedAt).toLocaleDateString('pt-BR')}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                                        Ver Animais do Abrigo
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>        
    </Main>
    <Footer />
    </>
} 