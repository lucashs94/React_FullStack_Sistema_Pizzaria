import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

import { CreateProductController } from "./controllers/product/CreateProductController";
import { FilterProductByCategoryController } from "./controllers/product/FilterProductByCategoryController";

import { CreateOrderController } from "./controllers/orders/CreateOrderController";
import { RemoveOrderController } from "./controllers/orders/RemoveOrderController";
import { AddOrderItemController } from "./controllers/orders/AddOrderItemController";
import { RemoveOrderItemController } from "./controllers/orders/RemoveOrderItemController";
import { SendOrderController } from "./controllers/orders/SendOrderController";
import { ListOrderController } from "./controllers/orders/ListOrderController"; 
import { DetailsOrderController } from "./controllers/orders/DetailsOrderController";
import { CloseOrderController } from "./controllers/orders/CloseOrderController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import uploadConfig from './config/multer'

export const router = Router()

const upload = multer(uploadConfig.upload('./tmp'))


// ------ ROUTES ------
// Rotas USER
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle)


// Rotas CATEGORY
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
router.get('/category', isAuthenticated, new ListCategoryController().handle)


// Rotas PRODUCT
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)
router.get('/product', isAuthenticated, new FilterProductByCategoryController().handle)


// Rotas ORDER
router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)
router.post('/order/add', isAuthenticated, new AddOrderItemController().handle)
router.delete('/order/remove', isAuthenticated, new RemoveOrderItemController().handle)
router.put('/order/send', isAuthenticated, new SendOrderController().handle)
router.get('/orders', isAuthenticated, new ListOrderController().handle)
router.get('/orders/details', isAuthenticated, new DetailsOrderController().handle)
router.put('/order/close', isAuthenticated, new CloseOrderController().handle)

