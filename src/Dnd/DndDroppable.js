import React from "react";
import { Droppable } from "react-beautiful-dnd";

const itemListStyle = (isDraggingOver) => {
  return {
    flex: 1,
    padding: `8px`,
    transition: "background-color 0.2s ease",
    backgroundColor: isDraggingOver ? `rgba(173,255,175,.9)` : "",
  };
};

const ItemList = ({ innerRef, isDraggingOver, children }) => {
  return (
    <div style={itemListStyle(isDraggingOver)} ref={innerRef}>
      {children}
    </div>
  );
};

export default function DndDroppable({
  droppableId,
  type = "DEFAULT",
  children,
}) {
  return (
    <Droppable droppableId={droppableId} type={type}>
      {(provided, snapshot) => {
        return (
          <ItemList
            innerRef={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
            {...provided.droppableProps}
          >
            {children(provided, snapshot)}
            {provided.placeholder}
          </ItemList>
        );
      }}
    </Droppable>
  );
}
