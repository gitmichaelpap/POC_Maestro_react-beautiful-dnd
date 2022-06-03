import React from "react";
import { Accordion } from "react-bootstrap";
import { SegmentoList } from "./index";

export function ProgramaList(props) {
  const { Id, Nome, Segmentos, indexPrograma, context } = props;

  return (
    <Accordion
      key={`${Id}.${Nome}.${indexPrograma}`}
      eventkey={`${Id}.${Nome}.${indexPrograma}`}
    >
      <Accordion.Item eventkey={`${Id}.${Nome}.${indexPrograma}`}>
        <Accordion.Header>
          <strong>{Nome}</strong>
        </Accordion.Header>

        <Accordion.Body>
          {Segmentos?.map((x, indexSegmento) =>
            SegmentoList({ ...x, indexPrograma, indexSegmento, context })
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
