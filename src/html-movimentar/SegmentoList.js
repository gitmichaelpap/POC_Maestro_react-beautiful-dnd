import React from "react";
import { Accordion } from "react-bootstrap";
import EventoList from "./EventoList";

export default function SegmentosList(props) {
  const { Codigo, Apresenta, Eventos, indexPrograma, indexSegmento, context } =
    props;

  return (
    <Accordion
      key={`${indexPrograma}.${indexSegmento}`}
      eventkey={`${indexPrograma}.${indexSegmento}`}
    >
      <Accordion.Item eventkey={`${indexPrograma}.${indexSegmento}`}>
        <Accordion.Header>
          <strong>{`${Codigo}-${Apresenta}`}</strong>
        </Accordion.Header>

        <Accordion.Body
          id={`${indexPrograma}.${indexSegmento}`}
          className="Droppable"
          onDragOver={(event) => context.onDragOver(event)}
          onDrop={(event) => context.onDrop(event)}
          onDragEnter={(event) => context.onDragEnter(event)}
          onDragLeave={(event) => context.onDragLeave(event)}
        >
          <ul>
            {Eventos?.map((x, indexEvento) => {
              const path = `${indexPrograma}.${indexSegmento}.${indexEvento}.${x?.NumeroUnico}`;
              const isSelected = context.selectedList.includes(path);
              return EventoList({
                ...x,
                indexPrograma,
                indexSegmento,
                indexEvento,
                context,
                isSelected,
              });
            })}
          </ul>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
