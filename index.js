const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/auth.js");
const errorMiddleware = require("./middleware/error");
const ErrorResponse = require("./utils/errorResponse");
const privateRoutes = require("./routes/private.js");
dotenv.config({ path: "./.env.local" });
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

process.on("uncaughtException", (err) => {
    console.log(`ERROR: ${err.message}`);
    console.log("Shutting down due to uncaught exception");
    process.exit(1);
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/private", privateRoutes);
const server = app.listen(PORT, () => {
    try {
        connectDB();
        console.log('Server Running on port', PORT)
    }
    catch (err) {
        console.log(err)
    }
})

app.use(errorMiddleware);
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejection");
    server.close(() => {
        process.exit(1);
    });
});