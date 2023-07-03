import prismaClient from "../../prisma";


export class FilterProductByCategoryService{
  
  async execute(category_id: string){

    
    const products = await prismaClient.product.findMany({
      where:{
        categoryId: category_id,
      }
    })

    return products
  }

}