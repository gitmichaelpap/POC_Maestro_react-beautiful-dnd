import React, { useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Emissora from "../req_hom_14-03-2022_RED.json";
import "./App.css";

const Programas = JSON.parse(JSON.stringify(Emissora));

export default function App() {
  const [programas, updateProgramas] = useState(Programas.Programas);

  const handleonBeforeCapture = (BeforeCapture) => {
    console.log("BeforeCapture", BeforeCapture);
  };

  const handleonBeforeDragStart = (BeforeDragStart) => {
    console.log("BeforeDragStart", BeforeDragStart);
  };

  const handleonDragStart = (DragStart) => {
    console.log("DragStart", DragStart);
  };

  const handleonDragUpdate = (DragUpdate) => {
    console.log("DragUpdate", DragUpdate);
  };

  const handleonDragEnd = (DragEnd) => {
    console.log("DragEnd", DragEnd);
    if (!DragEnd.destination) return;

    const items = Array.from(programas);
    const source = DragEnd.source.droppableId.split(".");
    const destination = DragEnd.destination.droppableId.split(".");

    const [reorderedItem] = items[parseInt(source[0])].Segmentos[
      parseInt(source[1])
    ].Eventos.splice(DragEnd.source.index, 1);

    items[parseInt(destination[0])].Segmentos[
      parseInt(destination[1])
    ].Eventos.splice(DragEnd.destination.index, 0, reorderedItem);

    updateProgramas(items);
  };

  const accordionEventos = (
    evento,
    indexEvento,
    indexsegmento,
    indexPrograma,
    innerRef,
    draggableProps,
    dragHandleProps
  ) => {
    return (
      <Card
        key={indexEvento}
        eventkey={indexEvento}
        ref={innerRef}
        {...draggableProps}
        {...dragHandleProps}
      >
        <Card.Body>{evento?.Titulo}</Card.Body>
      </Card>
    );
  };

  const accordionsegmentos = (segmento, indexsegmento, indexPrograma) => {
    return (
      <Accordion key={indexsegmento} eventkey={indexsegmento}>
        <Accordion.Item eventkey={indexsegmento}>
          <Accordion.Header>
            <strong>{segmento?.Apresenta}</strong>
          </Accordion.Header>
          <Accordion.Body>
            {segmento?.Eventos?.map((evento, indexEvento) => (
              <Draggable
                draggableId={`${indexPrograma}.${indexsegmento}`}
                index={indexEvento}
              >
                {(provided) =>
                  accordionEventos(
                    evento,
                    indexEvento,
                    indexsegmento,
                    indexPrograma,
                    provided.innerRef,
                    provided.draggableProps,
                    provided.dragHandleProps
                  )
                }
              </Draggable>
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const accordionProgramas = (programa, indexPrograma) => {
    return (
      <Accordion key={indexPrograma} eventkey={indexPrograma}>
        <Accordion.Item eventkey={indexPrograma}>
          <Accordion.Header>
            <strong>{programa?.Nome}</strong>
          </Accordion.Header>
          <Accordion.Body>
            {programa?.Segmentos?.map((segmento, indexsegmento) => (
              <Droppable droppableId={`${indexPrograma}.${indexsegmento}`}>
                {(provided) => (
                  <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {accordionsegmentos(segmento, indexsegmento, indexPrograma)}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>MAESTRO POC DRAG-DROP</h1>

        <DragDropContext
          onBeforeCapture={handleonBeforeCapture}
          onBeforeDragStart={handleonBeforeDragStart}
          onDragStart={handleonDragStart}
          onDragUpdate={handleonDragUpdate}
          onDragEnd={handleonDragEnd}
        >
          {programas.map((programa, indexPrograma) =>
            accordionProgramas(programa, indexPrograma)
          )}
        </DragDropContext>
      </div>
    </div>
  );
}