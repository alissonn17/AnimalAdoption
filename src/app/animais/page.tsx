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
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center animate-fade-in">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
                  Animais para Adoção
                </h1>
                <p className="text-lg md:text-xl text-purple-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                  🐾 Encontre seu novo melhor amigo entre nossos{" "}
                  <span className="font-bold text-yellow-300 bg-yellow-900/30 px-2 py-1 rounded">
                    {animais.length}
                  </span>{" "}
                  pets disponíveis para um lar cheio de amor
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
                  <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                    ❤️ Com amor
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                    🏠 Novo lar
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                    🎉 Felicidade
                  </span>
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
                    <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 text-lg" />
                    <Input
                      type="text"
                      placeholder="Digite o nome ou raça do seu futuro amigo..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 h-14 text-lg border-2 border-purple-200 focus:border-purple-500 rounded-xl bg-white/90 backdrop-blur-sm text-gray-800 placeholder:text-gray-500"
                      aria-label="Buscar animais por nome ou raça"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                        aria-label="Limpar busca"
                      >
                        <span className="text-lg">✕</span>
                      </button>
                    )}
                  </div>

                  {/* Enhanced Species Filter */}
                  <div className="relative">
                    <label
                      htmlFor="especie-filter"
                      className="block text-sm font-medium text-gray-800 mb-2"
                    >
                      🐕 Espécie
                    </label>
                    <select
                      id="especie-filter"
                      value={selectedEspecie}
                      onChange={(e) => setSelectedEspecie(e.target.value)}
                      className="w-full h-14 px-4 border-2 border-purple-200 rounded-xl focus:border-purple-500 bg-white/90 backdrop-blur-sm transition-all duration-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      aria-label="Filtrar por espécie"
                    >
                      <option value="">Todas as espécies</option>
                      {getUniqueValues("especie").map((especie) => (
                        <option
                          key={especie}
                          value={especie}
                          className="text-gray-800"
                        >
                          {especie === "cachorro" ? "🐕 " : "🐱 "}{" "}
                          {capitalize(String(especie))}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Enhanced Size Filter */}
                  <div className="relative">
                    <label
                      htmlFor="porte-filter"
                      className="block text-sm font-medium text-gray-800 mb-2"
                    >
                      📏 Porte
                    </label>
                    <select
                      id="porte-filter"
                      value={selectedPorte}
                      onChange={(e) => setSelectedPorte(e.target.value)}
                      className="w-full h-14 px-4 border-2 border-purple-200 rounded-xl focus:border-purple-500 bg-white/90 backdrop-blur-sm transition-all duration-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      aria-label="Filtrar por porte"
                    >
                      <option value="">Todos os portes</option>
                      {getUniqueValues("porte").map((porte) => (
                        <option
                          key={porte}
                          value={porte}
                          className="text-gray-800"
                        >
                          {porte === "pequeno"
                            ? "🐭 "
                            : porte === "médio"
                            ? "🐕 "
                            : "🐺 "}{" "}
                          {capitalize(String(porte))}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Filter Stats */}
                <div className="mt-6 text-center">
                  <p className="text-gray-700 text-base">
                    Mostrando{" "}
                    <span className="font-bold text-purple-700 text-lg">
                      {filteredAnimais.length}
                    </span>{" "}
                    de{" "}
                    <span className="font-bold text-gray-800">
                      {animais.length}
                    </span>{" "}
                    animais
                    {(searchTerm || selectedEspecie || selectedPorte) && (
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedEspecie("");
                          setSelectedPorte("");
                        }}
                        className="ml-4 text-purple-700 hover:text-purple-900 font-medium underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-1"
                        aria-label="Limpar todos os filtros"
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
                      className="group block animate-fade-in focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-offset-2 rounded-2xl"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                      }}
                      aria-label={`Ver detalhes de ${animal.nome}`}
                    >
                      <Card className="animal-card h-full bg-white border-2 border-gray-200 hover:border-purple-300 shadow-lg hover:shadow-2xl transition-all duration-300">
                        <div className="relative overflow-hidden">
                          <div className="animal-image aspect-square">
                            <Image
                              src={
                                animal.imagemUrl ||
                                `https://picsum.photos/400/300?random=${animal.id}`
                              }
                              alt={`Foto de ${animal.nome}, ${animal.raca}`}
                              width={300}
                              height={300}
                              className="w-full h-full object-cover"
                              priority={index < 8}
                            />
                          </div>

                          {/* Status Badge */}
                          <div className="absolute top-4 right-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg ${
                                animal.status === "disponivel"
                                  ? "bg-green-600 text-white animate-pulse"
                                  : animal.status === "adotado"
                                  ? "bg-gray-600 text-white"
                                  : "bg-yellow-600 text-white"
                              }`}
                            >
                              {animal.status === "disponivel"
                                ? "✨ Disponível"
                                : animal.status === "adotado"
                                ? "🏠 Adotado"
                                : "⏳ Reservado"}
                            </span>
                          </div>
                        </div>

                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                              {animal.especie === "cachorro" ? "🐕" : "🐱"}{" "}
                              {animal.nome}
                            </CardTitle>
                            <span
                              className="text-2xl"
                              aria-label={
                                animal.sexo === "macho" ? "Macho" : "Fêmea"
                              }
                            >
                              {animal.sexo === "macho" ? "♂️" : "♀️"}
                            </span>
                          </div>
                          <CardDescription className="text-gray-700 font-medium">
                            {capitalize(animal.raca)} •{" "}
                            {capitalize(animal.porte)}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="pt-0">
                          <div className="space-y-3">
                            <div className="flex items-center text-sm text-gray-700">
                              <FiCalendar className="mr-2 text-purple-600" />
                              <span className="font-medium">
                                {animal.idade}
                              </span>
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
                                aria-label={`Iniciar processo de adoção de ${animal.nome}`}
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
