import mongoose, { ConnectOptions } from "mongoose";

const mongooseconnect = async () => {
  const readyState = mongoose.connections[0].readyState as ConnectionState;

  if (readyState === 1) {
    return mongoose.connections[0].asPromise();
  }

  const uri = process.env.MONGODB_URI as string;
  const options: ConnectOptions = {
    // Specify any connection options you need here
  };

  return mongoose.connect(uri, options);
};

export default mongooseconnect;
