import { z } from "zod";

/**
 * Validation schemas using Zod for form validation
 * Used with React Hook Form for type-safe form handling
 */

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras"),
  
  email: z
    .string()
    .email("Email inválido")
    .min(1, "Email é obrigatório"),
  
  phone: z
    .string()
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Telefone deve estar no formato (11) 99999-9999")
    .optional()
    .or(z.literal("")),
  
  subject: z
    .string()
    .min(5, "Assunto deve ter pelo menos 5 caracteres")
    .max(100, "Assunto deve ter no máximo 100 caracteres"),
  
  message: z
    .string()
    .min(10, "Mensagem deve ter pelo menos 10 caracteres")
    .max(1000, "Mensagem deve ter no máximo 1000 caracteres"),
  
  acceptTerms: z
    .boolean()
    .refine(val => val === true, "Você deve aceitar os termos de uso")
});

// Newsletter subscription schema
export const newsletterSchema = z.object({
  email: z
    .string()
    .email("Email inválido")
    .min(1, "Email é obrigatório"),
  
  interests: z
    .array(z.string())
    .min(1, "Selecione pelo menos um interesse")
    .optional(),
});

// Animal registration schema
export const animalFormSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(30, "Nome deve ter no máximo 30 caracteres"),
  
  species: z
    .enum(["cachorro", "gato", "coelho", "hamster", "outro"], {
      message: "Selecione uma espécie válida"
    }),
  
  breed: z
    .string()
    .min(2, "Raça deve ter pelo menos 2 caracteres")
    .max(50, "Raça deve ter no máximo 50 caracteres"),
  
  age: z
    .number()
    .min(0, "Idade não pode ser negativa")
    .max(30, "Idade deve ser realista")
    .int("Idade deve ser um número inteiro"),
  
  size: z
    .enum(["pequeno", "médio", "grande"], {
      message: "Selecione um tamanho válido"
    }),
  
  gender: z
    .enum(["macho", "fêmea"], {
      message: "Selecione um sexo válido"
    }),
  
  description: z
    .string()
    .min(20, "Descrição deve ter pelo menos 20 caracteres")
    .max(500, "Descrição deve ter no máximo 500 caracteres"),
  
  temperament: z
    .array(z.string())
    .min(1, "Selecione pelo menos uma característica de temperamento"),
  
  healthStatus: z
    .string()
    .min(10, "Status de saúde deve ter pelo menos 10 caracteres")
    .max(200, "Status de saúde deve ter no máximo 200 caracteres"),
  
  isVaccinated: z.boolean(),
  isNeutered: z.boolean(),
  isSpecialNeeds: z.boolean(),
  
  requirements: z
    .string()
    .max(300, "Requisitos devem ter no máximo 300 caracteres")
    .optional(),
});

// Shelter registration schema
export const shelterFormSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  
  email: z
    .string()
    .email("Email inválido"),
  
  phone: z
    .string()
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Telefone deve estar no formato (11) 99999-9999"),
  
  address: z.object({
    street: z
      .string()
      .min(5, "Endereço deve ter pelo menos 5 caracteres")
      .max(100, "Endereço deve ter no máximo 100 caracteres"),
    
    number: z
      .string()
      .min(1, "Número é obrigatório"),
    
    neighborhood: z
      .string()
      .min(2, "Bairro deve ter pelo menos 2 caracteres")
      .max(50, "Bairro deve ter no máximo 50 caracteres"),
    
    city: z
      .string()
      .min(2, "Cidade deve ter pelo menos 2 caracteres")
      .max(50, "Cidade deve ter no máximo 50 caracteres"),
    
    state: z
      .string()
      .length(2, "Estado deve ter 2 caracteres (UF)"),
    
    zipCode: z
      .string()
      .regex(/^\d{5}-?\d{3}$/, "CEP deve estar no formato 00000-000"),
  }),
  
  description: z
    .string()
    .min(50, "Descrição deve ter pelo menos 50 caracteres")
    .max(1000, "Descrição deve ter no máximo 1000 caracteres"),
  
  capacity: z
    .number()
    .min(1, "Capacidade deve ser pelo menos 1")
    .max(1000, "Capacidade deve ser realista")
    .int("Capacidade deve ser um número inteiro"),
  
  website: z
    .string()
    .url("Website deve ser uma URL válida")
    .optional()
    .or(z.literal("")),
  
  socialMedia: z.object({
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    twitter: z.string().optional(),
  }).optional(),
  
  operatingHours: z
    .string()
    .min(10, "Horário de funcionamento deve ter pelo menos 10 caracteres")
    .max(200, "Horário de funcionamento deve ter no máximo 200 caracteres"),
});

// Type inference for TypeScript
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type NewsletterData = z.infer<typeof newsletterSchema>;
export type AnimalFormData = z.infer<typeof animalFormSchema>;
export type ShelterFormData = z.infer<typeof shelterFormSchema>;

// Validation helper functions
export const validateContactForm = (data: unknown): ContactFormData => {
  return contactFormSchema.parse(data);
};

export const validateNewsletterForm = (data: unknown): NewsletterData => {
  return newsletterSchema.parse(data);
};

export const validateAnimalForm = (data: unknown): AnimalFormData => {
  return animalFormSchema.parse(data);
};

export const validateShelterForm = (data: unknown): ShelterFormData => {
  return shelterFormSchema.parse(data);
};
