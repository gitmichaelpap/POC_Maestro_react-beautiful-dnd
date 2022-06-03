import React from "react";
import { Card } from "react-bootstrap";

const primaryButton = 0;
const wasMultiSelectKeyUsed = (event) => event.shiftKey;
const wasToggleInSelectionGroupKeyUsed = (event) => {
  const isUsingWindows = navigator.platform.indexOf("Win") >= 0;
  return isUsingWindows ? event.ctrlKey : event.metaKey;
};

export default function EventoList(props) {
  const {
    NumeroUnico,
    Titulo,
    Origem,
    indexPrograma,
    indexSegmento,
    indexEvento,
    context,
    isSelected,
  } = props;

  const path = `${indexPrograma}.${indexSegmento}.${indexEvento}.${NumeroUnico}`;

  const getIsSelectedStyle = (isSelected) => {
    if (isSelected) return { backgroundColor: "rgb(255, 255, 153, 0.9)" };
    return { backgroundColor: "rgba(255, 255, 255, 0.9)" };
  };

  const onClick = (event) => {
    console.log("onClick", event);

    if (event.defaultPrevented) return;
    if (event.button !== primaryButton) return;

    event.preventDefault();
    performAction(event);
  };

  const onTouchEnd = (event) => {
    console.log("onTouchEnd", event);
    const path = event?.target?.id;

    if (!path) return;
    if (event.defaultPrevented) return;

    event.preventDefault();
    context.toggleSelectionInGroup(event);
  };

  const performAction = (event) => {
    const path = event?.target?.id;
    if (!path) return;

    if (wasToggleInSelectionGroupKeyUsed(event)) {
      context.toggleSelectionInGroup(event);
      return;
    }
    if (wasMultiSelectKeyUsed(event)) {
      context.multiSelectTo(event);
      return;
    }
    context.toggleSelection(event);
  };

  return (
    <Card
      id={path}
      key={path}
      className={`Draggable`}
      draggable={true}
      onDragStart={(event) => context.onDragStart(event)}
      onDrag={(event) => context.onDrag(event)}
      onDragEnd={(event) => context.onDragEnd(event)}
      onClick={onClick}
      onTouchEnd={onTouchEnd}
      style={getIsSelectedStyle(isSelected)}
    >
      <Card.Body id={path}>{`${Origem}-${Titulo}`}</Card.Body>
    </Card>
  );
}
