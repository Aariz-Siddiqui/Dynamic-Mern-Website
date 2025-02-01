require('dotenv').config();
const express = require('express');
const app =  express();
const authRouter = require('./router/auth-router');
const authContact = require("./router/contact-router");
const authService = require("./router/service-router");
const adminRouter = require("./router/admin-router");
const connectdb = require('./utils/db');
const errorMiddleware = require("./middlewares/error-middleware");
const cors = require("cors");

const corsOption = { //to let our browser know that we have hosted our frontend on port 5173
    origin:"http://localhost:5173",
    methods:"GET,POST,PUT,PATCH,DELETE,HEAD",
    credentials:true
}
app.use(cors(corsOption)); //

app.use(express.json());
app.use("/api/auth",authRouter); //this means any request at the path "localhost:8000/api/auth" will be handled by auth-router i.e(express router0)
app.use("/api",authContact);
app.use("/data",authService);
app.use("/api/admin",adminRouter);
app.use(errorMiddleware);



const PORT = 8000;

connectdb().then(
app.listen(PORT, ()=>{
    console.log(`Server is up and running on the Port ${PORT}`)
}));
