import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import React from "react";

const Event = ({ event }) => {
  return (
    <Grid item key={event.id}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="subtitle1">Name: {event.name}</Typography>
          <Typography variant="subtitle1">
            Description: {event.description}
          </Typography>
          <Typography variant="subtitle1">
            Rules: {JSON.stringify(event.rules)}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Event;
