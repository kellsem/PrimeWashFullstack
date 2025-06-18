import prismaClient from "../prisma"


class ListCustomerService{
    async execute(){
       const customers = await prismaClient.customer.findMany()//Acesso cada um e executo o metodo para procurar todos.(esse vai ser o serviço!)
     
       return customers;
    }
   
}

export { ListCustomerService }