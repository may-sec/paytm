const express = require('express');
const cors = require("cors");
const rootRouter = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });
}

// Export for Vercel serverless
module.exports = app;