import { FastifyReply, FastifyRequest } from "fastify"
import { CreateCustomerService } from "../services/CreateCustomerService";
import { CreateCustomerProps } from "../types"
//Inserindo os dados no meu MongoDB 
class CreateCustomerController {
async handle(request: FastifyRequest, reply: FastifyReply, formData?: any){
    const { name, phone, carModel, plate, typeWashing, imageCar  } = formData ?? request.body as CreateCustomerProps;

    //inicializo o serviço dando o nome para ele.
    const customerService = new CreateCustomerService;

    //chamo o serviço acessando o metodo e executo ele.
    const customer = await customerService.execute({name,  phone, carModel, plate, typeWashing, imageCar});
    //devolvo ele para a api com o metodo send
    reply.send(customer);
}
}
export { CreateCustomerController }