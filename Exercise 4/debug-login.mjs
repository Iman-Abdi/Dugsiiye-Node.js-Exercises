import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './backend/models/User.js';

dotenv.config();

const mongoUri = process.env.MONGO_URI_LOCAL || process.env.MONGO_URI;
console.log('mongoUriPresent=', !!mongoUri);

await mongoose.connect(mongoUri);

const email = 'testuser@example.com';
const password = '12345678';

const user = await User.findOne({ email }).lean();
console.log('userByExactEmail=', !!user);
if (user) {
  console.log('storedEmail=', user.email);
  console.log('storedPasswordLength=', user.password?.length);
  console.log('storedPasswordPrefix=', user.password?.slice(0, 30));
  const match = await bcrypt.compare(password, user.password);
  console.log('bcryptCompare=', match);
}

await mongoose.disconnect();
