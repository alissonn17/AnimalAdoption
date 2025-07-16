interface mainprops{
    children: React.ReactNode;
}

interface resgetprop{
  id: number;
  nome: string;
  endereco: string;
  capacidade: number;
  createdAt: string | number;
  updatedAt: string | number;
};

interface postabrigoprop{
  nome: string,
  endereco: string,
  capacidade: number
}