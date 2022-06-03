import React from "react";
import { DndDraggable } from "../Components/Dnd";

// const primaryButton = 0;
// const wasMultiSelectKeyUsed = (event) => event.shiftKey;
// const wasToggleInSelectionGroupKeyUsed = (event) => {
//   const isUsingWindows = navigator.platform.indexOf("Win") >= 0;
//   return isUsingWindows ? event.ctrlKey : event.metaKey;
// };

export function EventoList(props) {
  const {
    NumeroUnico,
    Titulo,
    Origem,
    indexPrograma,
    indexSegmento,
    indexEvento,
    context,
    isSelected,
    selectionCount,
    isGhosting,
  } = props;

  const pathEvento = `${indexPrograma}.${indexSegmento}.${indexEvento}.${NumeroUnico}`;

  // const getIsSelectedStyle = (isSelected) => {
  //   if (isSelected) return { backgroundColor: "rgb(255, 255, 153, 0.9)" };
  //   return { backgroundColor: "rgba(255, 255, 255, 0.9)" };
  // };

  // const onClick = (event) => {
  //   console.log("onClick", event);

  //   if (event.defaultPrevented) return;
  //   if (event.button !== primaryButton) return;

  //   event.preventDefault();
  //   performAction(event);
  // };

  // const onTouchEnd = (event) => {
  //   console.log("onTouchEnd", event);
  //   const pathEvento = event?.target?.id;

  //   if (!pathEvento) return;
  //   if (event.defaultPrevented) return;

  //   event.preventDefault();
  //   context.toggleSelectionInGroup(event);
  // };

  // const performAction = (event) => {
  //   const pathEvento = event?.target?.id;
  //   if (!pathEvento) return;

  //   if (wasToggleInSelectionGroupKeyUsed(event)) {
  //     context.toggleSelectionInGroup(event);
  //     return;
  //   }
  //   if (wasMultiSelectKeyUsed(event)) {
  //     context.multiSelectTo(event);
  //     return;
  //   }
  //   context.toggleSelection(event);
  // };

  return (
    <DndDraggable
      key={pathEvento}
      draggableId={pathEvento}
      index={indexEvento}
      evento={{ ...props, Path: pathEvento }}
      toggleSelectionInGroup={context.toggleSelectionInGroup}
      toggleSelection={context.toggleSelection}
      multiSelectTo={context.multiSelectTo}
      isSelected={isSelected}
      selectionCount={selectionCount}
      isGhosting={isGhosting}
    >
      {(provided, snapshot) => `${Origem}-${Titulo}`}
    </DndDraggable>
  );
}
