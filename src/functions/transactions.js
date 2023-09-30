export function formatAndSortData(dataArray) {
    // Function to convert date format to "8th Aug 2023" form
    function formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date(dateString);
      const formattedDate = date.toLocaleDateString('en-US', options);
      return formattedDate;
    }
  
    // Sort the array based on the date
    dataArray.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
  
    // Convert and update the date format in the array
    const formattedArray = dataArray.map(item => ({
      ...item,
      date: formatDate(item.date),
    }));
  
    return formattedArray;
}