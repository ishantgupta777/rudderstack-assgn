import { Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../constants";
import TrackingPlanCard from "./TrackingPlanCard";

const TrackingPlansGrid = () => {
  const [trackingPlans, setTrackingPlans] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(`${BASE_URL}/tracking-plans`);
      setTrackingPlans(res?.data?.data);
    })();
  }, []);

  return (
    <div>
      <Grid container spacing={2} style={{ padding: "16px" }}>
        {trackingPlans.map((trackingPlan) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={trackingPlan.id}>
            <TrackingPlanCard trackingPlan={trackingPlan} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TrackingPlansGrid;
