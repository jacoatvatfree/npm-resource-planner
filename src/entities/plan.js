const createPlan = ({ id, name, startDate, endDate }) => {
  if (!id || typeof id !== 'string') {
    throw new Error('Plan must have a valid string id');
  }
  if (!name || typeof name !== 'string') {
    throw new Error('Plan must have a valid string name');
  }
  if (!(startDate instanceof Date) || isNaN(startDate)) {
    throw new Error('Plan must have a valid start date');
  }
  if (!(endDate instanceof Date) || isNaN(endDate)) {
    throw new Error('Plan must have a valid end date');
  }
  if (endDate <= startDate) {
    throw new Error('End date must be after start date');
  }

  return Object.freeze({
    id,
    name,
    startDate,
    endDate
  });
};

export { createPlan };
