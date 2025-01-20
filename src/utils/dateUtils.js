const isWeekend = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

const addBusinessDays = (date, days) => {
  const result = new Date(date);
  let addedDays = 0;
  
  while (addedDays < days) {
    result.setDate(result.getDate() + 1);
    if (!isWeekend(result)) {
      addedDays++;
    }
  }
  
  return result;
};

const isBefore = (date1, date2) => date1 < date2;
const isAfter = (date1, date2) => date1 > date2;

export { isWeekend, addBusinessDays, isBefore, isAfter };
