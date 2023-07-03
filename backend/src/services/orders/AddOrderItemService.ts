import prismaClient from "../../prisma";

interface OrderItemRequest{
  order_id: string;
  product_id: string;
  amount: number;
}

export class AddOrderItemService{
  
  async execute({order_id, product_id, amount}: OrderItemRequest){

    
    const item = await prismaClient.orderItem.create({
      data:{
        orderId: order_id,
        productId: product_id,
        amount,
      }
    })

    return item
  }

}