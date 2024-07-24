import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { API_URL } from "./utils";
import { fetchTasks } from "../../../api/task";
export const AddTaskForm = ({ fetchTasks }) => {
 const [newTasks, setNewTasks] = useState("");
 const addNewTask = async () => {
  try {
   await axios.post(API_URL, {
    name: newTasks,
    completed: false,
   });
   await fetchTasks();
   setNewTasks("");
  } catch (error) {
   console.log(error);
  }
 };
 return (
  <div>
   <Typography align="center" variant="h2" paddingTop={2} paddingBottom={2}>
    My Task List
   </Typography>
   <div className="addTaskForm"></div>
   <TextField
    size="small"
    label="Task"
    variant="outlined"
    value={newTasks}
    onChange={(e) => setNewTasks(e.target.value)}
   />
   <Button disabled={!newTasks.length} variant="outlined" onClick={addNewTask}>
    <AddIcon></AddIcon>
   </Button>
  </div>
 );
};
