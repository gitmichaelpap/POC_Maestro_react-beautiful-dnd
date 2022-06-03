import React from "react";
import { Accordion } from "react-bootstrap";
import SegmentosList from "./SegmentoList";

export default function ProgramaList(props) {
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
            SegmentosList({ ...x, indexPrograma, indexSegmento, context })
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
