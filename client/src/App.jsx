import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import CollectionCenter from "./components/CollectionCenter";
import Warehouse from "./components/Warehouse";

function App() {
  return (
    <>
      <CollectionCenter />
      <Warehouse />
    </>
  );
}

export default App;
