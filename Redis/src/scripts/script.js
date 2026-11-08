
import "dotenv/config";

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";

import User from "../model/User.model.js";
import Post from "../model/Post.model.js";

// =====================================
// CONFIGURATION
// =====================================

const TOTAL_USERS = 1000;
const TOTAL_POSTS = 1_000_000;

// Insert posts in batches instead of creating
// one million documents in memory.
const BATCH_SIZE = 5000;

// =====================================
// CREATE USERS
// =====================================

const createUsers = async () => {
    console.log("Creating users...");

    // Hash once and reuse this dummy password hash.
    const passwordHash = await bcrypt.hash(
        "DummyPassword123!",
        10
    );

    const users = [];

    for (let i = 1; i <= TOTAL_USERS; i++) {
        const username = `user_${i}`;

        users.push({
            username,
            fullName: faker.person.fullName(),
            email: `user_${i}@example.com`,
            password: passwordHash,

            profilePicture:
                `https://i.pravatar.cc/150?u=${username}`,

            bio: faker.lorem.sentence(),

            followersCount: faker.number.int({
                min: 0,
                max: 10000
            }),

            followingCount: faker.number.int({
                min: 0,
                max: 1000
            }),

            postsCount: 0,

            isVerified: faker.datatype.boolean(),
            isPrivate: faker.datatype.boolean()
        });
    }

    // Insert all 1000 users
    const createdUsers = await User.insertMany(users);

    console.log(`${createdUsers.length} users created!`);

    // Return only MongoDB ObjectIds
    return createdUsers.map(user => user._id);
};

// =====================================
// CREATE ONE MILLION POSTS
// =====================================

const createPosts = async (userIds) => {
    console.log("Creating posts...");

    let batch = [];
    let totalInserted = 0;

    for (let i = 1; i <= TOTAL_POSTS; i++) {

        // Select a random user as post author
        const randomUser =
            userIds[Math.floor(Math.random() * userIds.length)];

        const post = {
            author: randomUser,

            caption: faker.lorem.sentences({
                min: 1,
                max: 3
            }),

            media: [
                {
                    url: `https://picsum.photos/seed/${i}/800/800`,
                    mediaType: "image"
                }
            ],

            location: faker.location.city(),

            hashtags: [
                faker.word.sample(),
                faker.word.sample()
            ],

            likesCount: faker.number.int({
                min: 0,
                max: 50000
            }),

            commentsCount: faker.number.int({
                min: 0,
                max: 5000
            }),

            isArchived: false,
            isDeleted: false
        };

        batch.push(post);

        // Insert when batch reaches 5000 documents
        if (batch.length === BATCH_SIZE) {

            await Post.insertMany(batch, {
                ordered: true
            });

            totalInserted += batch.length;

            console.log(
                `Posts inserted: ${totalInserted}/${TOTAL_POSTS}`
            );

            // Release references to inserted batch
            batch = [];
        }
    }

    // Insert remaining documents, if any
    if (batch.length > 0) {
        await Post.insertMany(batch);

        totalInserted += batch.length;
    }

    console.log(`${totalInserted} posts created!`);
};

// =====================================
// UPDATE USER POST COUNTS
// =====================================

const updatePostCounts = async () => {
    console.log("Updating user post counts...");

    const counts = await Post.aggregate([
        {
            $group: {
                _id: "$author",
                totalPosts: { $sum: 1 }
            }
        }
    ]);

    const operations = counts.map(item => ({
        updateOne: {
            filter: { _id: item._id },
            update: {
                $set: { postsCount: item.totalPosts }
            }
        }
    }));

    if (operations.length > 0) {
        await User.bulkWrite(operations);
    }

    console.log("User post counts updated!");
};

// =====================================
// MAIN SEED FUNCTION
// =====================================

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected!");

        // Step 1: Create users
        const userIds = await createUsers();

        // Step 2: Create one million posts
        await createPosts(userIds);

        // Step 3: Update users' post counters
        await updatePostCounts();

        console.log("Database seeding completed!");
    } catch (error) {
        console.error("Seeding failed:", error);
    } finally {
        await mongoose.disconnect();

        console.log("MongoDB disconnected!");
    }
};

seedDatabase();
