"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Auth_route_1 = require("../modules/Auth/Auth.route");
const Donations_routes_1 = require("../modules/Donations/Donations.routes");
const Payment_routes_1 = require("../modules/Payment/Payment.routes");
const images_routes_1 = require("../modules/Images/images.routes");
const Blog_routes_1 = require("../modules/Blog/Blog.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: Auth_route_1.AuthRoute,
    }, {
        path: '/admin',
        route: Donations_routes_1.DonationsRoute,
    },
    {
        path: '/payments',
        route: Payment_routes_1.paymentRoute,
    },
    {
        path: '/images',
        route: images_routes_1.imageRoutes,
    },
    {
        path: '/blogs',
        route: Blog_routes_1.BlogRoutes,
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
