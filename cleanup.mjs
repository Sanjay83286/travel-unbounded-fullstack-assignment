import mongoose from "mongoose";
import fs from "fs";
const uri = fs.readFileSync(".env.local","utf8").match(/MONGODB_URI=(.+)/)[1].trim();
await mongoose.connect(uri);
const col = mongoose.connection.collection("enquiries");
const all = await col.find({}).sort({createdAt:-1}).toArray();
console.log("BEFORE:", all.length, "records");
all.forEach(r => console.log("  -", r.fullName, "|", r.email, "|", r.createdAt.toISOString()));
