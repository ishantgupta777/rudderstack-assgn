import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import React from "react";
import Event from "./Event";

const TrackingPlanCard = ({ trackingPlan = {} }) => {
  return (
    <Grid item xs={12} sm={12} md={12} lg={12} style={{}}>
      <Card variant="outlined">
        <CardContent>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h5">Tracking Plan</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                Name: {trackingPlan?.display_name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                Description: {trackingPlan?.description}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">Events</Typography>
            </Grid>
            {trackingPlan.events.map((event) => (
              <Event event={event} />
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TrackingPlanCard;
