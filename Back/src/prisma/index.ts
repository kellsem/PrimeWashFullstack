//importando o prisma no meu index
import { PrismaClient } from "@prisma/client";
//estou inicializando meu prisma e armazenando em uma const
//criando uma exportação padrão do prisma
const prismaClient = new PrismaClient()
export default prismaClient

