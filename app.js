import express from "express";
import morgan from "morgan";
import cors from "cors";

import "dotenv/config";

import connectDatabase from "./db/connectDatabase.js";

import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";

import authRouter from "./routes/authRouter.js";
import contactsRouter from "./routes/contactsRouter.js";
import path from "node:path";

const app = express();

const publicPath = path.join(process.cwd(), "public");
app.use(express.static(publicPath));

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use(notFoundHandler);

app.use(errorHandler);

await connectDatabase();

const port = Number(process.env.PORT) | 3000;

app.listen(port, () => {
    console.log("Server is running. Use our API on port: 3000");
});
