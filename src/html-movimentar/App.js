import React from "react";
import ProgramaList from "./ProgramaList";
import "./App.css";
import DndContext from "./DndContext";

export default function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>MAESTRO POC DRAG-DROP - HTML & JAVASCRIPT</h1>
        <DndContext>
          {(programas, context) =>
            programas.map((x, indexPrograma) =>
              ProgramaList({
                ...x,
                indexPrograma,
                context,
              })
            )
          }
        </DndContext>
      </div>
    </div>
  );
}
