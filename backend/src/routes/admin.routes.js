import express from "express";
import upload from "../middlewares/multer.middleware.js";  
import { 
    uploadProduct,
    fetchedProduct,
    updateProduct,
    deleteProduct,
    fetchedOrder ,
    fetchPaymentMethod
} from "../controllers/admin.controllers.js";

const router = express.Router();

router.post("/upload-product",upload.single("image"),uploadProduct);
router.put("/update-product/:id",upload.single("image"), updateProduct);
router.get("/fetched-product",fetchedProduct);
router.delete("/delete-product/:id",deleteProduct)

router.get('/fetch-order',fetchedOrder)

router.get('/payment-method', fetchPaymentMethod)

export default router;
