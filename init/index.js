const mongoose = require('mongoose');

main()
.then(()=>{console.log("connection successfully")})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust')}


  const listing=require("../model/listing.js");
  const initdata=require("./data.js");
// const { db } = require('../model/listing');


   const initDb= async()=> {
    await listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,owner:'684ee0b09c4fd9d8de3d35d4'}));
    await listing.insertMany(initdata.data);

    console.log("work done");
   }
   initDb();
