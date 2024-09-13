const transactions = [
    { id: 1, agentName: 'John Doe', customerName: 'Alice Smith', collection: 1000, pendingAmount: 500, paymentMode: 'Cash' },
    { id: 2, agentName: 'Jane Doe', customerName: 'Bob Johnson', collection: 1500, pendingAmount: 0, paymentMode: 'Card' },
    { id: 3, agentName: 'Jack Doe', customerName: 'Carol Williams', collection: 750, pendingAmount: 250, paymentMode: 'UPI' },
  ];
  
  const newLoans = [
    { id: 'L001', agentName: 'John Doe', location: 'New York', customerName: 'Alice Smith', amount: 5000, address:"2 shastrinage Roorkee",mobile:9897989798 ,  date: '2024-08-27' },
    { id: 'L002', agentName: 'Jane Doe', location: 'Los Angeles', customerName: 'Bob Johnson', amount: 10000,address:"2 shastrinage Roorkee",mobile:9897989798, date: '2024-08-27' },
    { id: 'L003', agentName: 'Jack Doe', location: 'Chicago', customerName: 'Carol Williams', amount: 7500, address:"2 shastrinage Roorkee",mobile:9897989798,date: '2024-08-27' },
  ];
  
  const getTodaysTransactions = async () => transactions;
  const getNewLoans = async () => newLoans;
  
export { getTodaysTransactions,
         getNewLoans };
  