import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

const app = express();

app.on("error" ,(err)=>{
    console.log('ERROR :: ',err);
    throw err
})



const allowedOrigins = [process.env.CORS_ORIGIN, "http://localhost:8000"];

app.use(cors({
    origin : allowedOrigins,
    credentials : true
}))

// app.use("/",express.static("public/dist"));

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'public', 'dist')));

// Fallback for serving index.html on non-API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dist', 'index.html'));
});

// CORS middleware - apply before any routes
// app.use(cors({
//     origin: (origin, callback) => {
//         // Allow only specified origins, block others
//         if (allowedOrigins.includes(origin) || !origin) { // Allow localhost during development without origin
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'), false);
//         }
//     },
//     credentials: true, // Allow credentials (cookies, HTTP authentication)
// }));

// config app about input data type 
app.use(express.json({limit : "16kb"}));
app.use(express.urlencoded({limit : "16kb" , extended : true}));
app.use(express.static("public"));
app.use(cookieParser());

// routes
import userRouter from "./routes/user.routes.js";
import tweetRouter from './routes/tweet.routes.js';
import commentRouter from './routes/comment.routes.js';
import likeRouter from './routes/like.routes.js';
import playlistRouter from './routes/playlist.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import videoRouter from './routes/video.routes.js';
import dashboardRouter from "./routes/dashboard.routes.js";


app.use("/api/user",userRouter);
app.use('/api/tweets',tweetRouter);
app.use("/api/comments",commentRouter);
app.use("/api/like",likeRouter);
app.use("/api/playlist",playlistRouter);
app.use("/api/subscription",subscriptionRouter);
app.use("/api/video",videoRouter);
app.use("/api/dashboard",dashboardRouter);


export {app};