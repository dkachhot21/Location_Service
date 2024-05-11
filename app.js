import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import { connectDB } from "./config/connectDB.js";
import { errorHandler } from "./middlewares/errorHandler.js"
import apiRoutes from "./routes/apiRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import setupSwagger from './swagger.js';


configDotenv();

const PORT = process.env.PORT || 3000;

//Initialize Express as app
const app = express();

setupSwagger(app,PORT);

//DB Connection
connectDB();

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use('/api', apiRoutes);
app.use('/user', userRoutes);

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})