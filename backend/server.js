import app from './src/app.js';
import connectDB from './src/config/db.js';
import env from './src/config/env.js';
import { runConditionChecks } from "./src/services/conditionMonitor.js";




const startServer = async () => {
    try {
        await connectDB();
        app.listen(env.PORT, () => {
            console.log("Server is running on port", env.PORT);
        })

        setInterval(() => {
            runConditionChecks();
        }, 5 * 60 * 1000);
    }

    catch(err) {
        console.error("Failed to start server:", err.message);
        process.exit(1);
    }
}

startServer();