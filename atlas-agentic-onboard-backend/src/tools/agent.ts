import axios from "axios";
import { Request, Response } from "express";
import supabase from '../db/supabaseClient';

export const getAgents = async (req: Request, res: Response) => {
  try {
    console.log("Fetching agents");
    const { data, error } = await supabase
      .from('agents')
      .select('*');
    if (error) {
      console.error("Error fetching agents:", error);
      return res.status(500).json({ error: "Failed to fetch agents" });
    }
    res.json({ agents: data });
  } catch (error) {
    console.error("Error in getAgents:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createAgent = async (req: Request, res: Response) => {
  try {
    const { name, model, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const { data, error } = await supabase
      .from('agents')
      .insert({ name, model, description })
      .select();

    if (error) {
      console.error("Error creating agent:", error);
      return res.status(500).json({ error: "Failed to create agent" });
    }

    res.status(201).json({ agent: data[0], message: "Agent created" });
  } catch (error) {
    console.error("Error in createAgent:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateAgent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, model, description } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Agent ID is required" });
    }

    const { data, error } = await supabase
      .from('agents')
      .update({ name, model, description })
      .eq('id', id)
      .select();

    if (error) {
      console.error("Error updating agent:", error);
      return res.status(500).json({ error: "Failed to update agent" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "Agent not found" });
    }

    res.json({ agent: data[0], message: "Agent updated" });
  } catch (error) {
    console.error("Error in updateAgent:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const chatWithAgent = async (req: Request, res: Response) => {
  try {
    // Accept either 'prompt' or 'message'
    const prompt = req.body.prompt || req.body.message;
    const context = req.body.context || {};
    console.log("Sending to Python agent:", { prompt, context });
    const pythonAgentUrl = "http://localhost:8000/agent/respond";
    const agentRes = await axios.post(pythonAgentUrl, { prompt, context });
    res.json(agentRes.data);
  } catch (error) {
    console.error("Error in chatWithAgent:", error);
    res.status(500).json({ error: "Agent chat failed" });
  }
};

export const stopAgent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("Stopping agent:", id);
    const pythonAgentUrl = "http://localhost:8000/agent/stop";
    const agentRes = await axios.post(pythonAgentUrl, { agentId: id });
    res.json(agentRes.data);
  } catch (error) {
    console.error("Error in stopAgent:", error);
    res.status(500).json({ error: "Agent stop failed" });
  }
};

export const deleteAgent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Agent ID is required" });
    }

    const { data, error } = await supabase
      .from('agents')
      .delete()
      .eq('id', id)
      .select();

    if (error) {
      console.error("Error deleting agent:", error);
      return res.status(500).json({ error: "Failed to delete agent" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "Agent not found" });
    }

    res.json({ message: "Agent deleted successfully" });
  } catch (error) {
    console.error("Error in deleteAgent:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
