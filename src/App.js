import React from "react";
import { Accordion } from "react-bootstrap";
import DndContext from "./Dnd/DndContext";
import DndDroppable from "./Dnd/DndDroppable";
import DndDraggable from "./Dnd/DndDraggable";
import "./App.css";

export default function App() {
  const accordionEventos = (
    evento,
    indexEvento,
    path,
    toggleSelectionInGroup,
    toggleSelection,
    multiSelectTo,
    isSelected = false,
    selectionCount = 0,
    isGhosting = false
  ) => (
    <DndDraggable
      key={path}
      draggableId={path}
      index={indexEvento}
      evento={{ ...evento, Path: path }}
      toggleSelectionInGroup={toggleSelectionInGroup}
      toggleSelection={toggleSelection}
      multiSelectTo={multiSelectTo}
      isSelected={isSelected}
      selectionCount={selectionCount}
      isGhosting={isGhosting}
    >
      {(provided, snapshot) => `${evento?.Origem}-${evento?.Titulo}`}
    </DndDraggable>
  );

  const accordionSegmentos = (
    segmento,
    indexSegmento,
    indexPrograma,
    draggingEventoPath,
    selectedList = [],
    toggleSelectionInGroup,
    toggleSelection,
    multiSelectTo
  ) => {
    return (
      <Accordion
        key={`${segmento.Numero}-${indexSegmento}`}
        eventkey={`${segmento.Numero}-${indexSegmento}`}
      >
        <Accordion.Item eventkey={`${segmento.Numero}-${indexSegmento}`}>
          <Accordion.Header>
            <strong>{`${segmento.Codigo}-${segmento.Apresenta}`}</strong>
          </Accordion.Header>
          <DndDroppable
            key={`${segmento.Numero}-${indexSegmento}`}
            droppableId={`${indexPrograma}.${indexSegmento}`}
            // type={type}
          >
            {(provided, snapshot) => {
              return (
                <Accordion.Body>
                  {segmento?.Eventos?.map((evento, indexEvento) => {
                    const path = `${indexPrograma}.${indexSegmento}.${indexEvento}.${evento?.NumeroUnico}`;
                    const selectionCount = selectedList.length;
                    const isSelected = selectedList.includes(path);

                    const isGhosting =
                      isSelected &&
                      draggingEventoPath &&
                      draggingEventoPath !== path;

                    return accordionEventos(
                      evento,
                      indexEvento,
                      path,
                      toggleSelectionInGroup,
                      toggleSelection,
                      multiSelectTo,
                      isSelected,
                      selectionCount,
                      isGhosting
                    );
                  })}
                </Accordion.Body>
              );
            }}
          </DndDroppable>
        </Accordion.Item>
      </Accordion>
    );
  };

  const accordionProgramas = (
    programa,
    indexPrograma,
    draggingEventoPath,
    selectedList,
    toggleSelectionInGroup,
    toggleSelection,
    multiSelectTo
  ) => {
    return (
      <Accordion
        key={`${programa.Id}-${programa.Nome}`}
        eventkey={`${programa.Id}-${programa.Nome}`}
      >
        <Accordion.Item eventkey={`${programa.Id}-${programa.Nome}`}>
          <Accordion.Header>
            <strong>{programa.Nome}</strong>
          </Accordion.Header>

          <Accordion.Body>
            {programa?.Segmentos?.map((segmento, indexSegmento) =>
              accordionSegmentos(
                segmento,
                indexSegmento,
                indexPrograma,
                draggingEventoPath,
                selectedList,
                toggleSelectionInGroup,
                toggleSelection,
                multiSelectTo
              )
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  console.log(`Render Tela`);

  return (
    <div className="App">
      <div className="App-header">
        <h1>MAESTRO POC DRAG-DROP</h1>

        <DndContext>
          {({
            programas,
            draggingEventoPath,
            selectedList,

            toggleSelectionInGroup,
            toggleSelection,
            multiSelectTo,
          }) =>
            programas.map((programa, indexPrograma) =>
              accordionProgramas(
                programa,
                indexPrograma,
                draggingEventoPath,
                selectedList,
                toggleSelectionInGroup,
                toggleSelection,
                multiSelectTo
              )
            )
          }
        </DndContext>
      </div>
    </div>
  );
}
