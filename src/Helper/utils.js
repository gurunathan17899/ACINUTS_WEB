export function convertToCustomDateFormat(dateString) {
  const date = new Date(dateString);
  
  const year = date.getFullYear();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  
  return `${day} ${month} ${year}`;
}


export function getFutureDateInCustomFormat(daysToAdd = 4) {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + daysToAdd);

  const day = currentDate.getDate();
  const monthNames = [
    'Jan', 'Feb', 'March', 'April', 'May', 'June',
    'July', 'August', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const month = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  return `${day} ${month} ${year}`;
}
