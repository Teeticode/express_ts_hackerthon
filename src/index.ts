import express from "express";
import dotenv from "dotenv";
import {StreamChat} from "stream-chat";
dotenv.config()

const app = express()
const PORT = process.env.PORT;
const API_KEY = process.env.API_KEY;
const APP_SECRET = process.env.APP_SECRET;

const client = StreamChat.getInstance(API_KEY!, APP_SECRET);


app.use(express.json())

app.post("/getToken", async(req,res)=>{
  const {email} = req.body;
  try{
    const id = Math.random().toString(36).slice(2);
    await client.upsertUser({
      id,
      email,
      name:email
    });
    const token = client.createToken(id);
    res.status(200).json({
      token, email, name:email?.split("@")[0], client_id:id
    })
  }catch(err){
    res.status(500).json({error:"Live stream initialization failed!"})
  }
})
app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
