import { Router } from "express";
import { getPurchasePage,purchaseBook,myPurchases } from "../controllers/purchaseController";

const router = Router();

router.get("/purchasePage/:bookId",getPurchasePage )
router.put("/purchaseFromCoins", purchaseBook)
router.get("/myPurchases" ,myPurchases )

export default router