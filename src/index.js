import express from 'express';
import { stat } from 'fs/promises';
import { createReadStream } from 'fs';

const app = express();

//
// Throws an error if the PORT environment variable is missing.
//
if (!process.env.PORT) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}

const PORT = process.env.PORT;

app.get("/live", (req, res) => {
    res.sendStatus(200);
});

app.get("/video", async (req, res) => { // Route for streaming video.

    const videoPath = "./videos/SampleVideo_1280x720_1mb.mp4";
    const stats = await stat(videoPath);

    res.writeHead(200, {
        "Content-Length": stats.size,
        "Content-Type": "video/mp4",
    });

    createReadStream(videoPath).pipe(res);
});

const server = app.listen(PORT, () => {
    console.log(`Microservice online:` + PORT);
});

export { app, server };