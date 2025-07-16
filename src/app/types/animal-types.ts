import { z } from 'zod';

/**
 * Core animal interface for the adoption platform
 * Represents a pet available for adoption with all necessary information
 */
export interface Animal {
  id: number;
  nome: string;
  especie: 'cachorro' | 'gato'; // Standardized species types
  raca: string;
  idade: number;
  sexo: 'macho' | 'fêmea'; // Standardized gender types
  porte: 'pequeno' | 'médio' | 'grande'; // Standardized size types
  descricao: string;
  status: 'disponivel' | 'adotado' | 'reservado'; // Standardized status types
  imagemUrl: string;
  abrigoId: number;
  localizacao?: string; // Optional location field
  createdAt: string;
  updatedAt: string;
}

/**
 * Zod validation schema for Animal data
 * Ensures data integrity when creating or updating animals
 */
export const animalSchema = z.object({
  id: z.number().optional(),
  nome: z.string().min(1, "Nome é obrigatório").max(50, "Nome muito longo"),
  especie: z.enum(['cachorro', 'gato'], { message: "Espécie deve ser 'cachorro' ou 'gato'" }),
  raca: z.string().min(1, "Raça é obrigatória").max(30, "Raça muito longa"),
  idade: z.number().min(0, "Idade deve ser positiva").max(30, "Idade muito alta"),
  sexo: z.enum(['macho', 'fêmea'], { message: "Sexo deve ser 'macho' ou 'fêmea'" }),
  porte: z.enum(['pequeno', 'médio', 'grande'], { message: "Porte deve ser 'pequeno', 'médio' ou 'grande'" }),
  descricao: z.string().min(10, "Descrição muito curta").max(500, "Descrição muito longa"),
  status: z.enum(['disponivel', 'adotado', 'reservado'], { message: "Status inválido" }),
  imagemUrl: z.string().url("URL da imagem inválida"),
  abrigoId: z.number().positive("ID do abrigo deve ser positivo"),
  localizacao: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

/**
 * Type for form data validation
 * Inferred from the Zod schema to ensure consistency
 */
export type AnimalFormData = z.infer<typeof animalSchema>;

/**
 * Search and filter types for animal queries
 */
export interface AnimalSearchParams {
  especie?: string;
  porte?: string;
  idade?: string;
  sexo?: string;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

/**
 * API response types for animal endpoints
 */
export interface AnimalListResponse {
  animals: Animal[];
  total: number;
  page: number;
  totalPages: number;
}

export interface AnimalResponse {
  animal: Animal;
  success: boolean;
  message?: string;
}
