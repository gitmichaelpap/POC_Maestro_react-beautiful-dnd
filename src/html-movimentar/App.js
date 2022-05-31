import React, { useState } from "react";
import Emissora from "./req_hom_14-03-2022_RED.json";
import "./App.css";

const Programas = JSON.parse(JSON.stringify(Emissora));

export default function App() {
  const [programas, updateProgramas] = useState(Programas.Programas);

  function onDragStart(event) {
    console.log("onDragStart", event);

    event.dataTransfer.setData("text/plain", event.target.id);

    event.currentTarget.style.backgroundColor = "yellow";
  }

  function onDragOver(event) {
    console.log("onDragOver", event);
    event.preventDefault();
  }

  function onDrop(event) {
    console.log("onDrop", event);
    const id = event.dataTransfer.getData("text");

    const draggableElement = document.getElementById(id);
    const dropzone = event.target;
    dropzone.appendChild(draggableElement);

    event.dataTransfer.clearData();
  }

  return (
    <div className="example-parent">
      <div className="example-origin">
        To-do
        <div
          id="draggable-1"
          className="example-draggable"
          draggable={true}
          onDragStart={(event) => onDragStart(event)}
        >
          thing 1
        </div>
        <div
          id="draggable-2"
          className="example-draggable"
          draggable={true}
          onDragStart={(event) => onDragStart(event)}
        >
          thing 2
        </div>
        <div
          id="draggable-3"
          className="example-draggable"
          draggable={true}
          onDragStart={(event) => onDragStart(event)}
        >
          thing 3
        </div>
        <div
          id="draggable-4"
          className="example-draggable"
          draggable={true}
          onDragStart={(event) => onDragStart(event)}
        >
          thing 4
        </div>
      </div>

      <div
        className="example-dropzone"
        onDragOver={(event) => onDragOver(event)}
        onDrop={(event) => onDrop(event)}
      >
        Done
      </div>
    </div>
  );
}
