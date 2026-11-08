
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        caption: {
            type: String,
            maxlength: 2200,
            default: ""
        },

        media: [
            {
                url: {
                    type: String,
                    required: true
                },

                mediaType: {
                    type: String,
                    enum: ["image", "video"],
                    default: "image"
                }
            }
        ],

        location: {
            type: String,
            default: null
        },

        hashtags: [{
            type: String,
            trim: true,
            lowercase: true
        }],

        likesCount: {
            type: Number,
            default: 0,
            min: 0
        },

        commentsCount: {
            type: Number,
            default: 0,
            min: 0
        },

        isArchived: {
            type: Boolean,
            default: false
        },

        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

// Important for user profile posts
// postSchema.index({ author: 1, createdAt: -1 });

// Important for recent posts / feed queries
// postSchema.index({ createdAt: -1 });

const Post = mongoose.model("Post", postSchema);

export default Post;
