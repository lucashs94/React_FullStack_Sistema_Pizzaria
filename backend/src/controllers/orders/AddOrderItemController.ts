import { Request, Response } from "express";
import { AddOrderItemService } from "../../services/orders/AddOrderItemService";


export class AddOrderItemController{
  async handle(req: Request, res: Response){
    
    const {order_id, product_id, amount} = req.body

    const addItemService = new AddOrderItemService()
    const item = await addItemService.execute({order_id, product_id, amount})
    
    return res.json(item)
  }
}