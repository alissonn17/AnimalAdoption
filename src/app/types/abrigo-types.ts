import z from "zod";

export interface mainprops{
  children: React.ReactNode;
}

export interface resgetprop{
  id: number;
  nome: string;
  endereco: string;
  capacidade: number;
  createdAt: string | number;
  updatedAt: string | number;
}

export interface postabrigoprop{
  nome: string,
  endereco: string,
  capacidade: number
}

export const schemadel = z.object({
  id: z.string()
  .min(1,"Digite o número do ID todo!")
});

export const schemaid = z.object({
  id: z.string()
  .min(1,"Digite o número do ID todo!")
});

export const schemapost = z.object({
  nome: z.string()
  .min(1,"Digite o nome do abrigo!"),
  endereco: z.string()
  .min(1,"Digite o endereço completo!"),
  capacidade: z.string()
  .min(1,"Digite a capacidade!")
});

export const schemaput = z.object({
  id: z.string()
  .min(1,"Digite o número do ID todo!"),
  nome: z.string()
  .min(1,"Digite o nome do abrigo!"),
  endereco: z.string()
  .min(1,"Digite o endereço completo!"),
  capacidade: z.string()
  .min(1,"Digite a capacidade!")
});