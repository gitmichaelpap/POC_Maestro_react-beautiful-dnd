import React, { useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Emissora from "../req_hom_14-03-2022_RED.json";
import "./App.css";

const Programas = JSON.parse(JSON.stringify(Emissora));

export default function App() {
  const [programas, updateProgramas] = useState(Programas.Programas);

  function handleOnDragEndProgramas(result) {
    if (!result.destination) return;

    console.log("OnDragEndProgramas", result);

    const items = Array.from(programas);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateProgramas(items);
  }

  function handleOnDragEndEventos(result) {
    if (!result.destination) return;

    console.log("OnDragEndEventos", result);

    const items = Array.from(programas);
    const source = result.source.droppableId.split(".");
    const destination = result.destination.droppableId.split(".");

    const [reorderedItem] = items[parseInt(source[0])].Segmentos[
      parseInt(source[1])
    ].Eventos.splice(result.source.index, 1);

    items[parseInt(destination[0])].Segmentos[
      parseInt(destination[1])
    ].Eventos.splice(result.destination.index, 0, reorderedItem);

    updateProgramas(items);
  }

  const accordionEventos = (
    evento,
    innerRef,
    draggableProps,
    dragHandleProps
  ) => {
    return (
      <Card
        eventkey={evento.NumeroUnico}
        ref={innerRef}
        {...draggableProps}
        {...dragHandleProps}
      >
        <Card.Body>{`${evento.Origem}-${evento.Titulo}`}</Card.Body>
      </Card>
    );
  };

  const accordionSegmentos = (segmento, indexSegmento) => {
    return (
      <Accordion eventkey={`${segmento.Numero}-${indexSegmento}`}>
        <Accordion.Item eventkey={`${segmento.Numero}-${indexSegmento}`}>
          <Accordion.Header>
            <strong>{`${segmento.Codigo}-${segmento.Apresenta}`}</strong>
          </Accordion.Header>
          <Accordion.Body>
            {segmento?.Eventos?.map((evento, indexEvento) => (
              <Draggable
                key={evento.NumeroUnico}
                draggableId={`${evento.NumeroUnico}`}
                index={indexEvento}
              >
                {(provided) =>
                  accordionEventos(
                    evento,
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

  const accordionProgramas = (
    programa,
    indexPrograma,
    innerRef,
    draggableProps,
    dragHandleProps
  ) => {
    return (
      <Accordion eventkey={programa.Id} ref={innerRef} {...draggableProps}>
        <Accordion.Item eventkey={programa.Id}>
          <Card>
            <Card.Header {...dragHandleProps} />
            <Accordion.Header>
              <strong>{programa.Nome}</strong>
            </Accordion.Header>
            <Accordion.Body>
              <DragDropContext onDragEnd={handleOnDragEndEventos}>
                {programa?.Segmentos?.map((segmento, indexSegmento) => (
                  <Droppable
                    key={`${segmento.Numero}-${indexSegmento}`}
                    droppableId={`${indexPrograma}.${indexSegmento}`}
                    index={indexSegmento}
                  >
                    {(provided) => (
                      <ul {...provided.droppableProps} ref={provided.innerRef}>
                        {accordionSegmentos(segmento, indexSegmento)}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                ))}
              </DragDropContext>
            </Accordion.Body>
          </Card>
        </Accordion.Item>
      </Accordion>
    );
  };

  console.log(`Render Tela`);

  return (
    <div className="App">
      <div className="App-header">
        <h1>MAESTRO POC DRAG-DROP</h1>

        <DragDropContext onDragEnd={handleOnDragEndProgramas}>
          <Droppable droppableId="programas">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {programas.map((programa, indexPrograma) => (
                  <Draggable
                    key={`${programa.Id}-${programa.Nome}`}
                    draggableId={`${programa.Id}`}
                    index={indexPrograma}
                  >
                    {(provided) =>
                      accordionProgramas(
                        programa,
                        indexPrograma,
                        provided.innerRef,
                        provided.draggableProps,
                        provided.dragHandleProps
                      )
                    }
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
