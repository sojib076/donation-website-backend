
import { Router } from "express";
import { DonationsController } from "./Donations.controller";
import auth from "../../middlewares/roleCheck";
import { USER_ROLE } from "../User/user.utils";
import { multerUpload } from "../../middlewares/multer.config";


const router = Router();

router.post("/create-donation", multerUpload.single('image'), auth(USER_ROLE.admin) ,DonationsController.createDonation)
router.get("/get-donations", DonationsController.getDonations)

router.get("/get-donation/:id", DonationsController.getSingleDonation)
router.delete("/delete-donation/:id", auth(USER_ROLE.admin), DonationsController.deleteDonation)
router.patch("/mark-donation-as-collected/:id", auth(USER_ROLE.admin), DonationsController.markDonationAsCollected)

export const DonationsRoute = router;