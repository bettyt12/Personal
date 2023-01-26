// Dependencies
import React from "react";
import CarList from "./Cars";

// Styles
import "./tailwind.output.css";

const App = () => {
  return (
    <div className="min-h-screen bg-grey-100">
      <CarList />
    </div>
  );
};

export default App;
