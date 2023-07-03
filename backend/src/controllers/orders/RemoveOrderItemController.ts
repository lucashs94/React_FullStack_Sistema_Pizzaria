import { Request, Response } from "express";
import { RemoveOrderItemService } from "../../services/orders/RemoveOrderItemService";


export class RemoveOrderItemController{
  async handle(req: Request, res: Response){
    
    const orderItem_id = req.query.orderItem_id as string

    const removeItemService = new RemoveOrderItemService()
    const item = await removeItemService.execute(orderItem_id)
    
    return res.json(item)
  }
}