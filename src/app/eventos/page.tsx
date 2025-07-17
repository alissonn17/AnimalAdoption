"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";
import {
  FiCalendar,
  FiMapPin,
  FiClock,
  FiUsers,
  FiSearch,
  FiFilter,
  FiHeart,
  FiShare2,
  FiExternalLink,
} from "react-icons/fi";

// Mock data para eventos
const eventosData = [
  {
    id: 1,
    titulo: "Feira de Adoção - Shopping Center",
    data: "2025-07-20",
    horaInicio: "09:00",
    horaFim: "17:00",
    local: "Shopping Vila Lobos, São Paulo",
    endereco: "Av. das Nações Unidas, 4777 - Vila Gertrudes",
    animaisDisponiveis: 35,
    status: "confirmado",
    categoria: "feira",
    descricao:
      "Grande feira de adoção com mais de 30 animais de diversos abrigos da região.",
    organizador: "ONG Amigos dos Animais",
    telefone: "(11) 99999-9999",
    participantes: 120,
  },
  {
    id: 2,
    titulo: "Adoção no Parque",
    data: "2025-07-27",
    horaInicio: "08:00",
    horaFim: "16:00",
    local: "Parque Ibirapuera, São Paulo",
    endereco: "Av. Paulista, 1578 - Bela Vista",
    animaisDisponiveis: 28,
    status: "planejado",
    categoria: "parque",
    descricao:
      "Evento ao ar livre no parque com atividades educativas e adoção responsável.",
    organizador: "Prefeitura de São Paulo",
    telefone: "(11) 88888-8888",
    participantes: 85,
  },
  {
    id: 3,
    titulo: "Campanha de Conscientização",
    data: "2025-08-05",
    horaInicio: "10:00",
    horaFim: "18:00",
    local: "Centro de Convenções, São Paulo",
    endereco: "Rua Georg Braun, 199 - Vila Olimpia",
    animaisDisponiveis: 50,
    status: "em-breve",
    categoria: "campanha",
    descricao:
      "Evento educativo sobre adoção responsável com palestras e feira de adoção.",
    organizador: "Instituto Animal Adoption",
    telefone: "(11) 77777-7777",
    participantes: 200,
  },
  {
    id: 4,
    titulo: "Domingo da Adoção",
    data: "2025-08-10",
    horaInicio: "09:00",
    horaFim: "15:00",
    local: "Praça da Sé, São Paulo",
    endereco: "Praça da Sé - Centro",
    animaisDisponiveis: 20,
    status: "confirmado",
    categoria: "domingo",
    descricao: "Evento especial de domingo com foco em famílias e crianças.",
    organizador: "Voluntários Unidos",
    telefone: "(11) 66666-6666",
    participantes: 65,
  },
];

/**
 * Eventos page - Lista de eventos de adoção com funcionalidades avançadas
 */
