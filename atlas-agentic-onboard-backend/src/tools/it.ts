import { Request, Response } from "express";
import supabase from "../db/supabaseClient";

export const submitITEquipmentRequest = async (req: Request, res: Response) => {
  const { employeeId, items } = req.body;
  const { data, error } = await supabase.from("it_requests").insert([
    { employee_id: employeeId, equipment: items }
  ]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, request: data[0] });
};
