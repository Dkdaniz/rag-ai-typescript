import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const DATABASE_URL = process.env.DATABASE_URL;
