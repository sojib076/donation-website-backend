import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import UserModel from './modules/User/User.model';
import bcryptJs from 'bcryptjs';
let server: Server;
async function createAdmin() {
  try {
    const adminExists = await UserModel.findOne({ email: 'sojibdas123@gmail.com' });
    if (!adminExists) {
      const saltRounds = Number(config.bcrypt_salt_rounds);
      const hashedPassword = await bcryptJs.hash( config.super_admin_password as string, saltRounds); 
      const admin = new UserModel({
        name: 'Default Admin',
        email: config.email_user as string,
        password:     hashedPassword,
        role: 'admin',
      });
      await admin.save();
      console.log('✅ Admin user created.');
    } else {
      console.log('✅ Admin user already exists.');
    }
  } catch (err) {
    console.error('❌ Failed to create admin user:', err);
  }
}
createAdmin();
async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
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
