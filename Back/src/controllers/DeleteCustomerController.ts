import { FastifyReply, FastifyRequest } from "fastify";
import { DeleteCustomerService } from "../services/DeleteCustomerService";


//extraindo o valor 
class DeleteCustomerController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const { plate } = request.query as { plate: string };
       
        //Chamando meu serviço inicializando ele.
        const findDelete = new DeleteCustomerService();

        //executo meu serviço.
        const customer = await findDelete.execute({ plate });

    reply.send(customer);
    }
}
export { DeleteCustomerController }//exporto meu controler

//No insomnia, o parametro utilizado é o 'Params' sem body.