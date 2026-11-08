import express from "express";
import Post from "../model/Post.model.js";
import { Redis } from "ioredis";

const app = express();
const redis = new Redis();

redis.once("connect" , () => {
    console.log("Redis connected successfully")
})

let count = 0;
function reqCounter() {
    return count++
}


app.get("/:postId/details", async (req, res) => {

    const findPostInCache = await redis.get(`post:${req.params.postId}`);

    const postId = req.params.postId;

    if (!postId) {
        return res.status(404).json({
            error: "Post ID is required"
        })
    }

    console.log(`Request count : ${reqCounter()}`);

    if (findPostInCache) {
        return res.status(200).json({
            success: true,
            message: "Post details fetched from cache",
            data: {
                post: JSON.parse(findPostInCache)
            }
        });
    }

    const post = await Post.findById(postId);


    if (!post) {
        return res.status(404).json({
            error: "Post not found"
        });
    }

    const setPostInCache = await redis.set(`post:${postId}`, JSON.stringify(post), "EX", 3600); // Cache for 1 hour

    return res.status(200).json({
        success: true,
        message: "Post details fetched successfully",
        data: {
            post
        }

    });
});

export default app;