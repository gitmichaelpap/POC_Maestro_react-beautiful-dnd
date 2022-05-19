import React, { useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";

const Programas = [
  {
    id: "1",
    name: "HORA UM",
    seguimentos: [
      {
        id: "11",
        name: "IP",
        eventos: [
          {
            id: "1091",
            name: "FADE DE 1 SEGUNDO",
          },
        ],
      },
      {
        id: "12",
        name: "PT1 (HORA UM)",
        eventos: [
          {
            id: "7",
            name: "MAIS VOCE 14/3 B(H)",
          },
          {
            id: "113",
            name: "FADE DE 1 SEGUNDO",
          },
          {
            id: "114",
            name: "TCROSS SUVW TAXA ZERO0105",
          },
        ],
      },
      {
        id: "77",
        name: "PD1 (HORA UM)",
        eventos: [
          {
            id: "21",
            name: "ENCONTRO 14/3 B(H)",
          },
          {
            id: "25",
            name: "CARA DA LIMPEZA E",
          },
          {
            id: "27",
            name: "PROJ AGRO 22 138 AMENDOIM",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "BOM DIA PRAÇA",
    seguimentos: [
      {
        id: "22",
        name: "IP",
        eventos: [
          {
            id: "23",
            name: "FADE DE 1 SEGUNDO",
          },
        ],
      },
      {
        id: "222",
        name: "PT1",
        eventos: [
          {
            id: "223",
            name: "PANTANAL(PAI E FILHO)(DIA)",
          },
          {
            id: "224",
            name: "GIIN G RURAL FADE 1601 CC",
          },
        ],
      },
    ],
  },
];

export default function App() {
  const [programas, updateProgramas] = useState(Programas);

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

    const [reorderedItem] = items[parseInt(source[1])].seguimentos[
      parseInt(source[0])
    ].eventos.splice(result.source.index, 1);

    items[parseInt(destination[1])].seguimentos[
      parseInt(destination[0])
    ].eventos.splice(result.destination.index, 0, reorderedItem);

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
        eventkey={evento.id}
        ref={innerRef}
        {...draggableProps}
        {...dragHandleProps}
      >
        <Card.Body>{evento.name}</Card.Body>
      </Card>
    );
  };

  const accordionSeguimentos = (seguimento) => {
    return (
      <Accordion eventkey={seguimento.id}>
        <Accordion.Item eventkey={seguimento.id}>
          <Accordion.Header>
            <strong>{seguimento.name}</strong>
          </Accordion.Header>
          <Accordion.Body>
            {seguimento?.eventos?.map((evento, indexEvento) => (
              <Draggable
                key={evento.id}
                draggableId={evento.id}
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
      <Accordion eventkey={programa.id} ref={innerRef} {...draggableProps}>
        <Accordion.Item eventkey={programa.id}>
          <Card>
            <Card.Header {...dragHandleProps} />
            <Accordion.Header>
              <strong>{programa.name}</strong>
            </Accordion.Header>
            <Accordion.Body>
              <DragDropContext onDragEnd={handleOnDragEndEventos}>
                {programa?.seguimentos?.map((seguimento, indexSeguimento) => (
                  <Droppable
                    key={seguimento.id}
                    droppableId={`${indexSeguimento}.${indexPrograma}`}
                    index={indexSeguimento}
                  >
                    {(provided) => (
                      <ul {...provided.droppableProps} ref={provided.innerRef}>
                        {accordionSeguimentos(seguimento)}
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
                    key={programa.id}
                    draggableId={programa.id}
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
