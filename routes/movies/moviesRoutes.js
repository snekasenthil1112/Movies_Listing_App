const express = require("express");
const router = express.Router();
const movie = require("../../DB/schemas/movieSchema");
router.get("/", async(req, res) => {
    const queryParams= req.query;
    const filters ={}
    if(queryParams.name){
        filters.name = {
            $regex: `^${queryParams.name}`,
            $options: "i",
        };
    }
    if (queryParams.rating) {
        filters.rating = {
            $gte: parseFloat(queryParams.rating),
        };
    }
    const movies = await movie.find(filters);
    res.json(movies);
});

router.post("/", async (req, res) => {
    try{
        console.log(req.body);
        const moviesData =req.body;
        const newMovies = new movie(moviesData);
        await newMovies.save();
        res.json({
        message: "Movie added sucessfully",       
    });
        }catch(error) {
                console.log(error)
                res.status(500).json({
                    message: "already exist",
                    // message: "Interal server error",
                });
            }
});

router.put("/:id", async (req,res) =>{
    try{
        console.log(req.body);
        const movieId = req.params.id;
        const updatedMovieData = req.body;
        await movie.findByIdAndUpdate(movieId,updatedMovieData);
        res.json({
            message: " Movie updated successfully",
        });
    }catch(error) {
        console.log(error)
        res.status(500).json({
            //message: "already exist",
            message: "not updated",
        });
    }
});
router.delete("/:id", async (req,res) => {
    try{
        console.log(req.body);
        const movieId = req.params.id;
        const deletedMovieData = req.body;
        await movie.findByIdAndDelete(movieId,deletedMovieData);
        res.json({
            message: " Movie deleted successfully",
        });
    }catch(error) {
        console.log(error)
        res.status(500).json({
            //message: "already exist",
            message: "not updated",
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
       const movieId = req.params.id;
       console.log("handling the request");
       const movie = await movie.findById(movieId);
       if(!movie){
        res.status(404).json({message:"movie is not found",});

       }
       res.json(movie);
    }catch (error) {
        if(error.kind === "ObjectId"){
         res.status(404).json({message:"movie is not found",});
        }else{
            res.status(500).json({message:"internal server error",});
        }
    }
});
module.exports = router;