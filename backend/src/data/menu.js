export const products = [
  {
    id: "taco-birria",
    nome: "Taco de Birria",
    descricao: "Carne cozida lentamente, queijo gratinado e consome para mergulhar.",
    preco: 22.9,
    imagem:
      "https://images.unsplash.com/photo-1613514785940-daed07799d9b?auto=format&fit=crop&w=900&q=80",
    categoria: "Tacos",
    destaque: "Mais pedido",
    opcoes: [
      {
        nome: "Tipo de tortilla",
        tipo: "single",
        obrigatorio: true,
        escolhas: [
          { nome: "Milho artesanal", preco: 0 },
          { nome: "Trigo macia", preco: 2 },
        ],
      },
      {
        nome: "Molho extra",
        tipo: "single",
        obrigatorio: false,
        escolhas: [
          { nome: "Sem molho extra", preco: 0 },
          { nome: "Chipotle", preco: 2 },
          { nome: "Habanero", preco: 3 },
        ],
      },
    ],
  },
  {
    id: "taco-frango",
    nome: "Taco de Frango Crocante",
    descricao: "Frango empanado, alface romana, maionese de limao e picles.",
    preco: 19.9,
    imagem:
      "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=900&q=80",
    categoria: "Tacos",
    opcoes: [
      {
        nome: "Proteina",
        tipo: "single",
        obrigatorio: true,
        escolhas: [
          { nome: "Frango crocante", preco: 0 },
          { nome: "Frango grelhado", preco: 1.5 },
        ],
      },
    ],
  },
  {
    id: "combo-trio",
    nome: "Combo Trio Callejero",
    descricao: "3 tacos, nachos da casa e refrigerante gelado.",
    preco: 39.9,
    imagem:
      "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=900&q=80",
    categoria: "Combos",
    destaque: "Perfeito para jantar",
    opcoes: [
      {
        nome: "Escolha sua bebida",
        tipo: "single",
        obrigatorio: true,
        escolhas: [
          { nome: "Guarana lata", preco: 0 },
          { nome: "Cola zero", preco: 0 },
          { nome: "Limonada", preco: 4 },
        ],
      },
    ],
  },
  {
    id: "combo-familia",
    nome: "Combo Familia Fiesta",
    descricao: "8 tacos variados, batata rustica com paprika e 1 litro de bebida.",
    preco: 84.9,
    imagem:
      "https://images.unsplash.com/photo-1624300629298-e9de39c13be5?auto=format&fit=crop&w=900&q=80",
    categoria: "Combos",
    opcoes: [],
  },
  {
    id: "bebida-horchata",
    nome: "Horchata Cremosa",
    descricao: "Bebida mexicana com arroz, canela e toque de baunilha.",
    preco: 11.9,
    imagem:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80",
    categoria: "Bebidas",
    opcoes: [
      {
        nome: "Tamanho",
        tipo: "single",
        obrigatorio: true,
        escolhas: [
          { nome: "300ml", preco: 0 },
          { nome: "500ml", preco: 3 },
        ],
      },
    ],
  },
  {
    id: "bebida-refrigerante",
    nome: "Refrigerante Lata",
    descricao: "Escolha entre cola, guarana ou laranja bem gelados.",
    preco: 7.5,
    imagem:
      "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&w=900&q=80",
    categoria: "Bebidas",
    opcoes: [],
  },
  {
    id: "sobremesa-churros",
    nome: "Churros de Dulce de Leche",
    descricao: "Porcao quentinha com acucar e canela, recheada na hora.",
    preco: 15.9,
    imagem:
      "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?auto=format&fit=crop&w=900&q=80",
    categoria: "Sobremesas",
    opcoes: [
      {
        nome: "Cobertura",
        tipo: "single",
        obrigatorio: false,
        escolhas: [
          { nome: "Sem cobertura", preco: 0 },
          { nome: "Chocolate", preco: 2 },
          { nome: "Caramelo salgado", preco: 2.5 },
        ],
      },
    ],
  },
];
