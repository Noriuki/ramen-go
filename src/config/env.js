import dotenv from 'dotenv';

dotenv.config();

const env = {
  API_URL: process.env.API_URL,
  API_TOKEN: process.env.API_TOKEN,
};

export default env;
