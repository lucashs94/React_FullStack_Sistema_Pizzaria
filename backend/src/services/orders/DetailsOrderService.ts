import prismaClient from "../../prisma";


export class DetailsOrderService{
  
  async execute(order_id: string){

    
    const orders = await prismaClient.orderItem.findMany({
      where:{
        orderId: order_id,
      },
      include:{
        product: true,
        order: true,
      }
    })

    return orders
  }

}