import { Request, Response } from "express";
import supabase from "../db/supabaseClient";

export const getPolicyAnswer = async (req: Request, res: Response) => {
  const { query } = req.query;
  // Example: Search policies table for answer
  const { data, error } = await supabase.from("policies").select("*").ilike("content", `%${query}%`);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, answer: data });
};
