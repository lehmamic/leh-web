import { Db, MongoClient, MongoClientOptions } from 'mongodb';

const connectionString = process.env.MONGODB_CONNECTIONSTRING ?? '';
const options: MongoClientOptions = {
  //  useUnifiedTopology: true,
  //  useNewUrlParser: true,
};

let client: MongoClient;
let promise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (hot module replacement).
   if (!global.mongoClientPromise) {
      client = new MongoClient(connectionString, options);
      global.mongoClientPromise = client.connect();
   }
   promise = global.mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(connectionString, options);
  promise = client.connect()
}

export const connectToMongoDb = async (): Promise<{ db: Db }> => {
  const client = await promise;
  return { db: client.db() };
}
