import { Request, Response } from "express";
import  supabase  from "../db/supabaseClient";

export const uploadEmployeeDocuments = async (req: Request, res: Response) => {
  try {
    const { employeeId, documents } = req.body;
    const { error } = await supabase.from("documents").insert(
      documents.map((doc: any) => ({
        employee_id: employeeId,
        name: doc.name,
        url: doc.url,
        type: doc.type,
      }))
    );
    if (error) throw error;
    res.json({ success: true, message: "Documents uploaded" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const checkDocumentStatus = async (req: Request, res: Response) => {
  try {
    const { employeeId } = req.params;
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("employee_id", employeeId);
    if (error) throw error;
    res.json({ success: true, documents: data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
