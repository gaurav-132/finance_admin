import cron from 'node-cron';
import { trackLoan } from './customers/trackLoan.js'; // Adjust the path as needed

// Function to schedule cron jobs
const scheduleJobs = () => {
    // Schedule the cron job to run at midnight every day
    cron.schedule('0 0 * * *', async () => {
        try {
            await trackLoan();
        } catch (error) {
            console.error('Error running trackLoan:', error);
        }
    });

    console.log('Cron job scheduled to run at midnight every day.');
};

export default scheduleJobs;
