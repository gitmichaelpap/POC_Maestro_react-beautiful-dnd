import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Emissora from "../../../req_hom_14-03-2022_RED.json";
import {
  // multiSelect,
  mutliDragAwareReorder,
} from "./index";

const Programas = JSON.parse(JSON.stringify(Emissora));

export function DndContext({ props, children }) {
  const [programas, setProgramas] = useState(Programas.Programas);
  const [selectedList, setSelectedList] = useState([]);
  const [draggingEventoPath, setDraggingEventoPath] = useState(false);

  const onDragStart = (start) => {
    const path = start.draggableId;

    const selected = selectedList.includes(path);

    if (!selected) setSelectedList([path]);

    setDraggingEventoPath(start.draggableId);
  };

  const onDragEnd = (result) => {
    console.log("onDragEnd", result);

    if (!result?.destination?.droppableId || result.reason === "CANCEL") {
      setDraggingEventoPath(null);
      return;
    }

    const processed = mutliDragAwareReorder({
      dragGroup: programas,
      selectedList: selectedList,
      result,
    });

    setProgramas(processed.dragGroup);
    setSelectedList(processed.selectedList);
    setDraggingEventoPath(null);
  };

  const toggleSelection = (path) => {
    const wasSelected = selectedList.includes(path);

    const newItemIds = (() => {
      // O Evento não foi selecionado anteriormente, agora será o único Evento selecionado
      if (!wasSelected) {
        return [path];
      }
      // O Evento fazia parte de um grupo selecionado, agora se tornará o único Evento selecionado
      if (selectedList.length > 1) {
        return [path];
      }
      // Evento foi selecionado anteriormente, mas não em um grupo, agora vamos limpar a seleção
      return [];
    })();
    setSelectedList(newItemIds);
  };

  const toggleSelectionInGroup = (path) => {
    const index = selectedList.indexOf(path);

    // se não selecionado - adicionar os eventos selecionados
    if (index === -1) {
      setSelectedList([...selectedList, path]);
      return;
    }
    // foi selecionado anteriormente e agora precisa ser removido do grupo
    selectedList.splice(index, 1);
    setSelectedList(selectedList);
  };

  // Este comportamento corresponde à seleção do localizador do MacOSX
  const multiSelectTo = (newEventoPath) => {
    console.log("multiSelectTo", newEventoPath);

    if (newEventoPath == null) return;

    setSelectedList(newEventoPath);

    // const updated = multiSelect(programas, selectedList, newEventoPath);
  };

  // const unselectAll = (key) => setState({ [key]: [] });

  const context = {
    draggingEventoPath,
    selectedList,
    toggleSelection,
    toggleSelectionInGroup,
    multiSelectTo,
  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      {children(programas, context)}
    </DragDropContext>
  );
}
