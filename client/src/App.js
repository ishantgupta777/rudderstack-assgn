import "./App.css";
import AddTrackingPlanButton from "./components/AddTrackignPlan";
import TrackingPlansGrid from "./components/TrackingPlansGrid";

function App() {
  return (
    <div className="App">
      <h1>Tracking Plans</h1>
      <TrackingPlansGrid />
      <AddTrackingPlanButton />
    </div>
  );
}

export default App;
