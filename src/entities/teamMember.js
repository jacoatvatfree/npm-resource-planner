const createTeamMember = ({ id, name, weeklyAvailability, planId }) => {
  if (!id || typeof id !== 'string') {
    throw new Error('Team member must have a valid string id');
  }
  if (!name || typeof name !== 'string') {
    throw new Error('Team member must have a valid string name');
  }
  if (!Number.isFinite(weeklyAvailability) || weeklyAvailability <= 0) {
    throw new Error('Weekly availability must be a positive number');
  }
  if (!planId || typeof planId !== 'string') {
    throw new Error('Team member must belong to a valid plan');
  }

  return Object.freeze({
    id,
    name,
    weeklyAvailability,
    planId
  });
};

export { createTeamMember };
