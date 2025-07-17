"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Main from "../../components/Main";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Loading } from "../../components/ui/loading";
import { animaisService } from "../../services/animal-api";
import { mockAnimals } from "../../services/mockData";
import { Animal } from "../../types/animal-types";
import { FiHeart, FiCalendar, FiInfo, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { capitalize } from "../../lib/utils";

export default function AnimalDetailPage() {
  const params = useParams();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdopting, setIsAdopting] = useState(false);
  const [adoptionSuccess, setAdoptionSuccess] = useState(false);

  const animalId = params.id as string;

  const loadAnimal = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(""); // Clear previous errors
      const data = await animaisService.getById(Number(animalId));
      setAnimal(data);
    } catch (err: unknown) {
      console.error("Error loading animal:", err);

      // Check if err is an object with expected props
      if (typeof err === "object" && err !== null) {
        const error = err as {
          response?: { status?: number };
          code?: string;
          message?: string;
        };

        const mockAnimal = mockAnimals.find(
          (animal) => animal.id === Number(animalId)
        );

        if (mockAnimal) {
          setAnimal(mockAnimal);
          console.log("Using mock data for animal:", animalId);
        } else {
          if (error.response?.status === 404) {
            setError("Animal não encontrado. Verifique se o ID está correto.");
          } else if (error.response?.status && error.response.status >= 500) {
            setError("Servidor temporariamente indisponível. Tente novamente em alguns minutos.");
          } else if (
            error.code === "NETWORK_ERROR" ||
            error.message?.includes("Network Error")
          ) {
            setError("Problema de conexão. Verifique sua internet e tente novamente.");
          } else {
            setError("Erro ao carregar detalhes do animal. Tente novamente mais tarde.");
          }
        }
      } else {
        // fallback genérico se err não tem forma conhecida
        setError("Erro inesperado ao carregar o animal.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [animalId]);

  useEffect(() => {
    if (animalId) {
      loadAnimal();
    }
  }, [animalId, loadAnimal]);

  const handleAdopt = async () => {
    if (!animal) return;

    try {
      setIsAdopting(true);

      // Simular solicitação de adoção - por enquanto apenas mostra sucesso
      // Em um app real, aqui faria uma chamada à API para criar a adoção
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula delay da API

      setAdoptionSuccess(true);
    } catch (err) {
      console.error("Erro ao solicitar adoção:", err);
      setError("Erro ao solicitar adoção. Tente novamente mais tarde.");
    } finally {
      setIsAdopting(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <Main>
          <div className="min-h-screen flex items-center justify-center">
            <Loading>Carregando detalhes do animal...</Loading>
          </div>
        </Main>
        <Footer />
      </>
    );
  }

  if (error && !animal) {
    return (
      <>
        <Header />
        <Main>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <Link href="/animais">
                <Button>Voltar para Animais</Button>
              </Link>
            </div>
          </div>
        </Main>
        <Footer />
      </>
    );
  }

  if (!animal) {
    return (
      <>
        <Header />
        <Main>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-600 mb-4">Animal não encontrado.</p>
              <Link href="/animais">
                <Button>Voltar para Animais</Button>
              </Link>
            </div>
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
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <div className="mb-6">
              <Link
                href="/animais"
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
              >
                <FiArrowLeft className="mr-2 h-4 w-4" />
                Voltar para Animais
              </Link>
            </div>

            {/* Success Message */}
            {adoptionSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6">
                <h3 className="font-semibold">
                  Solicitação enviada com sucesso!
                </h3>
                <p>
                  Entraremos em contato em breve para prosseguir com o processo
                  de adoção.
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Imagem do Animal */}
              <div className="space-y-4">
                <Card className="overflow-hidden">
                  <div className="aspect-square relative">
                    {animal.imagemUrl ? (
                      <Image
                        src={animal.imagemUrl}
                        alt={animal.nome}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <FiHeart className="text-6xl text-gray-400" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          animal.status === "disponivel"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {capitalize(animal.status)}
                      </span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Informações do Animal */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-3xl">{animal.nome}</CardTitle>
                    <CardDescription className="text-lg">
                      {capitalize(animal.especie)} • {capitalize(animal.raca)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <FiCalendar className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="text-sm text-gray-600">Idade</p>
                          <p className="font-medium">{animal.idade} anos</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 text-lg">📏</span>
                        <div>
                          <p className="text-sm text-gray-600">Porte</p>
                          <p className="font-medium">
                            {capitalize(animal.porte)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 text-lg">
                          {animal.sexo === "macho" ? "♂️" : "♀️"}
                        </span>
                        <div>
                          <p className="text-sm text-gray-600">Sexo</p>
                          <p className="font-medium">
                            {capitalize(animal.sexo)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <FiInfo className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="text-sm text-gray-600">Status</p>
                          <p className="font-medium">
                            {capitalize(animal.status)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">
                        Sobre {animal.nome}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {animal.descricao}
                      </p>
                    </div>

                    {animal.status === "disponivel" && (
                      <div className="space-y-3">
                        {adoptionSuccess ? (
                          <Button disabled className="w-full">
                            <FiHeart className="mr-2 h-5 w-5" />
                            Solicitação Enviada
                          </Button>
                        ) : (
                          <Button
                            onClick={handleAdopt}
                            disabled={isAdopting}
                            className="w-full"
                            size="lg"
                          >
                            {isAdopting ? (
                              <div className="flex items-center space-x-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                                <span>Solicitando...</span>
                              </div>
                            ) : (
                              <>
                                <FiHeart className="mr-2 h-5 w-5" />
                                Quero Adotar {animal.nome}
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Informações Adicionais */}
                <Card>
                  <CardHeader>
                    <CardTitle>Informações Importantes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm text-gray-600">
                      <p>
                        • Todos os nossos animais são vacinados e vermifugados
                      </p>
                      <p>
                        • Processo de adoção inclui entrevista e visita
                        domiciliar
                      </p>
                      <p>• Oferecemos suporte pós-adoção para adaptação</p>
                      <p>• Termo de responsabilidade obrigatório</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Main>
      <Footer />
    </>
  );
}
