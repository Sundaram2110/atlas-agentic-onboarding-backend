import { Request, Response } from "express";
import supabase from "../db/supabaseClient";

export const createUserAccount = async (req: Request, res: Response) => {
  try {
    const { employeeId, accountType } = req.body;
    if (!employeeId || !accountType) throw new Error("Missing employeeId or accountType");
    const { data, error } = await supabase.from("accounts").insert([
      { employee_id: employeeId, account_type: accountType }
    ]).select();
    if (error) throw error;
    res.json({ success: true, account: data[0] });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
