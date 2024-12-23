
import { Router } from "express";
import paymentController from "./payment.controller";


const router = Router();

router.post('/createpayment', paymentController.createpayment )
router.post('/invoice', paymentController.createinvoice )



export const  paymentRoute = router;