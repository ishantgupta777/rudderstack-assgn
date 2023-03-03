import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../constants";

const AddTrackingPlanForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [events, setEvents] = useState([]);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleNameChange = (event) => {
    setName(event.target.value);
    if (event?.target?.value) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAddEvent = () => {
    const newEvent = { name: "", description: "", rules: "" };
    setEvents([...events, newEvent]);
  };

  const handleEventNameChange = (eventIndex, event) => {
    const newEvents = [...events];
    newEvents[eventIndex].name = event.target.value;
    setEvents(newEvents);
  };

  const handleEventDescriptionChange = (eventIndex, event) => {
    const newEvents = [...events];
    newEvents[eventIndex].description = event.target.value;
    setEvents(newEvents);
  };

  const handleEventRulesChange = (eventIndex, event) => {
    const newEvents = [...events];
    newEvents[eventIndex].rules = event.target.value;
    setEvents(newEvents);
  };

  const handleSubmit = async () => {
    try {
      if (!name) return;
      console.log("final data ", name, description, events);
      const data = {
        tracking_plan: {
          display_name: name,
          description,
          rules: {
            events,
          },
        },
      };

      const res = await axios.post(`${BASE_URL}/tracking-plans/`, data);
      console.log("added data ", res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{}}>
      <TextField label="Name" value={name} onChange={handleNameChange} />
      <br />
      <TextField
        label="Description"
        value={description}
        onChange={handleDescriptionChange}
      />
      <br />
      <br />
      <Button variant="contained" color="primary" onClick={handleAddEvent}>
        Add Event
      </Button>
      <br />
      <br />
      {events.map((event, index) => (
        <div key={index}>
          <TextField
            label="Name"
            value={event.name}
            onChange={(event) => handleEventNameChange(index, event)}
          />
          <br />
          <TextField
            label="Description"
            value={event.description}
            onChange={(event) => handleEventDescriptionChange(index, event)}
          />
          <br />
          <TextField
            label="Rules"
            value={event.rules}
            onChange={(event) => handleEventRulesChange(index, event)}
          />
          <br />
          <br />
        </div>
      ))}
      <Button
        disabled={submitDisabled}
        variant="contained"
        color="secondary"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default AddTrackingPlanForm;
