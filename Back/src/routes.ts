//aqui eu faço as rotas dos meus serviços 
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerController } from "./controllers/CreateCustomerController";
import { ListCustomerController } from "./controllers/ListCustomerController";
import { DeleteCustomerController } from "./controllers/DeleteCustomerController";
import { EditCustomerController } from "./controllers/EditCustomerController";
import fs from 'fs';
import path from 'path';


export async function routes(fastify: FastifyInstance){
     fastify.get("/teste", async(request: FastifyRequest, reply:FastifyReply) => {
         return{ ok: true } 
    })
    
     //Rota do serviço "create" sendo aplicada com upload de imagem.
       fastify.post("/customer", async (request, reply) => {
       const parts = await request.parts();
       let formData: any = {};
       let imageBuffer: Buffer | null = null;
       let imageName: string = '';
     
       for await (const part of parts) {
         if (part.type === 'file') {
           imageName = `${Date.now()}-${part.filename}`;
           imageBuffer = await part.toBuffer();
         } else {
           formData[part.fieldname] = part.value;
         }
       }
     
       if (imageBuffer && imageName) {
         const uploadDir = path.resolve(__dirname, '..', 'uploads');
         if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
     
         const imagePath = path.join(uploadDir, imageName);
         fs.writeFileSync(imagePath, imageBuffer);
       }
     
       formData.imageCar = `http://localhost:3333/uploads/${imageName}`;
     
       return new CreateCustomerController().handle(request, reply, formData);
     });
     
    //Rota do serviço "list" sendo aplicada
    fastify.get('/customers', async(request, reply) => {
        return new ListCustomerController().handle(reply, request )
    })
    //Rota do serviço "delete" sendo aplicada
    fastify.delete('/customer', async(request, reply) => {
        return new DeleteCustomerController().handle( request, reply)
    })
    //Rota do serviço "edit" sendo aplicada
    fastify.put('/customer/:plate', async(request, reply) => {
        return new EditCustomerController().handle( request, reply)
    })
  
} 