import { MongoClient } from "mongodb";

export async function getMongoClient() {
  const user = "saikat";
  const password = "25907111";
  const databaseName = "users";

  //const uri = `mongodb+srv://${user}:${password}@userdatacluster.ybz8b.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
  const uri = process.env.MONGO_DB_URI;

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return client;
}