export default function EventosPage() {
  const [eventos] = useState(eventosData);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [filterCategoria, setFilterCategoria] = useState("todas");
  const [, setEventoSelecionado] = useState<number | null>(null);

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const filteredEventos = eventos.filter((evento) => {
    const matchesSearch =
      evento.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evento.local.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evento.organizador.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "todos" || evento.status === filterStatus;
    const matchesCategoria =
      filterCategoria === "todas" || evento.categoria === filterCategoria;

    return matchesSearch && matchesStatus && matchesCategoria;
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "confirmado":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          label: "Confirmado",
        };
      case "planejado":
        return { bg: "bg-blue-100", text: "text-blue-800", label: "Planejado" };
      case "em-breve":
        return {
          bg: "bg-purple-100",
          text: "text-purple-800",
          label: "Em Breve",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          label: "Indefinido",
        };
    }
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };
  return (
    <>
      <Header />
      <Main>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Eventos de Adoção Animal Adoption
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Participe dos nossos eventos especiais de adoção e encontre seu
                novo melhor amigo! Conectamos famílias amorosas com animais que
                precisam de um lar.
              </p>
            </div>

            {/* Filtros e Busca */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                {/* Busca */}
                <div className="md:col-span-1">
                  <label
                    htmlFor="search"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Buscar eventos
                  </label>
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      id="search"
                      placeholder="Nome, local ou organizador..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Filtro por Status */}
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Status do evento
                  </label>
                  <div className="relative">
                    <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <select
                      id="status"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                    >
                      <option value="todos">Todos os status</option>
                      <option value="confirmado">Confirmado</option>
                      <option value="planejado">Planejado</option>
                      <option value="em-breve">Em Breve</option>
                    </select>
                  </div>
                </div>

                {/* Filtro por Categoria */}
                <div>
                  <label
                    htmlFor="categoria"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Tipo de evento
                  </label>
                  <select
                    id="categoria"
                    value={filterCategoria}
                    onChange={(e) => setFilterCategoria(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="todas">Todas as categorias</option>
                    <option value="feira">Feira de Adoção</option>
                    <option value="parque">Evento no Parque</option>
                    <option value="campanha">Campanha</option>
                    <option value="domingo">Domingo da Adoção</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6 animate-pulse"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* Contador de resultados */}
                <div className="mb-6">
                  <p className="text-gray-600">
                    {filteredEventos.length === 1
                      ? `1 evento encontrado`
                      : `${filteredEventos.length} eventos encontrados`}
                  </p>
                </div>

                {/* Lista de eventos */}
                {filteredEventos.length === 0 ? (
                  <div className="text-center py-12">
                    <FiCalendar className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Nenhum evento encontrado
                    </h3>
                    <p className="text-gray-600">
                      Tente ajustar os filtros ou buscar por outros termos.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredEventos.map((evento) => {
                      const statusConfig = getStatusConfig(evento.status);
                      return (
                        <div
                          key={evento.id}
                          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 border border-gray-100"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                              {evento.titulo}
                            </h3>
                            <span
                              className={`${statusConfig.bg} ${statusConfig.text} px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ml-2`}
                            >
                              {statusConfig.label}
                            </span>
                          </div>

                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {evento.descricao}
                          </p>

                          <div className="space-y-3 text-gray-600 mb-6">
                            <div className="flex items-center">
                              <FiCalendar className="h-4 w-4 mr-3 text-purple-500" />
                              <span>{formatarData(evento.data)}</span>
                            </div>
                            <div className="flex items-center">
                              <FiClock className="h-4 w-4 mr-3 text-purple-500" />
                              <span>
                                {evento.horaInicio} - {evento.horaFim}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <FiMapPin className="h-4 w-4 mr-3 text-purple-500" />
                              <span className="line-clamp-1">
                                {evento.local}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <FiUsers className="h-4 w-4 mr-3 text-purple-500" />
                              <span>
                                {evento.animaisDisponiveis} animais disponíveis
                              </span>
                            </div>
                          </div>

                          {/* Informações adicionais */}
                          <div className="border-t pt-4 mb-4">
                            <div className="text-sm text-gray-600 space-y-1">
                              <p>
                                <strong>Organizador:</strong>{" "}
                                {evento.organizador}
                              </p>
                              <p>
                                <strong>Participantes esperados:</strong>{" "}
                                {evento.participantes}
                              </p>
                            </div>
                          </div>

                          {/* Ações */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEventoSelecionado(evento.id)}
                              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                            >
                              <FiExternalLink className="mr-2 h-4 w-4" />
                              Ver Detalhes
                            </button>
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors">
                              <FiHeart className="h-4 w-4" />
                            </button>
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors">
                              <FiShare2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            {/* Call to action */}
            <div className="mt-16 text-center">
              <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Quer organizar um evento de adoção?
                </h2>
                <p className="text-gray-600 mb-6">
                  Entre em contato conosco para mais informações sobre como
                  organizar eventos de adoção em sua região e ajudar mais
                  animais a encontrarem um lar.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contato"
                    className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <FiCalendar className="mr-2 h-5 w-5" />
                    Fale Conosco
                  </a>
                  <a
                    href="/sobre"
                    className="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                  >
                    Saiba Mais
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Main>
      <Footer />
    </>
  );
}
