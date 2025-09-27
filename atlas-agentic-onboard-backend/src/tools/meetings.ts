import { Request, Response } from "express";
import supabase from "../db/supabaseClient";

export const scheduleOrientationMeeting = async (req: Request, res: Response) => {
  try {
    const { employeeId, time } = req.body;
    const { data, error } = await supabase.from("meetings").insert([
      {
        employee_id: employeeId,
        type: "orientation",
        scheduled_at: time,
      },
    ]).select();
    if (error) throw error;
    res.json({ success: true, meeting: data[0] });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const scheduleMeetingWithManager = async (req: Request, res: Response) => {
  try {
    const { employeeId, managerId, time } = req.body;
    const { data, error } = await supabase.from("meetings").insert([
      {
        employee_id: employeeId,
        type: "manager",
        scheduled_at: time,
        manager_id: managerId,
      },
    ]).select();
    if (error) throw error;
    res.json({ success: true, meeting: data[0] });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
