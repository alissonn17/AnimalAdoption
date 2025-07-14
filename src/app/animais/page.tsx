"use client";

import { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Loading } from "../components/ui/loading";
import { animaisService } from "../services/animal-api";
import { mockAnimals } from "../services/mockData";
import { Animal } from "../types/animal-types";
import { FiHeart, FiCalendar, FiSearch } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { capitalize } from "../lib/utils";

export default function AnimaisPage() {
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [filteredAnimais, setFilteredAnimais] = useState<Animal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEspecie, setSelectedEspecie] = useState("");
  const [selectedPorte, setSelectedPorte] = useState("");

  const loadAnimais = async () => {
    try {
      setIsLoading(true);
      const data = await animaisService.getAll();
      // Se a API retornar vazio, usar dados mock para demonstração
      setAnimais(data.length > 0 ? data : mockAnimals);
    } catch (err) {
      // Se houver erro na API, usar dados mock
      console.warn("API não disponível, usando dados mock:", err);
      setAnimais(mockAnimals);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    loadAnimais();
  }, []);

  const filterAnimais = useCallback(() => {
    let filtered = animais;

    if (searchTerm) {
      filtered = filtered.filter(
        (animal) =>
          animal.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          animal.raca.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedEspecie) {
      filtered = filtered.filter(
        (animal) => animal.especie === selectedEspecie
      );
    }

    if (selectedPorte) {
      filtered = filtered.filter((animal) => animal.porte === selectedPorte);
    }

    setFilteredAnimais(filtered);
  }, [animais, searchTerm, selectedEspecie, selectedPorte]);

  useEffect(() => {
    filterAnimais();
  }, [filterAnimais]);

  const getUniqueValues = (key: keyof Animal) => {
    return [...new Set(animais.map((animal) => animal[key]))].filter(Boolean);
  };

  if (!isMounted || isLoading) {
    return (
      <>
        <Header />
        <Main>
          <div className="min-h-screen flex items-center justify-center">
            <Loading>Carregando animais...</Loading>
          </div>
        </Main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Main>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
          {/* Enhanced Hero Section */}
          <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 text-white py-20">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center animate-fade-in">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Animais para Adoção
                </h1>
                <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
                  🐾 Encontre seu novo melhor amigo entre nossos{" "}
                  <span className="font-bold text-yellow-300">{animais.length}</span>{" "}
                  pets disponíveis para um lar cheio de amor
                </p>
                <div className="flex justify-center space-x-4 text-lg">
                  <span className="bg-white/20 px-4 py-2 rounded-full">❤️ Com amor</span>
                  <span className="bg-white/20 px-4 py-2 rounded-full">🏠 Novo lar</span>
                  <span className="bg-white/20 px-4 py-2 rounded-full">🎉 Felicidade</span>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 bg-yellow-300/20 rounded-full animate-pulse"></div>
          </section>

          {/* Enhanced Filters Section */}
          <section className="py-12 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="search-container animate-fade-in">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  🔍 Encontre seu pet ideal
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Enhanced Search Input */}
                  <div className="relative col-span-full md:col-span-2">
                    <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 text-lg" />
                    <Input
                      type="text"
                      placeholder="Digite o nome ou raça do seu futuro amigo..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 h-14 text-lg border-2 border-purple-200 focus:border-purple-500 rounded-xl bg-white/80 backdrop-blur-sm"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Enhanced Species Filter */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">🐕 Espécie</label>
                    <select
                      value={selectedEspecie}
                      onChange={(e) => setSelectedEspecie(e.target.value)}
                      className="w-full h-14 px-4 border-2 border-purple-200 rounded-xl focus:border-purple-500 bg-white/80 backdrop-blur-sm transition-all duration-300"
                    >
                      <option value="">Todas as espécies</option>
                      {getUniqueValues("especie").map((especie) => (
                        <option key={especie} value={especie}>
                          {especie === 'cachorro' ? '🐕 ' : '🐱 '} {capitalize(String(especie))}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Enhanced Size Filter */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">📏 Porte</label>
                    <select
                      value={selectedPorte}
                      onChange={(e) => setSelectedPorte(e.target.value)}
                      className="w-full h-14 px-4 border-2 border-purple-200 rounded-xl focus:border-purple-500 bg-white/80 backdrop-blur-sm transition-all duration-300"
                    >
                      <option value="">Todos os portes</option>
                      {getUniqueValues("porte").map((porte) => (
                        <option key={porte} value={porte}>
                          {porte === 'pequeno' ? '🐭 ' : porte === 'médio' ? '🐕 ' : '🐺 '} {capitalize(String(porte))}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Filter Stats */}
                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Mostrando <span className="font-bold text-purple-600">{filteredAnimais.length}</span> de{" "}
                    <span className="font-bold">{animais.length}</span> animais
                    {(searchTerm || selectedEspecie || selectedPorte) && (
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedEspecie("");
                          setSelectedPorte("");
                        }}
                        className="ml-4 text-purple-600 hover:text-purple-800 font-medium underline"
                      >
                        Limpar filtros
                      </button>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Enhanced Animals Grid */}
          <section className="pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {filteredAnimais.length === 0 ? (
                <div className="text-center py-16 animate-fade-in">
                  <div className="text-6xl mb-4">😢</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Nenhum animal encontrado
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Tente ajustar os filtros ou buscar por outros termos
                  </p>
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedEspecie("");
                      setSelectedPorte("");
                    }}
                    className="btn-primary"
                  >
                    Ver todos os animais
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredAnimais.map((animal, index) => (
                    <Link
                      key={animal.id}
                      href={`/animais/${animal.id}`}
                      className="group block animate-fade-in"
                      style={{
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      <Card className="animal-card h-full">
                        <div className="relative overflow-hidden">
                          <div className="animal-image aspect-square">
                            <Image
                              src={animal.foto || "/api/placeholder/300/300"}
                              alt={`Foto de ${animal.nome}`}
                              width={300}
                              height={300}
                              className="w-full h-full object-cover"
                              priority={index < 8}
                            />
                          </div>
                          
                          {/* Status Badge */}
                          <div className="absolute top-4 right-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                                animal.status === "disponivel"
                                  ? "bg-green-500 text-white animate-pulse"
                                  : animal.status === "adotado"
                                  ? "bg-gray-500 text-white"
                                  : "bg-yellow-500 text-white"
                              }`}
                            >
                              {animal.status === "disponivel" ? "✨ Disponível" : 
                               animal.status === "adotado" ? "🏠 Adotado" : "⏳ Reservado"}
                            </span>
                          </div>
                        </div>

                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                              {animal.especie === 'cachorro' ? '🐕' : '🐱'} {animal.nome}
                            </CardTitle>
                            <span className="text-2xl">
                              {animal.sexo === 'macho' ? '♂️' : '♀️'}
                            </span>
                          </div>
                          <CardDescription className="text-gray-600">
                            {capitalize(animal.raca)} • {capitalize(animal.porte)}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="pt-0">
                          <div className="space-y-3">
                            <div className="flex items-center text-sm text-gray-600">
                              <FiCalendar className="mr-2 text-purple-500" />
                              <span>{animal.idade}</span>
                            </div>
                            
                            <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                              {animal.descricao}
                            </p>

                            {animal.status === "disponivel" && (
                              <Button
                                className="adoption-btn w-full mt-4 group"
                                onClick={(e) => {
                                  e.preventDefault();
                                  // Aqui você pode adicionar a lógica de adoção
                                }}
                              >
                                <FiHeart className="heart-icon mr-2 group-hover:animate-heartbeat" />
                                Quero Adotar
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </Main>
      <Footer />
    </>
  );
}
