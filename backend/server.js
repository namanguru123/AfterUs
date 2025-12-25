import app from './src/app.js';
import connectDB from './src/config/db.js';
import env from './src/config/env.js';

const startServer = async () => {
    try {
        await connectDB();
        app.listen(env.PORT, () => {
            console.log("Server is running on port", env.PORT);
        })
    }

    catch(err) {
        console.error("Failed to start server:", err.message);
        process.exit(1);
    }
}

startServer();