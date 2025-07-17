// Tipos para autenticação
import { Animal } from './animal-types';

export interface User {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  endereco?: string;
  tipo: 'adotante' | 'abrigo' | 'voluntario' | 'admin';
  criadoEm: string;
  atualizadoEm: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  nome: string;
  email: string;
  password: string;
  telefone?: string;
  endereco?: string;
  tipo?: 'adotante' | 'abrigo' | 'voluntario';
}

export interface AuthResponse {
  token: string;
  user: User;
  expiresIn: number;
}

// Tipos para Abrigos
export interface Abrigo {
  id: string;
  nome: string;
  endereco: string;
  telefone: string;
  email: string;
  responsavel: string;
  capacidade: number;
  animaisAtivos: number;
  criadoEm: string;
  atualizadoEm: string;
}

export interface CreateAbrigoData {
  nome: string;
  endereco: string;
  telefone: string;
  email: string;
  responsavel: string;
  capacidade: number;
}

// Tipos para Adoções
export interface Adocao {
  id: string;
  animalId: string;
  adotanteId: string;
  abrigoId: string;
  status: 'pendente' | 'aprovada' | 'rejeitada' | 'concluida';
  dataAdocao?: string;
  observacoes?: string;
  criadoEm: string;
  atualizadoEm: string;
  // Relacionamentos
  animal?: Animal;
  adotante?: User;
  abrigo?: Abrigo;
}

export interface CreateAdocaoData {
  animalId: string;
  adotanteId: string;
  observacoes?: string;
}

// Tipos para Eventos
export interface Evento {
  id: string;
  titulo: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  local: string;
  endereco: string;
  abrigoId: string;
  capacidade: number;
  participantes: number;
  ativo: boolean;
  criadoEm: string;
  atualizadoEm: string;
  // Relacionamentos
  abrigo?: Abrigo;
}

export interface CreateEventoData {
  titulo: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  local: string;
  endereco: string;
  abrigoId: string;
  capacidade: number;
}

// Tipos para Voluntários
export interface Voluntario {
  id: string;
  userId: string;
  abrigoId: string;
  especialidade: string[];
  disponibilidade: string;
  experiencia: string;
  ativo: boolean;
  criadoEm: string;
  atualizadoEm: string;
  // Relacionamentos
  user?: User;
  abrigo?: Abrigo;
}

export interface CreateVoluntarioData {
  userId: string;
  abrigoId: string;
  especialidade: string[];
  disponibilidade: string;
  experiencia: string;
}

// Tipos para busca e filtros
export interface SearchParams {
  q?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface AbrigoSearchParams extends SearchParams {
  cidade?: string;
  estado?: string;
  capacidadeMin?: number;
  capacidadeMax?: number;
}

export interface AdocaoSearchParams extends SearchParams {
  status?: string;
  abrigoId?: string;
  adotanteId?: string;
  dataInicio?: string;
  dataFim?: string;
}

export interface EventoSearchParams extends SearchParams {
  abrigoId?: string;
  dataInicio?: string;
  dataFim?: string;
  cidade?: string;
  ativo?: boolean;
}

export interface VoluntarioSearchParams extends SearchParams {
  abrigoId?: string;
  especialidade?: string;
  ativo?: boolean;
}
