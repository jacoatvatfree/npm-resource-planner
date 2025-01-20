import { expect, test } from 'vitest';
import { createPlan } from '../src/entities/plan.js';
import { createTeamMember } from '../src/entities/teamMember.js';
import { createProject } from '../src/entities/project.js';
import { 
  scheduleByResourceUtilization,
  scheduleByProjectPriority 
} from '../src/services/scheduler.js';

test('Schedule by resource utilization', () => {
  const plan = createPlan({
    id: 'plan1',
    name: 'Test Plan',
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-12-31')
  });

  const member1 = createTeamMember({
    id: 'tm1',
    name: 'John Doe',
    weeklyAvailability: 40,
    planId: 'plan1'
  });

  const projects = [
    createProject({
      id: 'proj1',
      name: 'Project 1',
      description: 'Test Project 1',
      priority: 1,
      estimation: 16,
      allocatedTeamMembers: ['tm1'],
      planId: 'plan1'
    }),
    createProject({
      id: 'proj2',
      name: 'Project 2',
      description: 'Test Project 2',
      priority: 2,
      estimation: 8,
      allocatedTeamMembers: ['tm1'],
      planId: 'plan1'
    })
  ];

  const assignments = scheduleByResourceUtilization(plan, projects, [member1]);
  expect(assignments).toHaveLength(2);
  expect(assignments[0].projectId).toBe('proj2');
  expect(assignments[1].projectId).toBe('proj1');
});

test('Schedule by project priority', () => {
  const plan = createPlan({
    id: 'plan1',
    name: 'Test Plan',
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-12-31')
  });

  const member1 = createTeamMember({
    id: 'tm1',
    name: 'John Doe',
    weeklyAvailability: 40,
    planId: 'plan1'
  });

  const projects = [
    createProject({
      id: 'proj1',
      name: 'Project 1',
      description: 'Test Project 1',
      priority: 1,
      estimation: 16,
      allocatedTeamMembers: ['tm1'],
      planId: 'plan1'
    }),
    createProject({
      id: 'proj2',
      name: 'Project 2',
      description: 'Test Project 2',
      priority: 2,
      estimation: 8,
      allocatedTeamMembers: ['tm1'],
      planId: 'plan1'
    })
  ];

  const assignments = scheduleByProjectPriority(plan, projects, [member1]);
  expect(assignments).toHaveLength(2);
  expect(assignments[0].projectId).toBe('proj2');
  expect(assignments[1].projectId).toBe('proj1');
});
