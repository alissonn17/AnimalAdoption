"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";
import { FiCalendar, FiMapPin, FiClock, FiUsers } from "react-icons/fi";

/**
 * Eventos page - Lista de eventos de adoção
 */
export default function EventosPage() {
  return (
    <>
      <Header />
      <Main>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header da página */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Eventos de Adoção
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Participe dos nossos eventos especiais de adoção e encontre seu
                novo melhor amigo!
              </p>
            </div>

            {/* Lista de eventos */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Evento 1 */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 ">
                    Feira de Adoção - Shopping Center
                  </h3>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                    Confirmado
                  </span>
                </div>

                <div className="space-y-3 text-gray-600 ">
                  <div className="flex items-center">
                    <FiCalendar className="h-4 w-4 mr-2" />
                    <span>15 de Janeiro, 2024</span>
                  </div>
                  <div className="flex items-center">
                    <FiClock className="h-4 w-4 mr-2" />
                    <span>09:00 - 17:00</span>
                  </div>
                  <div className="flex items-center">
                    <FiMapPin className="h-4 w-4 mr-2" />
                    <span>Shopping Vila Lobos, São Paulo</span>
                  </div>
                  <div className="flex items-center">
                    <FiUsers className="h-4 w-4 mr-2" />
                    <span>Mais de 30 animais disponíveis</span>
                  </div>
                </div>
              </div>

              {/* Evento 2 */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 ">
                    Adoção no Parque
                  </h3>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                    Planejado
                  </span>
                </div>

                <div className="space-y-3 text-gray-600 ">
                  <div className="flex items-center">
                    <FiCalendar className="h-4 w-4 mr-2" />
                    <span>22 de Janeiro, 2024</span>
                  </div>
                  <div className="flex items-center">
                    <FiClock className="h-4 w-4 mr-2" />
                    <span>08:00 - 16:00</span>
                  </div>
                  <div className="flex items-center">
                    <FiMapPin className="h-4 w-4 mr-2" />
                    <span>Parque Ibirapuera, São Paulo</span>
                  </div>
                  <div className="flex items-center">
                    <FiUsers className="h-4 w-4 mr-2" />
                    <span>25+ animais esperando por você</span>
                  </div>
                </div>
              </div>

              {/* Evento 3 */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 ">
                    Campanha de Conscientização
                  </h3>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-medium">
                    Em breve
                  </span>
                </div>

                <div className="space-y-3 text-gray-600 ">
                  <div className="flex items-center">
                    <FiCalendar className="h-4 w-4 mr-2" />
                    <span>05 de Fevereiro, 2024</span>
                  </div>
                  <div className="flex items-center">
                    <FiClock className="h-4 w-4 mr-2" />
                    <span>10:00 - 18:00</span>
                  </div>
                  <div className="flex items-center">
                    <FiMapPin className="h-4 w-4 mr-2" />
                    <span>Centro de Convenções, São Paulo</span>
                  </div>
                  <div className="flex items-center">
                    <FiUsers className="h-4 w-4 mr-2" />
                    <span>Evento educativo + adoção</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to action */}
            <div className="mt-16 text-center">
              <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Quer participar dos nossos eventos?
                </h2>
                <p className="text-gray-600 mb-6">
                  Entre em contato conosco para mais informações sobre os
                  próximos eventos de adoção em sua região.
                </p>
                <a
                  href="/contato"
                  className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
                >
                  <FiCalendar className="mr-2 h-5 w-5" />
                  Fale Conosco
                </a>
              </div>
            </div>
          </div>
        </div>
      </Main>
      <Footer />
    </>
  );
}
