import { Router } from "express";
import { multerUpload } from "../../middlewares/multer.config";
import auth from "../../middlewares/roleCheck";
import { USER_ROLE } from "../User/user.utils";
import { imageController } from "./images.controller";

const router = Router();

router.post("/upload", multerUpload.single('image'), auth(USER_ROLE.admin),
    imageController.createImage
)

router.get("/", auth(USER_ROLE.admin), imageController.getImages);

router.delete("/:id", auth(USER_ROLE.admin), imageController.deleteImage);




export const imageRoutes = router;