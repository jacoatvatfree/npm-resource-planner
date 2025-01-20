const createProject = ({
  id,
  name,
  description,
  priority,
  estimation,
  allocatedTeamMembers,
  startAfter,
  endBefore,
  planId
}) => {
  if (!id || typeof id !== 'string') {
    throw new Error('Project must have a valid string id');
  }
  if (!name || typeof name !== 'string') {
    throw new Error('Project must have a valid string name');
  }
  if (!description || typeof description !== 'string') {
    throw new Error('Project must have a valid string description');
  }
  if (!Number.isFinite(priority) || priority < 0) {
    throw new Error('Priority must be a non-negative number');
  }
  if (!Number.isFinite(estimation) || estimation <= 0) {
    throw new Error('Estimation must be a positive number');
  }
  if (!Array.isArray(allocatedTeamMembers) || allocatedTeamMembers.length === 0) {
    throw new Error('Project must have at least one team member');
  }
  if (startAfter && !(startAfter instanceof Date)) {
    throw new Error('startAfter must be a valid date');
  }
  if (endBefore && !(endBefore instanceof Date)) {
    throw new Error('endBefore must be a valid date');
  }
  if (startAfter && endBefore && endBefore <= startAfter) {
    throw new Error('endBefore must be after startAfter');
  }
  if (!planId || typeof planId !== 'string') {
    throw new Error('Project must belong to a valid plan');
  }

  return Object.freeze({
    id,
    name,
    description,
    priority,
    estimation,
    allocatedTeamMembers,
    startAfter,
    endBefore,
    planId
  });
};

export { createProject };
