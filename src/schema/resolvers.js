import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    // Listar todas as obras
    works: async () => {
      return prisma.work.findMany();
    },

    // Buscar por ID ou termo no título
    work: async (_, { id, term }) => {
      if (id) {
        const work = await prisma.work.findUnique({ where: { id } });
        return work ? [work] : [];
      }

      if (term) {
        return prisma.work.findMany({
          where: { title: { contains: term, mode: "insensitive" } },
        });
      }

      return [];
    },
  },

  Mutation: {
    // Adicionar obra dinamicamente
    addWork: async (_, args) => {
      return prisma.work.create({ data: { ...args } });
    },
  },

  Work: {
    // Resolver para as obras relacionadas
    relatedWorks: async (parent) => {
      const relations = await prisma.relatedWork.findMany({
        where: { fromWorkId: parent.id },
        include: { toWork: true },
      });

      return relations.map((r) => ({
        relationType: r.relationType,
        toWork: r.toWork,
      }));
    },
  },
};
