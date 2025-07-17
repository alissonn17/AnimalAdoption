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
import { FiHeart, FiUsers, FiShield, FiMail } from "react-icons/fi";
import Link from "next/link";

export default function SobrePage() {
  return (
    <>
      <Header />
      <Main>
        <div className="min-h-screen bg-gray-50">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-green-500 via-blue-600 to-purple-700 text-white py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-8 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Sobre a Animal Adoption
                </h1>
                <p className="text-xl md:text-2xl opacity-95 max-w-4xl mx-auto leading-relaxed">
                  Somos uma plataforma dedicada a conectar animais abandonados
                  com famílias amorosas, transformando vidas e criando laços
                  especiais que duram para sempre.
                </p>
              </div>
            </div>
          </section>

          {/* Nossa Missão */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Nossa Missão
                </h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  Trabalhamos incansavelmente para reduzir o número de animais
                  abandonados, facilitando o processo de adoção responsável e
                  criando uma comunidade comprometida com o bem-estar animal.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg group bg-white h-full flex flex-col">
                  <CardHeader className="pb-4 flex-shrink-0">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <FiHeart className="h-10 w-10 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      Amor e Cuidado
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex items-center">
                    <CardDescription className="text-gray-600 leading-relaxed text-center">
                      Cada animal é tratado com amor e recebe todos os cuidados
                      necessários antes de encontrar sua nova família.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg group bg-white h-full flex flex-col">
                  <CardHeader className="pb-4 flex-shrink-0">
                    <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <FiShield className="h-10 w-10 text-green-600" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      Adoção Responsável
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex items-center">
                    <CardDescription className="text-gray-600 leading-relaxed text-center">
                      Promovemos a adoção responsável com acompanhamento e
                      suporte para garantir o bem-estar de todos.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg group bg-white h-full flex flex-col">
                  <CardHeader className="pb-4 flex-shrink-0">
                    <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <FiUsers className="h-10 w-10 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      Comunidade Unida
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex items-center">
                    <CardDescription className="text-gray-600 leading-relaxed text-center">
                      Construímos uma comunidade de pessoas apaixonadas por
                      animais, unidas pelo objetivo comum de ajudar.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Nossa História */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div className="space-y-8">
                  <h2 className="text-4xl font-bold text-gray-900 mb-8">
                    Nossa História
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg shadow-sm">
                      <p className="text-gray-700 text-lg leading-relaxed">
                        A Animal Adoption nasceu em 2024 do sonho de um grupo de
                        desenvolvedores e ativistas da causa animal que
                        perceberam a necessidade de uma plataforma digital
                        moderna e eficiente para facilitar o processo de adoção.
                      </p>
                    </div>
                    <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg shadow-sm">
                      <p className="text-gray-700 text-lg leading-relaxed">
                        Começamos como um projeto acadêmico no curso de Análise
                        e Desenvolvimento de Sistemas, mas rapidamente
                        percebemos o impacto positivo que poderíamos ter na vida
                        dos animais e das famílias.
                      </p>
                    </div>
                    <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg shadow-sm">
                      <p className="text-gray-700 text-lg leading-relaxed">
                        Hoje, já conectamos centenas de animais às suas famílias
                        para sempre, e continuamos crescendo com o apoio de
                        abrigos, ONGs e da comunidade.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-10 shadow-xl border border-gray-200">
                  <h3 className="text-3xl font-bold text-gray-900 mb-10 text-center">
                    Nossos Números
                  </h3>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="text-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <div className="text-4xl font-bold text-blue-600 mb-3">
                        500+
                      </div>
                      <div className="text-gray-700 font-semibold">
                        Animais Adotados
                      </div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <div className="text-4xl font-bold text-green-600 mb-3">
                        200+
                      </div>
                      <div className="text-gray-700 font-semibold">
                        Famílias Felizes
                      </div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <div className="text-4xl font-bold text-purple-600 mb-3">
                        50+
                      </div>
                      <div className="text-gray-700 font-semibold">
                        Abrigos Parceiros
                      </div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <div className="text-4xl font-bold text-orange-600 mb-3">
                        100+
                      </div>
                      <div className="text-gray-700 font-semibold">
                        Eventos Realizados
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Como Funciona */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Como Funciona
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  O processo de adoção é simples, seguro e transparente
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center group hover:scale-105 transition-all duration-300">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl">
                    <span className="text-2xl font-bold text-blue-600">1</span>
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-4">
                    Navegue
                  </h3>
                  <p className="text-gray-600 leading-relaxed min-h-[60px] flex items-center justify-center">
                    Explore nossa galeria de animais disponíveis para adoção
                  </p>
                </div>

                <div className="text-center group hover:scale-105 transition-all duration-300">
                  <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl">
                    <span className="text-2xl font-bold text-green-600">2</span>
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-4">
                    Escolha
                  </h3>
                  <p className="text-gray-600 leading-relaxed min-h-[60px] flex items-center justify-center">
                    Encontre o animal que mais combina com você e sua família
                  </p>
                </div>

                <div className="text-center group hover:scale-105 transition-all duration-300">
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl">
                    <span className="text-2xl font-bold text-purple-600">
                      3
                    </span>
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-4">
                    Cadastre-se
                  </h3>
                  <p className="text-gray-600 leading-relaxed min-h-[60px] flex items-center justify-center">
                    Preencha o formulário de adoção com suas informações
                  </p>
                </div>

                <div className="text-center group hover:scale-105 transition-all duration-300">
                  <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl">
                    <span className="text-2xl font-bold text-orange-600">
                      4
                    </span>
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-4">
                    Adote
                  </h3>
                  <p className="text-gray-600 leading-relaxed min-h-[60px] flex items-center justify-center">
                    Após a aprovação, leve seu novo amigo para casa
                  </p>
                </div>
              </div>

              {/* Linha conectora para desktop */}
              <div className="hidden lg:block relative mt-16">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-blue-200 to-orange-200 rounded-full opacity-30"></div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-green-600 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Faça Parte Dessa História
              </h2>
              <p className="text-xl md:text-2xl mb-12 opacity-95 max-w-3xl mx-auto leading-relaxed">
                Seja você um adotante, voluntário ou parceiro, há sempre uma
                forma de ajudar
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/animais">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 hover:scale-105 transition-all duration-300 font-semibold px-8 py-4 text-lg shadow-xl"
                  >
                    <FiHeart className="mr-3 h-6 w-6" />
                    Ver Animais
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-blue-600 hover:scale-105 transition-all duration-300 font-semibold px-8 py-4 text-lg backdrop-blur-sm"
                >
                  <FiMail className="mr-3 h-6 w-6" />
                  Entre em Contato
                </Button>
              </div>
            </div>
          </section>
        </div>
      </Main>
      <Footer />
    </>
  );
}
