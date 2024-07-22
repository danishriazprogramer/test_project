import mongoose from "mongoose";

export const database = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.DB_URL);

    console.log(`Database Connection: ${connection.host}`);
  } catch (error) {
    console.log(error.message);
  }
};
