import prismaClient from "../../prisma";



export class RemoveOrderItemService{
  
  async execute(orderItem_id: string){

    
    const order = await prismaClient.orderItem.delete({
      where:{
        id: orderItem_id,
      }
    })

    return order
  }

}