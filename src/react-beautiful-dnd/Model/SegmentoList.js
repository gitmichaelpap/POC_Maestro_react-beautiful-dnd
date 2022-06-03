import React from "react";
import { Accordion } from "react-bootstrap";
import { EventoList } from "./index";
import { DndDroppable } from "../Components/Dnd";

export function SegmentoList(props) {
  const { Codigo, Apresenta, Eventos, indexPrograma, indexSegmento, context } =
    props;

  const pathSegmento = `${indexPrograma}.${indexSegmento}`;

  return (
    <Accordion key={pathSegmento} eventkey={pathSegmento}>
      <Accordion.Item eventkey={pathSegmento}>
        <Accordion.Header>
          <strong>{`${Codigo}-${Apresenta}`}</strong>
        </Accordion.Header>
        <DndDroppable
          key={`${pathSegmento}.${Codigo}`}
          droppableId={pathSegmento}
          // type={type}
        >
          {(provided, snapshot) => {
            return (
              <Accordion.Body>
                {Eventos?.map((evento, indexEvento) => {
                  const path = `${indexPrograma}.${indexSegmento}.${indexEvento}.${evento?.NumeroUnico}`;
                  const selectionCount = context.selectedList.length;
                  const isSelected = context.selectedList.includes(path);

                  const isGhosting =
                    isSelected &&
                    context.draggingEventoPath &&
                    context.draggingEventoPath !== path;

                  return EventoList({
                    ...evento,
                    indexPrograma,
                    indexSegmento,
                    indexEvento,
                    context,
                    isSelected,
                    selectionCount,
                    isGhosting,
                  });
                })}
              </Accordion.Body>
            );
          }}
        </DndDroppable>
      </Accordion.Item>
    </Accordion>
  );
}
