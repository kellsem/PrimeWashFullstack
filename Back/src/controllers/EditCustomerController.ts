import { FastifyReply, FastifyRequest } from "fastify";
import { EditCustomerService } from "../services/EditCustomerService";
import { EditteCustomerProps } from "../types";

//extraindo o valor 
class EditCustomerController{
    async handle(request: FastifyRequest, reply: FastifyReply){
const { plate } = request.params as {plate: string};

const data: Record<string, any>= {};
let imageBuffer: Buffer | undefined;

for await (const part of request.parts()){
    if (part.type === "file") {
        const chunks = [];
        for await (const chunk of part.file){
            chunks.push(chunk);
        }
        imageBuffer = Buffer.concat(chunks);
        data.imageCar = imageBuffer;
        }else{
            data[part.fieldname] = part.value;
        }
    }
const { name,  phone, carModel, typeWashing } = data;
        
//inicializando o serviçi
const  customerService = new EditCustomerService;

//executando meu serviço
await customerService.execute({name, phone, carModel, plate, typeWashing, imageCar: data.imageCar});
      
//pedindo para só confirmar a demanda.
reply.status(200).send()
    }
}
export { EditCustomerController }//exporto meu controller