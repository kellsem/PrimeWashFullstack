import fastify from 'fastify';
import { routes } from './routes';
import dotenv from 'dotenv';
import path from 'path';
import cors from '@fastify/cors'; 
import fastifyMultipart from '@fastify/multipart'; //plugin para upload de arquivos
import fastifyStatic from '@fastify/static';
import { request } from 'http';



// Carrega o .env da pasta prisma
dotenv.config({ path: path.resolve(__dirname, '../prisma/.env') });

//instanciei minha fastify no meu app
const app = fastify({ logger: true })


//Boas praticas para que o servidor não caia com erros e apresente-o no terminal 
app.setErrorHandler((error, request, reply) =>{
    reply.code(400).send({message: error.message})
})


//criei uma função async para iniciar meu servidor
const start = async () => {
//Chamando a rota do meu servidor 
await app.register(fastifyMultipart);
await app.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT','DELETE'],
});
await app.register(fastifyStatic, {
    root: path.join(__dirname, '..', 'uploads'),
    prefix: '/uploads/',
  });
  await app.register(routes);
 

try {
    //porta do meu sevidor
    await app.listen({ port: 3333 });
    console.log('servidor está rodando!👽💻');
}catch(err) {
    process.exit(1)
}}
start()
