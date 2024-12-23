import { Router } from "express";
import { AuthRoute } from "../modules/Auth/Auth.route";
import { DonationsRoute } from "../modules/Donations/Donations.routes";
import { paymentRoute } from "../modules/Payment/Payment.routes";
import { imageRoutes } from "../modules/Images/images.routes";
import { BlogRoutes } from "../modules/Blog/Blog.routes";



const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoute,
  },{
    path: '/admin',
    route: DonationsRoute,
  },
  {
    path: '/payments',
    route: paymentRoute,
  },
  {
    path: '/images',
    route: imageRoutes,
  },
  {
    path:'/blogs',
    route: BlogRoutes,
  }

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
