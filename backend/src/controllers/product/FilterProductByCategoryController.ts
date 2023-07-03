import { Request, Response } from "express";
import { FilterProductByCategoryService } from "../../services/product/FilterProductByCategoryService";


export class FilterProductByCategoryController{
  async handle(req: Request, res: Response){
    
    const category_id = req.query.category_id as string

    const filterProductService = new FilterProductByCategoryService()
    const products = await filterProductService.execute(category_id)
    
    return res.json(products)

  }
}