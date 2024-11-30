import { Router } from "express";
import { AuthRoute } from "../modules/Auth/Auth.route";
import { DonationsRoute } from "../modules/Donations/Donations.routes";



const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoute,
  },{
    path: '/admin',
    route: DonationsRoute,
  }

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
