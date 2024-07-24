import express from "express";
import { fetchTasks, createTasks, updateTasks, deleteTasks } from "./task";
import serverless from "serverless-http";
import cors from "cors";
const app = express();
const port = 3001;

// Grap response in JSON
app.use(express.json());

if (process.env.DEVELOPMENT) {
 app.use(cors());
}

app.get("/task", async (req, res) => {
 try {
  const tasks = await fetchTasks();
  res.send(task.Items);
 } catch (error) {
  res.status(400).send(`Error fetching tasks: ${error}`);
 }
});

app.post("/task", async (req, res) => {
 try {
  const task = req.body;
  const response = await createTasks(task);
  res.send(response);
 } catch (error) {
  res.status(400).send(`Error creating task: ${error}`);
 }
});

app.put("/task", async (req, res) => {
 try {
  const task = req.body;
  const response = await updateTasks(task);
  res.send(response);
 } catch (error) {
  res.status(400).send(`Error updating task: ${error}`);
 }
});

app.delete(`/task/:id`, async (req, res) => {
 try {
  const { id } = req.params;
  const response = await deleteTasks(id);
  res.send(response);
 } catch (error) {
  res.status(400).send(`Error deleting task: ${error}`);
 }
});

// Run locally -> app.listen
if (process.env.DEVELOPMENT) {
 app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
 });
}

// Delop -> using serverless services
export const handler = serverless(app);
