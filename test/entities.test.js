import { expect, test } from 'vitest';
import { createPlan } from '../src/entities/plan.js';
import { createTeamMember } from '../src/entities/teamMember.js';
import { createProject } from '../src/entities/project.js';

test('Plan creation', () => {
  const plan = createPlan({
    id: 'plan1',
    name: 'Test Plan',
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-12-31')
  });
  
  expect(plan.id).toBe('plan1');
  expect(plan.name).toBe('Test Plan');
  expect(plan.startDate).toBeInstanceOf(Date);
  expect(plan.endDate).toBeInstanceOf(Date);
});

test('Team member creation', () => {
  const member = createTeamMember({
    id: 'tm1',
    name: 'John Doe',
    weeklyAvailability: 40,
    planId: 'plan1'
  });
  
  expect(member.id).toBe('tm1');
  expect(member.name).toBe('John Doe');
  expect(member.weeklyAvailability).toBe(40);
  expect(member.planId).toBe('plan1');
});

test('Project creation', () => {
  const project = createProject({
    id: 'proj1',
    name: 'Test Project',
    description: 'Test Description',
    priority: 1,
    estimation: 80,
    allocatedTeamMembers: ['tm1'],
    planId: 'plan1'
  });
  
  expect(project.id).toBe('proj1');
  expect(project.name).toBe('Test Project');
  expect(project.priority).toBe(1);
  expect(project.estimation).toBe(80);
  expect(project.allocatedTeamMembers).toEqual(['tm1']);
});
