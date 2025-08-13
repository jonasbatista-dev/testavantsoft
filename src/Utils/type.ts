type typesSale = {
  data: string;
  valor: number;
};

export type typesClients = {
  id: string;
  info: {
    nomeCompleto: string;
    detalhes: {
      email: string;
      nascimento: string;
    };
  };
  estatisticas: {
    vendas: typesSale[];
  };
  duplicado?: {
    nomeCompleto: string;
  };
};
