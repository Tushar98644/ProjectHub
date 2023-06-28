import mongoose from "mongoose";

interface UriType {
    uri: string | undefined;
}

const mongooseconnect = async () => {

    if (mongoose.connections[0].readyState === 1)
        return mongoose.connections[0].asPromise();
    
    const uri = process.env.MONGODB_URI;
    return mongoose.connect(uri);
};

export default mongooseconnect;