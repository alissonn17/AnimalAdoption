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
          <div className="min-h-full flex items-center justify-center">
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
        <div className="min-h-full bg-gray-50">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Animais para Adoção</h1>
                <p className="text-xl opacity-90 mb-8">
                  Encontre seu novo melhor amigo entre nossos {animais.length}{" "}
                  pets disponíveis
                </p>
              </div>
            </div>
          </section>

          {/* Filters Section */}
          <section className="py-8 bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Buscar por nome ou raça..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <select
                  value={selectedEspecie}
                  onChange={(e) => setSelectedEspecie(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Todas as espécies</option>
                  {getUniqueValues("especie").map((especie) => (
                    <option key={especie} value={especie}>
                      {capitalize(String(especie))}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedPorte}
                  onChange={(e) => setSelectedPorte(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Todos os portes</option>
                  {getUniqueValues("porte").map((porte) => (
                    <option key={porte} value={porte}>
                      {capitalize(String(porte))}
                    </option>
                  ))}
                </select>

                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedEspecie("");
                    setSelectedPorte("");
                  }}
                >
                  Limpar Filtros
                </Button>
              </div>
            </div>
          </section>

          {/* Animals Grid */}
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {filteredAnimais.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    {searchTerm || selectedEspecie || selectedPorte
                      ? "Nenhum animal encontrado com os filtros aplicados."
                      : "Nenhum animal disponível no momento."}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredAnimais.map((animal) => (
                    <Link
                      key={animal.id}
                      href={`/animais/${animal.id}`}
                      className="group block"
                    >
                      <Card className="overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group-hover:border-primary/50">
                        <div className="aspect-square bg-gray-100 relative">
                          {animal.imagemUrl ? (
                            <Image
                              src={animal.imagemUrl}
                              alt={animal.nome}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">
                              <FiHeart className="text-4xl text-primary/60 group-hover:text-primary transition-colors" />
                            </div>
                          )}
                          <div className="absolute top-2 right-2">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                                animal.status === "disponivel"
                                  ? "bg-green-100 text-green-800 border border-green-200"
                                  : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                              }`}
                            >
                              {capitalize(animal.status)}
                            </span>
                          </div>
                        </div>

                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {animal.nome}
                          </CardTitle>
                          <CardDescription className="text-gray-600">
                            {capitalize(animal.especie)} •{" "}
                            {capitalize(animal.raca)}
                          </CardDescription>
                        </CardHeader>

                        <CardContent>
                          <div className="space-y-2 text-sm text-gray-600 mb-3">
                            <div className="flex items-center space-x-2">
                              <FiCalendar className="w-4 h-4 text-primary/70" />
                              <span>{animal.idade} anos</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="w-4 h-4 flex items-center justify-center text-primary/70">
                                📏
                              </span>
                              <span>Porte {animal.porte}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="w-4 h-4 flex items-center justify-center">
                                {animal.sexo === "macho" ? "♂️" : "♀️"}
                              </span>
                              <span>{capitalize(animal.sexo)}</span>
                            </div>
                          </div>

                          <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                            {animal.descricao}
                          </p>

                          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-2.5 shadow-md hover:shadow-lg transition-all duration-200">
                            <FiHeart className="mr-2 h-4 w-4" />
                            Ver Detalhes
                          </Button>
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
