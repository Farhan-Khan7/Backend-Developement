import express from "express";
import Post from "../model/Post.model.js";

const app = express();



let count = 0;
function reqCounter() {
    return count++
}


app.get("/:postId/details", async (req, res) => {
    const postId = req.params.postId;

    if (!postId) {
        return res.status(404).json({
            error: "Post ID is required"
        })
    }

    console.log(`Request count : ${reqCounter()}`);

    const post = await Post.findById(postId);


    if (!post) {
        return res.status(404).json({
            error: "Post not found"
        });
    }

    return res.status(200).json({
        success: true,
        message: "Post details fetched successfully",
        data: {
            post
        }

    });
});

export default app;