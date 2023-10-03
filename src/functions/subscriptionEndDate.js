function subscriptionEndDate (billingCycle) {
    const currentDate = new Date();

    // Set the initial end date to the current date
    let endDate = new Date(currentDate);

    // Calculate the end date based on the billing cycle
    switch (billingCycle) {
        case "Monthly":
        endDate.setMonth(endDate.getMonth() + 1);
        break;
        case "Quarterly":
        endDate.setMonth(endDate.getMonth() + 3);
        break;
        case "Yearly":
        endDate.setFullYear(endDate.getFullYear() + 1);
        break;
        default:
        // Handle invalid billing cycle
        return "Invalid billing cycle";
    }

    // Format the end date as "YYYY-MM-DD"
    const formattedEndDate = endDate.toISOString().split("T")[0];

    return formattedEndDate;
}

export default subscriptionEndDate;