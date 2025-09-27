import { Request, Response } from "express";
import supabase from "../db/supabaseClient";

export const assignTrainingModule = async (req: Request, res: Response) => {
  const { employeeId, moduleId } = req.body;
  const { data, error } = await supabase.from("training").insert([
    { employee_id: employeeId, module_name: moduleId }
  ]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, training: data[0] });
};

export const checkTrainingProgress = async (req: Request, res: Response) => {
  const { employeeId } = req.params;
  const { data, error } = await supabase.from("training").select("*").eq("employee_id", employeeId);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, progress: data });
};
