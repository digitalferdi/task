const mongoose = require('mongoose');

const uri = "mongodb+srv://digitalferdi_db_user:I1PrvmAvirqYiY8q@cluster0.vxqqhn1.mongodb.net/vibe-task?appName=Cluster0";

console.log("Testing connection to:", uri.replace(/:[^:]+@/, ':****@'));

mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log("SUCCESS: Connected to MongoDB");
    process.exit(0);
  })
  .catch(err => {
    console.error("FAILURE: Could not connect to MongoDB");
    console.error(err);
    process.exit(1);
  });
