import { Request, Response } from "express";
import supabase from "../db/supabaseClient";

export const sendWelcomeEmail = async (req: Request, res: Response) => {
  const { id } = req.params;
  // integrate with email service
  await supabase.from("employees").update({ status: "welcome_sent" }).eq("id", id);
  res.json({ success: true, message: `Welcome email sent to employee ${id}` });
};

export const assignBuddyEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { buddyId } = req.body;
  const { error } = await supabase.from("employees").update({ buddy_id: buddyId }).eq("id", id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, message: `Buddy ${buddyId} assigned to employee ${id}` });
};
