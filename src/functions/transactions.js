export function formatAndSortData(dataArray) {
  // Function to convert date format to "8th Aug 2023" form
  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  // Sort the array based on the date
  dataArray.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  // Convert and update the date format in the array
  const formattedArray = dataArray.map((item) => ({
    ...item,
    date: formatDate(item.date),
  }));

  return formattedArray;
}

export function convertToTransactionsObject(formData, user) {
  // Get the receiver's name from user.contacts using the recipient ID
  const receiverContact = user.contacts.find(
    (contact) => contact.id === formData.recipient
  );
  const receiverName = receiverContact ? receiverContact.name : "Unknown";

  // Get the current date and time and format it with a "T" between date and time
  const currentDate = new Date()
    .toISOString()
    .replace(/ /, "T")
    .replace(/\..+/, "");

  // Create the transaction object without the "id" field
  const transaction = {
    from: user.name,
    from_id: user.id,
    to: receiverName,
    to_id: formData.recipient,
    amount: +formData.amount,
    message: formData.message,
    date: currentDate,
  };

  return transaction;
}

export function getSenderAndReceiver(transObj, sender, receiver) {
  // Deduct the amount from the sender's balance
  sender.balance = parseFloat(sender.balance) - parseFloat(transObj.amount);

  // Add the transaction ID to the sender's transactions array
  sender.transactions.push(transObj.id);

  // Calculate the current date in the required format
  const currentDate = new Date().toISOString();

  // Create a notification for the sender
  const senderNotification = {
    id:
      sender.notifications.length > 0
        ? sender.notifications[sender.notifications.length - 1].id + 1
        : 1,
    transaction_id: transObj.id,
    from: sender.name,
    to: receiver.name,
    amount: -parseFloat(transObj.amount), // Ensure amount is treated as a number
    message: `Payment sent to ${receiver.name}`,
    date: currentDate,
  };

  // Add the sender's notification to their notifications array
  sender.notifications.push(senderNotification);

  // Increase the receiver's balance
  receiver.balance = parseFloat(receiver.balance) + parseFloat(transObj.amount);

  // Add the transaction ID to the receiver's transactions array
  receiver.transactions.push(transObj.id);

  // Calculate the current month (YYYY-MM)
  const currentMonth = new Date().toISOString().slice(0, 7);

  // Update the monthly expenses for both sender and receiver
  const senderMonthlyExpensesIndex = sender.monthlyIncomeExpenses.findIndex(
    (entry) => entry.month === currentMonth
  );

  if (senderMonthlyExpensesIndex === -1) {
    // If the current month is not found for sender, create a new entry with expenses
    sender.monthlyIncomeExpenses.unshift({
      month: currentMonth,
      income: 0,
      expenses: parseFloat(transObj.amount), // Ensure expenses is treated as a number
    });
  } else {
    // If the current month is found, update the expenses
    sender.monthlyIncomeExpenses[senderMonthlyExpensesIndex].expenses +=
      parseFloat(transObj.amount);
  }

  const receiverMonthlyExpensesIndex = receiver.monthlyIncomeExpenses.findIndex(
    (entry) => entry.month === currentMonth
  );

  if (receiverMonthlyExpensesIndex === -1) {
    // If the current month is not found for receiver, create a new entry with income
    receiver.monthlyIncomeExpenses.unshift({
      month: currentMonth,
      income: parseFloat(transObj.amount), // Ensure income is treated as a number
      expenses: 0,
    });
  } else {
    // If the current month is found, update the income
    receiver.monthlyIncomeExpenses[receiverMonthlyExpensesIndex].income +=
      parseFloat(transObj.amount);
  }

  // Create a notification for the receiver
  const receiverNotification = {
    id:
      receiver.notifications.length > 0
        ? receiver.notifications[receiver.notifications.length - 1].id + 1
        : 1,
    transaction_id: transObj.id,
    from: sender.name,
    to: receiver.name,
    amount: parseFloat(transObj.amount), // Ensure amount is treated as a number
    message: transObj.message,
    date: currentDate,
  };

  // Add the receiver's notification to their notifications array
  receiver.notifications.push(receiverNotification);

  //
  let updatedSwiftCoin = Math.floor((parseInt(transObj.amount) / 100) * 10);
  sender.swiftCoin += updatedSwiftCoin;

  // Return the updated sender and receiver objects in an array
  return [sender, receiver];
}
