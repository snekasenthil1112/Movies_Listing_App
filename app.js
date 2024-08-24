require("dotenv").config();
const movisRoutes = require("./routes/movies/movisRoutes");
const ticketroutes = require("./routes/movies/ticketRoutes");
const express = require("express");                
const app = new express();                         
const port =  process.env.PORT || 8080;           
app.use("/movis",movisRoutes);
app.use("/ticket",ticketroutes);
 app.listen(port, () => {                           
    console.log(`Express app listening at http://localhost:${port}`)
 })