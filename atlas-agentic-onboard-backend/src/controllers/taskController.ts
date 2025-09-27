
import supabase from '../db/supabaseClient';
import { Request, Response } from 'express';

// Get all tasks (placeholder)
export const getTasks = (req: Request, res: Response) => {
  res.json({ message: 'List of tasks' });
};

// Create onboarding task
export const createTask = async (req: Request, res: Response) => {
  try {
    const { employee_id, title, status, due_date } = req.body;
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ employee_id, title, status, due_date }])
      .select();
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    res.status(201).json({ task: data[0] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};