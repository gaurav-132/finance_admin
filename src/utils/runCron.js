import { trackLoan } from '../crons/customers/trackLoan.js'; 

const runCronJob = async () => {
    try {
        await trackLoan();
        console.log('Cron job executed successfully.');
    } catch (error) {
        console.error('Error executing cron job:', error);
    } finally{
        process.exit();
    }
};

runCronJob();
