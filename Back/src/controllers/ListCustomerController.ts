import { FastifyReply, FastifyRequest } from "fastify";
import { ListCustomerService } from "../services/ListCustomerService";

class ListCustomerController{
    async handle(reply: FastifyReply, request: FastifyRequest){
        //Chamando meu serviço inicializando ele.
        const listCustomer = new ListCustomerService();


        //Executo meu serviço.
        const customer = await listCustomer.execute();

        //Mando ele para a api com metodo send
        reply.send(customer);

    }
} export { ListCustomerController } // exporto meu controler