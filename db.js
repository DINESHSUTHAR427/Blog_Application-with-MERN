const mongoose = require("mongoose");

let cached = global._mongoose;
if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URL, {
      bufferCommands: false,   // fail fast instead of hanging 10s
      serverSelectionTimeoutMS: 10000,
    }).then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = dbConnect;