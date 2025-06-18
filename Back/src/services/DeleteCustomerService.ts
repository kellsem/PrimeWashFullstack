import prismaClient from "../prisma"

//Interface de reconhecimento
interface DeleteCustomerProps{
    plate:string
}
//Procuro meu dado expecifico. Placa é o dado único dos clientes.
class DeleteCustomerService{
    async execute({ plate }:DeleteCustomerProps){
    if(!plate){  //se não encontrar, será lançado o "erro"
        throw new Error('Solicitação inválida')
    }

    //busca no banco de dados.
    const findCustomer = await prismaClient.customer.findFirst({
        where:{
            plate: plate
        }
    })
    //validação, se caso não encontrar o plate:
    if(!findCustomer){
        throw new Error('Cliente não existe');
    }
    //Se caso encontrar, Delete o cliente.
       await prismaClient.customer.delete({
        where:{
            id: findCustomer.id
        }
    })
    return { message: 'O cliente foi deletado' }
    }
} 
export { DeleteCustomerService }


//Obs:Transformei meu plate como @unique no prisma para que ele se tornasse o dado unico para delete. 