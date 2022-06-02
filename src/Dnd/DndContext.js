import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Emissora from "../req_hom_14-03-2022_RED.json";
import { multiSelect, mutliDragAwareReorder } from "./utils";

const Programas = JSON.parse(JSON.stringify(Emissora));

export default function DndContext({ props, children }) {
  const [programas, setProgramas] = useState(Programas.Programas);
  const [selectedList, setSelectedList] = useState([]);
  const [draggingEventoPath, setDraggingEventoPath] = useState(false);

  const onDragStart = (start) => {
    const path = start.draggableId;

    const selectedListClone = [...selectedList];
    const selected = selectedListClone.includes(path);

    if (!selected) setSelectedList([path]);

    setDraggingEventoPath(start.draggableId);
  };

  const onDragEnd = (result) => {
    console.log("onDragEnd", result);

    // nothing to do
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
    const selectedListClone = [...selectedList];
    const wasSelected = selectedListClone.includes(path);

    const newItemIds = (() => {
      // O Evento não foi selecionado anteriormente, agora será o único Evento selecionado
      if (!wasSelected) {
        return [path];
      }
      // O Evento fazia parte de um grupo selecionado, agora se tornará o único Evento selecionado
      if (selectedListClone.length > 1) {
        return [path];
      }
      // Evento foi selecionado anteriormente, mas não em um grupo, agora vamos limpar a seleção
      return [];
    })();
    setSelectedList(newItemIds);
  };

  const toggleSelectionInGroup = (path) => {
    const selectedListClone = [...selectedList];
    const index = selectedListClone.indexOf(path);

    // se não selecionado - adicionar os eventos selecionados
    if (index === -1) {
      setSelectedList([...selectedListClone, path]);
      return;
    }
    // foi selecionado anteriormente e agora precisa ser removido do grupo
    selectedListClone.splice(index, 1);
    setSelectedList(selectedListClone);
  };

  // Este comportamento corresponde à seleção do localizador do MacOSX
  const multiSelectTo = (newEventoPath) => {
    console.log("multiSelectTo", newEventoPath);

    const selectedListClone = [...selectedList];
    const updated = multiSelect(selectedListClone, newEventoPath);
    if (updated == null) {
      return;
    }

    setSelectedList(updated);
  };

  // const unselectAll = (key) => setState({ [key]: [] });

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      {children({
        programas,
        draggingEventoPath,
        selectedList,
        // dragGroupBreakdowns, dragGroupManagerList, selectedBreakdownIds
        toggleSelection: toggleSelection,
        toggleSelectionInGroup: toggleSelectionInGroup,
        multiSelectTo: multiSelectTo,
      })}
    </DragDropContext>
  );
}
