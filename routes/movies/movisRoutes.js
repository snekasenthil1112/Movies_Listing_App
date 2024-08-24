const express = require("express");
const router = express.Router();
router.get("/",(req, res) => {
    res.json({
        message:"movies done",
    });
});
module.exports = router;
