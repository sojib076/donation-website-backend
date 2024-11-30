"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Auth_route_1 = require("../modules/Auth/Auth.route");
const Donations_routes_1 = require("../modules/Donations/Donations.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: Auth_route_1.AuthRoute,
    }, {
        path: '/admin',
        route: Donations_routes_1.DonationsRoute,
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
