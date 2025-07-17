"use client";

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import Link from "next/link";
import Image from "next/image";
import {
  FiHeart,
  FiMapPin,
  FiUsers,
  FiArrowRight,
  FiShield,
  FiStar,
  FiPhone,
  FiMail,
  FiClock,
  FiTrendingUp,
  FiAward,
  FiGift,
} from "react-icons/fi";
import { animaisService } from "./services/animal-api";
import { Animal } from "./types/animal-types";
import { mockAnimals } from "./services/mockData";

/**
 * Homepage do sistema de adoção de animais
 * Landing page completa com todas as seções necessárias
 */
export default function HomePage(): React.ReactElement {
  const [featuredAnimals, setFeaturedAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAnimals: 0,
    adoptedAnimals: 0,
    shelters: 0,
    happyFamilies: 0,
  });
  const [email, setEmail] = useState("");

  useEffect(() => {
    loadFeaturedAnimals();
    loadStats();
  }, []);

  const loadFeaturedAnimals = async () => {
    try {
      setLoading(true);
      const animals = await animaisService.getAll();

      if (animals && animals.length > 0) {
        setFeaturedAnimals(animals.slice(0, 6));
      } else {
        // Fallback para dados mock se API não retornar dados
        setFeaturedAnimals(mockAnimals.slice(0, 6));
      }
    } catch (error) {
      console.warn("Usando dados mock para animais em destaque:", error);
      setFeaturedAnimals(mockAnimals.slice(0, 6));
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const animals = await animaisService.getAll();
      const adoptedCount =
        animals?.filter((animal: Animal) => animal.status === "adotado")
          .length || 0;

      setStats({
        totalAnimals: animals?.length || mockAnimals.length,
        adoptedAnimals: adoptedCount || 2,
        shelters: 15,
        happyFamilies: adoptedCount || 150,
      });
    } catch (error) {
      console.warn("Usando estatísticas mock:", error);
      setStats({
        totalAnimals: mockAnimals.length,
        adoptedAnimals: 2,
        shelters: 15,
        happyFamilies: 150,
      });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(
        `Obrigado por se inscrever! Você receberá novidades no email: ${email}`
      );
      setEmail("");
    }
  };

  return (
    <>
      <Header />
      <Main>
        <div className="min-h-screen bg-gray-50">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-green-600 text-white py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left">
                  <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                    Encontre Seu Melhor Amigo
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 opacity-95 leading-relaxed">
                    Conectamos animais incríveis com famílias amorosas. Adote um
                    pet e transforme duas vidas para sempre.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Link href="/animais">
                      <Button
                        size="lg"
                        className="w-full sm:w-auto bg-white text-purple-600 hover:bg-blue-50 hover:scale-105 transition-all duration-300 font-semibold px-8 py-4 text-lg shadow-xl"
                      >
                        <FiHeart className="mr-3 h-6 w-6" />
                        Ver Animais
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-purple-600 hover:scale-105 transition-all duration-300 font-semibold px-8 py-4 text-lg backdrop-blur-sm"
                    >
                      <FiMapPin className="mr-3 h-6 w-6" />
                      Encontrar Abrigos
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
                    <h3 className="text-2xl font-bold mb-6 text-center">
                      Estatísticas em Tempo Real
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-300 mb-2">
                          {stats.totalAnimals}+
                        </div>
                        <div className="text-white/90">Animais Disponíveis</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-300 mb-2">
                          {stats.adoptedAnimals}+
                        </div>
                        <div className="text-white/90">Já Adotados</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-300 mb-2">
                          {stats.shelters}+
                        </div>
                        <div className="text-white/90">Abrigos Parceiros</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-pink-300 mb-2">
                          {stats.happyFamilies}+
                        </div>
                        <div className="text-white/90">Famílias Felizes</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Animals Section */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Animais em Destaque
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Conheça alguns dos pets especiais que estão esperando por uma
                  família amorosa
                </p>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, index) => (
                    <div
                      key={index}
                      className="bg-gray-200 rounded-xl h-96 animate-pulse"
                    ></div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredAnimals.map((animal) => (
                    <Card
                      key={animal.id}
                      className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-0 shadow-lg bg-white"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={
                            animal.imagemUrl ||
                            "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop&crop=center"
                          }
                          alt={animal.nome}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute top-4 right-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              animal.status === "disponivel"
                                ? "bg-green-500 text-white"
                                : "bg-yellow-500 text-white"
                            }`}
                          >
                            {animal.status === "disponivel"
                              ? "Disponível"
                              : "Em Processo"}
                          </span>
                        </div>
                      </div>
                      <CardHeader className="pb-4">
                        <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                          {animal.nome}
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                          {animal.raca} • {animal.idade} anos • {animal.porte}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-gray-700 mb-4 line-clamp-3">
                          {animal.descricao}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-gray-500">
                            <FiMapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">
                              {animal.localizacao || "São Paulo"}
                            </span>
                          </div>
                          <Link href={`/animais/${animal.id}`}>
                            <Button
                              size="sm"
                              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                            >
                              Ver Mais
                              <FiArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              <div className="text-center mt-12">
                <Link href="/animais">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white hover:scale-105 transition-all duration-300 font-semibold px-8 py-4"
                  >
                    Ver Todos os Animais
                    <FiArrowRight className="ml-3 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Histórias de Sucesso
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Veja como nossas adoções transformaram vidas
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg group bg-white">
                  <CardHeader className="pb-4">
                    <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <FiStar className="h-10 w-10 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      Maria Silva
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Adotou o Bobby
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 italic leading-relaxed">
                      &ldquo;O Bobby trouxe alegria e amor para nossa família. O
                      processo foi simples e o suporte da AdotePet foi
                      excepcional. Recomendo para todos!&rdquo;
                    </p>
                    <div className="flex justify-center mt-4">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg group bg-white">
                  <CardHeader className="pb-4">
                    <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <FiHeart className="h-10 w-10 text-green-600" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      João Santos
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Adotou a Luna
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 italic leading-relaxed">
                      &ldquo;A Luna é perfeita! Carinhosa, brincalhona e se
                      adaptou rapidamente. A plataforma facilitou muito
                      encontrar nosso pet ideal.&rdquo;
                    </p>
                    <div className="flex justify-center mt-4">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg group bg-white">
                  <CardHeader className="pb-4">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <FiUsers className="h-10 w-10 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      Família Costa
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Adotou o Max
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 italic leading-relaxed">
                      &ldquo;O Max é o melhor amigo das nossas crianças. A
                      experiência de adoção foi incrível e mudou nossas vidas
                      para melhor!&rdquo;
                    </p>
                    <div className="flex justify-center mt-4">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Por Que Escolher a AdotePet?
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Oferecemos a melhor experiência em adoção de animais
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center group hover:scale-105 transition-all duration-300">
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl">
                    <FiShield className="h-10 w-10 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-4">
                    Processo Seguro
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Todos os animais são verificados e vacinados antes da adoção
                  </p>
                </div>

                <div className="text-center group hover:scale-105 transition-all duration-300">
                  <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl">
                    <FiClock className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-4">
                    Suporte 24/7
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Estamos sempre disponíveis para ajudar você e seu pet
                  </p>
                </div>

                <div className="text-center group hover:scale-105 transition-all duration-300">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl">
                    <FiTrendingUp className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-4">
                    Taxa de Sucesso
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    95% de satisfação nas adoções realizadas pela plataforma
                  </p>
                </div>

                <div className="text-center group hover:scale-105 transition-all duration-300">
                  <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl">
                    <FiAward className="h-10 w-10 text-yellow-600" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-4">
                    Premiado
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Reconhecida como a melhor plataforma de adoção de 2024
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Como Funciona
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Quatro passos simples para encontrar seu novo melhor amigo
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center group hover:scale-105 transition-all duration-300">
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl">
                    <span className="text-2xl font-bold text-purple-600">
                      1
                    </span>
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-4">
                    Explore
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Navegue por nossa galeria de animais disponíveis
                  </p>
                </div>

                <div className="text-center group hover:scale-105 transition-all duration-300">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl">
                    <span className="text-2xl font-bold text-blue-600">2</span>
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-4">
                    Conecte
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Entre em contato com o abrigo responsável
                  </p>
                </div>

                <div className="text-center group hover:scale-105 transition-all duration-300">
                  <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl">
                    <span className="text-2xl font-bold text-green-600">3</span>
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-4">
                    Visite
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Conheça pessoalmente seu futuro companheiro
                  </p>
                </div>

                <div className="text-center group hover:scale-105 transition-all duration-300">
                  <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl">
                    <span className="text-2xl font-bold text-yellow-600">
                      4
                    </span>
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-4">
                    Adote
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Finalize a adoção e leve seu pet para casa
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Newsletter Section */}
          <section className="py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-green-600 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="max-w-3xl mx-auto">
                <FiGift className="h-16 w-16 mx-auto mb-8 text-yellow-300" />
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Fique Por Dentro
                </h2>
                <p className="text-xl md:text-2xl mb-12 opacity-95 leading-relaxed">
                  Receba novidades sobre novos animais disponíveis e histórias
                  de sucesso
                </p>

                <form
                  onSubmit={handleNewsletterSubmit}
                  className="max-w-md mx-auto"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                      type="email"
                      placeholder="Seu melhor email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-white/10 border-white/20 text-white placeholder-white/70 backdrop-blur-sm"
                      required
                    />
                    <Button
                      type="submit"
                      className="bg-white text-purple-600 hover:bg-blue-50 font-semibold px-8 py-3 shadow-xl hover:scale-105 transition-all duration-300"
                    >
                      <FiMail className="mr-2 h-5 w-5" />
                      Inscrever
                    </Button>
                  </div>
                </form>

                <p className="text-white/80 text-sm mt-4">
                  Prometemos não enviar spam. Você pode cancelar a qualquer
                  momento.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Entre em Contato
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Tem dúvidas? Estamos aqui para ajudar você!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg group bg-white">
                  <CardHeader className="pb-4">
                    <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <FiPhone className="h-8 w-8 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      Telefone
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Ligue para nosso atendimento
                    </p>
                    <a
                      href="tel:+5511999999999"
                      className="text-purple-600 font-semibold text-lg hover:underline"
                    >
                      (11) 99999-9999
                    </a>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg group bg-white">
                  <CardHeader className="pb-4">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <FiMail className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Envie sua mensagem</p>
                    <a
                      href="mailto:contato@adotepet.com"
                      className="text-blue-600 font-semibold text-lg hover:underline"
                    >
                      contato@adotepet.com
                    </a>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg group bg-white">
                  <CardHeader className="pb-4">
                    <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <FiMapPin className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      Localização
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Venha nos visitar</p>
                    <p className="text-green-600 font-semibold text-lg">
                      São Paulo, SP
                      <br />
                      Brasil
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </Main>
      <Footer />
    </>
  );
}
