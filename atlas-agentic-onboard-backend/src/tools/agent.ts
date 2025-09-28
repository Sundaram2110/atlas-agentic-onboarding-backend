import axios from "axios";
import { Request, Response } from "express";
import supabase from '../db/supabaseClient';

export const getAgents = async (req: Request, res: Response) => {
  try {
    console.log("Fetching agents");
    const { data, error } = await supabase
      .from('agents')
      .select('id, name, description, model, state, created_at, updated_at');
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
      .insert({ name, model, description, state: 'idle' })
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
    const { name, model, description, state } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Agent ID is required" });
    }

    const { data, error } = await supabase
      .from('agents')
      .update({ name, model, description, state })
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

    // Set state to running (assuming there's an agent ID, but chat is general, wait, chat is POST /chat, not per agent
    // Wait, the route is router.post("/chat", chatWithAgent); so no id, it's general chat.
    // Perhaps no state change for chat, or assume all agents are affected? But that doesn't make sense.
    // Perhaps chat is for a specific agent, but the route doesn't have :id.
    // Looking back, it's POST /chat, and body has prompt, context.
    // Perhaps it's not per agent, it's a general agent.
    // To make state work, perhaps skip state for chat, or add id to body.
    // For now, since the user is about agents list showing idle, and delete, perhaps the state is for the agents list.
    // So, for chat, maybe no change, keep idle.
    // But to make it functional, perhaps when chatting, set a global state or something, but that's not.
    // Perhaps the agents have states, and chat is separate.
    // I think for now, leave chat as is, no state change.
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

    // Update state in DB to idle
    const { error: updateError } = await supabase
      .from('agents')
      .update({ state: 'idle' })
      .eq('id', id);

    if (updateError) {
      console.error("Error updating agent state:", updateError);
    }

    res.json(agentRes.data);
  } catch (error) {
    console.error("Error in stopAgent:", error);
    res.status(500).json({ error: "Agent stop failed" });
  }
};

export const startAgent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("Starting agent:", id);
    const pythonAgentUrl = "http://localhost:8000/agent/start";
    const agentRes = await axios.post(pythonAgentUrl, { agentId: id });

    // Update state in DB to running
    const { error: updateError } = await supabase
      .from('agents')
      .update({ state: 'running' })
      .eq('id', id);

    if (updateError) {
      console.error("Error updating agent state:", updateError);
    }

    res.json(agentRes.data);
  } catch (error) {
    console.error("Error in startAgent:", error);
    res.status(500).json({ error: "Agent start failed" });
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
