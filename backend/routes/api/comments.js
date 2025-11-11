/**
 * GET /api/comments/:postId
 *
 * Retrieve all comments for a specific post.
 *
 * Path parameters:
 *   - postId {string} - MongoDB ObjectId of the post whose comments to retrieve.
 *
 * Behavior:
 *   - Validates that postId is a valid MongoDB ObjectId. If invalid, responds with:
 *       400 { error: "Invalid postId." }
 *   - On success, queries the Comment model for documents with the matching postId,
 *     sorts results by createdAt in descending order, and responds with:
 *       200 Array<Object> - List of comment documents (JSON).
 *   - On unexpected errors, logs the error and responds with:
 *       500 { error: "Failed to retrieve comments." }
 *
 * @param {import("express").Request} req - Express request object (expects req.params.postId).
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Sends the HTTP response with the appropriate status and JSON body.
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;
// Hey GitHub Copilot, please help me implement the following API endpoints for comments:
// 1. GET /api/comments/:postId - Retrieve all comments for a specific post.
router.get("/:postId", async (req, res) => {
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ error: "Invalid postId." });
    }

    try {
        const comments = await Comment.find({ postId }).sort({ createdAt: -1 }).exec();
        return res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to retrieve comments." });
    }
});
