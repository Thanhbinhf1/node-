const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

router.get("/", reviewController.getAllReviews);
router.post("/", reviewController.createReview);
router.put("/:id/status", reviewController.updateReviewStatus);
router.delete("/:id", reviewController.deleteReview);

module.exports = router;
