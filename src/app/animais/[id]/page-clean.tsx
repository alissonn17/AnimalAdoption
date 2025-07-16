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

  const animalId = params.id as string;

  const loadAnimal = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await animaisService.getById(Number(animalId));
      setAnimal(data);
    } catch (err) {
      // Se a API falhar, tentar encontrar nos dados mock
      const mockAnimal = mockAnimals.find(
        (animal) => animal.id === Number(animalId)
      );
      if (mockAnimal) {
        setAnimal(mockAnimal);
      } else {
        setError("Animal não encontrado. Tente novamente mais tarde.");
        console.error(err);
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
                    <CardTitle className="text-3xl font-bold text-gray-900">
                      {animal.nome}
                    </CardTitle>
                    <CardDescription className="text-lg">
                      {capitalize(animal.especie)} • {capitalize(animal.raca)}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Informações Básicas */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <FiCalendar className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Idade</p>
                          <p className="font-semibold">{animal.idade} anos</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span className="h-5 w-5 flex items-center justify-center text-gray-500">
                          {animal.sexo === "macho" ? "♂️" : "♀️"}
                        </span>
                        <div>
                          <p className="text-sm text-gray-500">Sexo</p>
                          <p className="font-semibold">
                            {capitalize(animal.sexo)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span className="h-5 w-5 flex items-center justify-center text-gray-500">
                          📏
                        </span>
                        <div>
                          <p className="text-sm text-gray-500">Porte</p>
                          <p className="font-semibold">
                            {capitalize(animal.porte)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <FiInfo className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Status</p>
                          <p className="font-semibold">
                            {capitalize(animal.status)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Descrição */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Sobre {animal.nome}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {animal.descricao}
                      </p>
                    </div>

                    {/* Botão de Contato */}
                    <div className="pt-4">
                      <Button
                        size="lg"
                        className="w-full"
                        disabled={animal.status !== "disponivel"}
                      >
                        <FiHeart className="mr-2 h-5 w-5" />
                        {animal.status === "disponivel"
                          ? "Entrar em Contato para Adoção"
                          : "Animal não disponível"}
                      </Button>
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        Entre em contato através do telefone ou visite nosso
                        abrigo
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Animais Relacionados */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Outros {animal.especie}s disponíveis
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockAnimals
                  .filter(
                    (a) =>
                      a.especie === animal.especie &&
                      a.id !== animal.id &&
                      a.status === "disponivel"
                  )
                  .slice(0, 3)
                  .map((relatedAnimal) => (
                    <Card
                      key={relatedAnimal.id}
                      className="hover:shadow-lg transition-shadow overflow-hidden"
                    >
                      <div className="aspect-square relative">
                        <Image
                          src={relatedAnimal.imagemUrl}
                          alt={relatedAnimal.nome}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {relatedAnimal.nome}
                        </CardTitle>
                        <CardDescription>
                          {capitalize(relatedAnimal.raca)} •{" "}
                          {relatedAnimal.idade} anos
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Link href={`/animais/${relatedAnimal.id}`}>
                          <Button variant="outline" className="w-full">
                            Ver Detalhes
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Main>
      <Footer />
    </>
  );
}
