import { connect } from "mongoose";

const connectionString =
  process.env.MONGODB_URI || "mongodb://localhost:27017/carkeeperDB";

const connectMongo = async () => {
  connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
export default connectMongo;
