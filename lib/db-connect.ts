import mongoose from 'mongoose';

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING!)
    console.log('connected')
  } catch (error) {
    throw new Error("Error connecting to MongoDB")
  }
}

export default connect;