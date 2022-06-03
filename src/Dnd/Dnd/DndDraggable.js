import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { keyCodes, SelectionCount } from "./index";

const primaryButton = 0;

const getBackgroundColor = ({ isSelected, isGhosting }) => {
  if (isGhosting) {
    return "rgb(230, 230, 230, .2)";
  }
  if (isSelected) {
    return "rgb(255, 255, 153, .9)";
  }
  return "rgb(230, 230, 230, .9)";
};

const getColor = ({ isSelected, isGhosting }) => {
  if (isGhosting) {
    return "rgba(0,0,0,.2)";
  }
  if (isSelected) {
    return "rgba(0,0,0,.8)";
  }
  return "rgba(0,0,0,.8)";
};

const getItemStyle = (isDragging, isSelected, isGhosting, draggableStyle) => ({
  backgroundColor: getBackgroundColor({ isSelected, isGhosting }),
  color: getColor({ isSelected, isGhosting }),
  boxShadow: isDragging ? `2px 2px 1px rgba(0,0,0,.2)` : "none",
  opacity: isGhosting ? "0.8" : "1",
  position: "relative" /* needed for SelectionCount */,
  padding: `8px`,
  margin: `0 0 8px 0`,
  borderRadius: `5px`,
  fontSize: `18px`,
  fontFamily: "Arial",
  userSelect: "none",
  ...draggableStyle,
});

const DraggableContainer = ({
  provided,
  innerRef,
  onClick,
  onTouchEnd,
  onKeyDown,
  isDragging,
  isSelected,
  isGhosting,
  children,
}) => (
  <div
    ref={innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    style={getItemStyle(
      isDragging,
      isSelected,
      isGhosting,
      provided.draggableProps.style
    )}
    onClick={onClick}
    onTouchEnd={onTouchEnd}
    onKeyDown={onKeyDown}
  >
    {children}
  </div>
);

export function DndDraggable({
  evento,
  toggleSelection,
  toggleSelectionInGroup,
  multiSelectTo,
  draggableId,
  index,
  selectionCount = 0,
  isSelected,
  isGhosting,
  children,
}) {
  const onKeyDown = (event, provided, snapshot) => {
    if (event.defaultPrevented) {
      return;
    }
    if (snapshot.isDragging) {
      return;
    }
    if (event.keyCode !== keyCodes.enter) {
      return;
    }

    // estamos usando o evento para seleção
    event.preventDefault();
    performAction(event);
  };

  // Usando o onClick pois estará prevenindo corretamente se houve um arrasto
  const onClick = (event) => {
    console.log("onClick", evento);

    if (event.defaultPrevented) {
      return;
    }
    if (event.button !== primaryButton) {
      return;
    }
    // marcando o evento como usado
    event.preventDefault();
    performAction(event);
  };

  const onTouchEnd = (event) => {
    console.log("onTouchEnd", evento);
    if (event.defaultPrevented) {
      return;
    }
    // marcando o evento como usado
    // também precisaríamos adicionar alguma lógica extra para evitar o clique se este elemento fosse uma âncora
    event.preventDefault();
    toggleSelectionInGroup(evento.Path);
  };

  // Verifica se o ctrl foi acionado
  const wasToggleInSelectionGroupKeyUsed = (event) => {
    const isUsingWindows = navigator.platform.indexOf("Win") >= 0;
    return isUsingWindows ? event.ctrlKey : event.metaKey;
  };

  // Verifica se o shift foi acionado
  const wasMultiSelectKeyUsed = (event) => event.shiftKey;

  const performAction = (event) => {
    if (wasToggleInSelectionGroupKeyUsed(event)) {
      toggleSelectionInGroup(evento.Path);
      return;
    }
    if (wasMultiSelectKeyUsed(event)) {
      multiSelectTo(evento.Path);
      return;
    }
    toggleSelection(evento.Path);
  };

  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => {
        const shouldShowSelection = snapshot.isDragging && selectionCount > 1;
        return (
          <DraggableContainer
            provided={provided}
            innerRef={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={onClick}
            onTouchEnd={onTouchEnd}
            onKeyDown={(e) => onKeyDown(e, provided, snapshot)}
            isDragging={snapshot.isDragging}
            isSelected={isSelected}
            isGhosting={isGhosting}
          >
            {children(provided, snapshot)}
            {shouldShowSelection ? (
              <SelectionCount>{selectionCount}</SelectionCount>
            ) : null}
          </DraggableContainer>
        );
      }}
    </Draggable>
  );
}
