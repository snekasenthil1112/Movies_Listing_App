const express =require("express");
const router = express.Router();
router.get("/",(req, res) => {
    res.json({
        message:"tickets booked",
    });
});
module.exports = router;
