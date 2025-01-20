import { isWeekend, addBusinessDays, isBefore, isAfter } from '../utils/dateUtils.js';

const createAssignment = (projectId, teamMemberId, startDate, endDate) => 
  Object.freeze({ projectId, teamMemberId, startDate, endDate });

const calculateEndDate = (startDate, hours) => {
  const daysNeeded = Math.ceil(hours / 8);
  return addBusinessDays(startDate, daysNeeded - 1);
};

const canScheduleProject = (project, teamMembers, startDate, assignments) => {
  const endDate = calculateEndDate(startDate, project.estimation);
  
  if (project.startAfter && isBefore(startDate, project.startAfter)) {
    return false;
  }
  
  if (project.endBefore && isAfter(endDate, project.endBefore)) {
    return false;
  }

  return project.allocatedTeamMembers.every(memberId => {
    const memberAssignments = assignments.filter(a => a.teamMemberId === memberId);
    return !memberAssignments.some(assignment => 
      !(isAfter(assignment.startDate, endDate) || isBefore(assignment.endDate, startDate))
    );
  });
};

const scheduleByResourceUtilization = (plan, projects, teamMembers) => {
  const assignments = [];
  const sortedProjects = [...projects].sort((a, b) => a.estimation - b.estimation);
  
  for (const project of sortedProjects) {
    let scheduled = false;
    let currentDate = new Date(plan.startDate);
    
    while (!scheduled && currentDate <= plan.endDate) {
      if (isWeekend(currentDate)) {
        currentDate = addBusinessDays(currentDate, 1);
        continue;
      }
      
      if (canScheduleProject(project, teamMembers, currentDate, assignments)) {
        const endDate = calculateEndDate(currentDate, project.estimation);
        project.allocatedTeamMembers.forEach(memberId => {
          assignments.push(createAssignment(project.id, memberId, currentDate, endDate));
        });
        scheduled = true;
      } else {
        currentDate = addBusinessDays(currentDate, 1);
      }
    }
    
    if (!scheduled) {
      throw new Error(`Unable to schedule project: ${project.id}`);
    }
  }
  
  return assignments;
};

const scheduleByProjectPriority = (plan, projects, teamMembers) => {
  const assignments = [];
  const sortedProjects = [...projects].sort((a, b) => b.priority - a.priority);
  
  for (const project of sortedProjects) {
    let scheduled = false;
    let currentDate = new Date(plan.startDate);
    
    while (!scheduled && currentDate <= plan.endDate) {
      if (isWeekend(currentDate)) {
        currentDate = addBusinessDays(currentDate, 1);
        continue;
      }
      
      if (canScheduleProject(project, teamMembers, currentDate, assignments)) {
        const endDate = calculateEndDate(currentDate, project.estimation);
        project.allocatedTeamMembers.forEach(memberId => {
          assignments.push(createAssignment(project.id, memberId, currentDate, endDate));
        });
        scheduled = true;
      } else {
        currentDate = addBusinessDays(currentDate, 1);
      }
    }
    
    if (!scheduled) {
      throw new Error(`Unable to schedule project: ${project.id}`);
    }
  }
  
  return assignments;
};

export { scheduleByResourceUtilization, scheduleByProjectPriority };
