import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import e from 'cors';
import userRouter from './routes/userRoute.js';
import 'dotenv/config.js'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';


const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());


// mongodb+srv://saimukhesh9870:<db_password>@cluster0.qig04.mongodb.net/?
connectDB();

app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/", (req,res) => {
  res.send( 'API is working' )
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});