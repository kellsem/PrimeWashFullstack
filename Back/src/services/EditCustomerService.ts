import prismaClient from "../prisma"
import { EditteCustomerProps } from "../types"


//Procuro meu dados expecificos disponiveis para alteração.
class EditCustomerService{
    async execute({ plate, name, phone, carModel, typeWashing, imageCar}:EditteCustomerProps){
    if(!plate){  //se não encontrar, será lançado o "erro"
        throw new Error('Solicitação inválida')
    };
    //Busca no banco de dados: acesso com prismaClient/acesso os models do schema com customer.
    const findCustomer = await prismaClient.customer.findFirst({
        where:{
            plate: plate   
  }
    });
    //se caso não encontrar cliente:
    if (!findCustomer){
        throw new Error('Cliente não existe!')
    };
    //Atualização do banco/ utilizando metodo uptade para atualização.
    const updatedCustomer = await prismaClient.customer.update({
        where:{
            plate: findCustomer.plate  //identifico meu plate e sigo as alterações com operador de coalecência nula (??) para que eu possa corrigir somente oq necessário, prevalecendo o lado esquerdo.
        }, data: {
            plate: plate ?? findCustomer.plate,
            name: name ?? findCustomer.name,
            phone: phone ?? findCustomer.phone,
            carModel: carModel ?? findCustomer.carModel,
            typeWashing: typeWashing ?? findCustomer.typeWashing,
            imageCar: imageCar ?? findCustomer.imageCar,
        }
    });

    return updatedCustomer;

    }
} 
export { EditCustomerService }
