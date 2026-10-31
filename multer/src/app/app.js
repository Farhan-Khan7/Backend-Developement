import express from "express";
import multer from "multer";
import path from "path";
import crypto from "crypto";
import ImageKit from "@imagekit/nodejs";
import dotenv from "dotenv/config";
import fs from "fs"

const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads");
    },

    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        crypto.randomBytes(16, function (err, raw) {
            if (err) return cb(err);
            cb(null, file.fieldname + "-" + raw.toString("hex") + ext);
        });
    },
});

const fileFilter = (req, file, cb) => {
    const allowedtype = ["image/jpeg", "image/png", "image/webp", "image/gif"];

    if (allowedtype.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("File not supported"), false);
    }
};

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter,
});

app.post("/upload", upload.single("avatar"), async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "no file uploaded. please send file with field name 'avatar'",
            });
        }

        const client = new ImageKit({
            privateKey: process.env["IMAGEKIT_PRIVATE_KEY"], // This is the default and can be omitted
        });

        const response = await client.files.upload({
            file: fs.createReadStream(file.path),
            fileName: file.filename,

        });

        return res.status(200).json({
            success: true,
            message: "File Uploaded",
            data: response
        })


    }catch (error) {
        console.log(error)
    }

});

export default app;
