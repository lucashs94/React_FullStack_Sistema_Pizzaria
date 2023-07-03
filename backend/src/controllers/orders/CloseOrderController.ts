import { Request, Response } from "express";
import { CloseOrderService } from "../../services/orders/CloseOrderService";


export class CloseOrderController{
  async handle(req: Request, res: Response){
    
    const { order_id } = req.body

    const closeOrderService = new CloseOrderService()
    const order = await closeOrderService.execute(order_id)
    
    return res.json(order)
  }
}