import { asyncHandler } from "../../utils/asyncHandler.js";
import PDFDocument from 'pdfkit';
import { getTodaysTransactions,getNewLoans } from "../../repositories/pdf.repository.js";

const getCurrentDateTimeString = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
  };

const generateTable = (doc, headers, rows, startY, columnWidths) => {
    const tableTop = startY;
    const itemHeight = 20;
    let currentY = tableTop;
  
    // Draw table headers
    headers.forEach((header, i) => {
      doc.fontSize(12)
        .text(header, 50 + columnWidths.slice(0, i).reduce((a, b) => a + b, 0), currentY, {
          width: columnWidths[i],
          align: 'left',
        });
    });
  
    currentY += itemHeight;
  
    // Draw rows
    rows.forEach((row) => {
      Object.keys(row).forEach((key, i) => {
        doc.fontSize(10)
          .text(row[key], 50 + columnWidths.slice(0, i).reduce((a, b) => a + b, 0), currentY, {
            width: columnWidths[i],
            align: 'left',
          });
      });
      currentY += itemHeight;
    });
};
  

const generateDailyReport = asyncHandler(async(req,res,next)=>{
    try {
        const transactions = await getTodaysTransactions();
        const newLoans = await getNewLoans();
        
        const doc = new PDFDocument();

        // Set the response headers with dynamic filename
        const filename = `todays_report_${getCurrentDateTimeString()}.pdf`;
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    
        // Pipe the PDF into the response
        doc.pipe(res);
    
        // Add content to the PDF
        doc.fontSize(18).text("Today's Report", { align: 'center' });
        doc.moveDown(2);
    
        // Add new loans table
        doc.fontSize(14).text('New Loans:', { underline: true });
        const loanHeaders = ['Agent Name', 'Location', 'Customer Name', 'Address', 'MobileNo', 'Amount'];
        const loanRows = newLoans.map(loan => ({
          agentName: loan.agentName,
          location: loan.location,
          customerName: loan.customerName,
          address:loan.address,
          mobile:loan.mobile,
          amount: `Rs.${loan.amount}`
        }));
        generateTable(doc, loanHeaders, loanRows, doc.y + 10, [100, 100, 100, 100 ,100 ,100]);
    
        doc.addPage(); // Optional: move transactions table to a new page
    
        // Add transactions table
        doc.fontSize(14).text('Transactions:', { underline: true });
        const transactionHeaders = ['Agent Name', 'Customer Name', 'Amount Collected', 'Pending Amount', 'Payment Mode'];
        const transactionRows = transactions.map(transaction => ({
          agentName: transaction.agentName,
          customerName: transaction.customerName,
          amountCollected: `Rs.${transaction.collection}`,
          pendingAmount: `Rs.${transaction.pendingAmount}`,
          paymentMode: transaction.paymentMode
        }));
        generateTable(doc, transactionHeaders, transactionRows, doc.y + 10, [100, 100, 120, 120, 100]);
    
        // Finalize the PDF and end the stream
        doc.end();

    
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ error: 'Failed to generate PDF' });
    }
})

export {generateDailyReport}