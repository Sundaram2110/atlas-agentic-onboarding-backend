import supabase from './src/db/supabaseClient';

/**
 * Seed Employees + Tasks
 */
async function seedEmployee() {
  const { data, error } = await supabase
    .from('employees')
    .insert([
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        start_date: '2025-09-15',
        status: 'pending'
      }
    ])
    .select();

  if (error) {
    console.error('❌ Error seeding employee:', error.message);
    return null;
  }
  console.log('✅ Seeded employee:', data[0]);
  return data[0];
}

async function seedTask(employeeId: string) {
  const { data, error } = await supabase
    .from('tasks')
    .insert([
      {
        employee_id: employeeId,
        title: 'Complete onboarding paperwork',
        status: 'pending',
        due_date: '2025-09-20'
      }
    ])
    .select();

  if (error) {
    console.error('❌ Error seeding task:', error.message);
    return null;
  }
  console.log('✅ Seeded task:', data[0]);
  return data[0];
}

/**
 * Seed Agentic AI Data
 */
async function seedAgent() {
  const { data, error } = await supabase
    .from('agents')
    .insert([
      {
        name: 'Onboarding Assistant',
        description: 'Handles employee onboarding workflows and tasks'
      }
    ])
    .select();

  if (error) {
    console.error('❌ Error seeding agent:', error.message);
    return null;
  }
  console.log('✅ Seeded agent:', data[0]);
  return data[0];
}

async function seedWorkflow(agentId: string) {
  const { data, error } = await supabase
    .from('workflows')
    .insert([
      {
        agent_id: agentId,
        name: 'Employee Onboarding Workflow',
        steps: [
          { step: 'Create account', action: 'accounts/create' },
          { step: 'Assign buddy', action: 'employees/:id/buddy' },
          { step: 'Schedule orientation', action: 'meetings/orientation' }
        ]
      }
    ])
    .select();

  if (error) {
    console.error('❌ Error seeding workflow:', error.message);
    return null;
  }
  console.log('✅ Seeded workflow:', data[0]);
  return data[0];
}

async function seedLog(agentId: string, workflowId: string) {
  const { data, error } = await supabase
    .from('logs')
    .insert([
      {
        agent_id: agentId,
        workflow_id: workflowId,
        message: 'Workflow started for onboarding employee',
        level: 'info',
        metadata: { triggered_by: 'system' }
      }
    ])
    .select();

  if (error) {
    console.error('❌ Error seeding log:', error.message);
    return null;
  }
  console.log('✅ Seeded log:', data[0]);
  return data[0];
}

async function seedMemory(agentId: string) {
  const { data, error } = await supabase
    .from('memory')
    .insert([
      {
        agent_id: agentId,
        key: 'last_onboarding_employee',
        value: { name: 'John Doe', status: 'pending' }
      }
    ])
    .select();

  if (error) {
    console.error('❌ Error seeding memory:', error.message);
    return null;
  }
  console.log('✅ Seeded memory:', data[0]);
  return data[0];
}

/**
 * Run seeding
 */
async function main() {
  // Seed employee + task
  const employee = await seedEmployee();
  if (employee) {
    await seedTask(employee.id);
  }

  // Seed agentic AI
  const agent = await seedAgent();
  if (agent) {
    const workflow = await seedWorkflow(agent.id);
    if (workflow) {
      await seedLog(agent.id, workflow.id);
    }
    await seedMemory(agent.id);
  }
}

main().catch((err) => console.error('Unhandled error:', err));
