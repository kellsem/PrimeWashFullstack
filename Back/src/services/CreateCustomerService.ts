import prismaClient from "../prisma";
import { CreateCustomerProps } from "../types"


export class CreateCustomerService {  
  async  execute({ name, phone, carModel, plate, typeWashing, imageCar }: CreateCustomerProps) {
  
    if (!name || !phone || !carModel || !plate || !typeWashing || !imageCar) {
      throw new Error("Preencha todos os campos!");
    }
     //dados que a criação do meu registro deve obter
    const customer = await prismaClient.customer.create({ 
      data: {
        name,
        phone,
        carModel,
        plate,
        typeWashing,
        imageCar,
      },
    });

    return customer;
  }
}