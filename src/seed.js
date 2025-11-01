import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  // Criar obras
  await prisma.work.createMany({
    data: [
      // Filmes
      { title: "Blade Runner", type: "movie", year: 1982, creator: "Ridley Scott", subgenre: "cyberpunk", synopsis: "Um caçador de androides em um futuro distópico.", rating: 9.0 },
      { title: "The Matrix", type: "movie", year: 1999, creator: "Wachowskis", subgenre: "cyberpunk", synopsis: "Um hacker descobre que a realidade é uma simulação.", rating: 9.2 },

      // Livros
      { title: "Neuromancer", type: "book", year: 1984, creator: "William Gibson", subgenre: "cyberpunk", synopsis: "Um hacker em um mundo dominado por IA e corporações.", rating: 8.7 },
      { title: "Duna", type: "book", year: 1965, creator: "Frank Herbert", subgenre: "space opera", synopsis: "Um jovem herdeiro luta pelo controle do planeta desértico Arrakis.", rating: 9.5 },

      // Séries
      { title: "Black Mirror", type: "series", year: 2011, creator: "Charlie Brooker", subgenre: "dystopian", synopsis: "Antologia sobre tecnologia e sociedade futura.", rating: 8.8 },
      { title: "Altered Carbon", type: "series", year: 2018, creator: "Laeta Kalogridis", subgenre: "cyberpunk", synopsis: "Em um futuro onde a consciência é transferível, um detetive é reanimado para resolver um crime.", rating: 7.9 },

      // Jogos de console/PC
      { title: "Cyberpunk 2077", type: "game", year: 2020, creator: "CD Projekt", subgenre: "cyberpunk", synopsis: "Aventure-se em Night City, um mundo aberto cheio de perigos e tecnologia avançada.", rating: 7.0 },
      { title: "Mass Effect", type: "game", year: 2007, creator: "BioWare", subgenre: "space opera", synopsis: "Lidere uma equipe de elite em uma galáxia ameaçada por uma raça antiga e poderosa.", rating: 9.0 },

      // Boardgames
      { title: "Terraforming Mars", type: "boardgame", year: 2016, creator: "Jacob Fryxelius", subgenre: "strategy", synopsis: "Converta Marte em um planeta habitável competindo com outras corporações.", rating: 8.5 },
      { title: "Android: Netrunner", type: "boardgame", year: 2012, creator: "Fantasy Flight Games", subgenre: "cyberpunk", synopsis: "Jogo de cartas assimétrico ambientado no universo cyberpunk.", rating: 9.0 },
    ],
  });

  // Buscar IDs das obras
  const works = await prisma.work.findMany();
  const getByTitle = (title) => works.find((w) => w.title === title);

  // Criar relações
  const relations = [
    { from: "Blade Runner", to: "Neuromancer", type: "inspiredBy" },
    { from: "The Matrix", to: "Neuromancer", type: "inspiredBy" },
    { from: "Altered Carbon", to: "Neuromancer", type: "sameUniverse" },
    { from: "Cyberpunk 2077", to: "Neuromancer", type: "inspiredBy" },
    { from: "Android: Netrunner", to: "Neuromancer", type: "inspiredBy" },
    { from: "Mass Effect", to: "Duna", type: "inspiredBy" },
    { from: "Terraforming Mars", to: "Duna", type: "sameUniverse" },
  ];

  for (const r of relations) {
    const fromWork = getByTitle(r.from);
    const toWork = getByTitle(r.to);
    if (fromWork && toWork) {
      await prisma.relatedWork.create({
        data: {
          fromWorkId: fromWork.id,
          toWorkId: toWork.id,
          relationType: r.type,
        },
      });
    }
  }

  console.log("✅ Seed completo! Todas as obras e relações foram criadas.");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
