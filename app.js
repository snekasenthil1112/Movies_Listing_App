require("dotenv").config();
const moviesRoutes = require("./routes/movies/moviesRoutes");
const connectDB = require("./DB/index");
const express = require("express");                  //used to import modules and files -require
const app = new express();                           //creating object for class - object as app
const port =  process.env.PORT;       //https - 443 || port - contacting
app.use(express.json());
app.use("/movies",moviesRoutes);
//app.use("/export",connectDB);
connectDB();
 app.listen(port, () => {                            //class - listen fun - calling  || callback ||listen and eecute || communicate with object
    console.log(`Express app listening at http://localhost:${port}`)
 })
