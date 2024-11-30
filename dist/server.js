"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const User_model_1 = __importDefault(require("./modules/User/User.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
let server;
function createAdmin() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const adminExists = yield User_model_1.default.findOne({ email: 'sojibdas123@gmail.com' });
            if (!adminExists) {
                const saltRounds = Number(config_1.default.bcrypt_salt_rounds);
                const hashedPassword = yield bcryptjs_1.default.hash(config_1.default.super_admin_password, saltRounds);
                const admin = new User_model_1.default({
                    name: 'Default Admin',
                    email: config_1.default.email_user,
                    password: hashedPassword,
                    role: 'admin',
                });
                yield admin.save();
                console.log('✅ Admin user created.');
            }
            else {
                console.log('✅ Admin user already exists.');
            }
        }
        catch (err) {
            console.error('❌ Failed to create admin user:', err);
        }
    });
}
createAdmin();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.database_url);
            server = app_1.default.listen(config_1.default.port, () => {
                console.log(`app is listening on port ${config_1.default.port}`);
            });
        }
        catch (err) {
            console.log(err);
        }
    });
}
main();
process.on('unhandledRejection', () => {
    console.log(`😈 unahandledRejection is detected , shutting down ...`);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on('uncaughtException', () => {
    console.log(`😈 uncaughtException is detected , shutting down ...`);
    process.exit(1);
});
