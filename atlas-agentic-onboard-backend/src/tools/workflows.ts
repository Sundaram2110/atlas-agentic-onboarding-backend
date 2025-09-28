import { Request, Response } from "express";
import supabase from '../db/supabaseClient';

export const getWorkflows = async (req: Request, res: Response) => {
  try {
    console.log("Fetching workflows");
    const { data, error } = await supabase
      .from('workflows')
      .select('*');
    if (error) {
      console.error("Error fetching workflows:", error);
      return res.status(500).json({ error: "Failed to fetch workflows" });
    }
    res.json({ workflows: data });
  } catch (error) {
    console.error("Error in getWorkflows:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
