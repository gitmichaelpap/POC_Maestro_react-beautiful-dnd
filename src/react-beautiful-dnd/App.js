import React from "react";
import { DndContext } from "./Components/Dnd";
import { ProgramaList } from "./Model";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>MAESTRO POC DRAG-DROP - react-beautiful-dnd</h1>

        <DndContext>
          {(programas, context) =>
            programas.map((programa, indexPrograma) =>
              ProgramaList({ ...programa, context, indexPrograma })
            )
          }
        </DndContext>
      </div>
    </div>
  );
}
