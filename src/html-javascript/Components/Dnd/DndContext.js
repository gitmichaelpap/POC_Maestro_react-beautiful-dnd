import React, { useState } from "react";
import Emissora from "../../../req_hom_14-03-2022_RED.json";
import { selectDrag, getMovement } from "../../Service/Logic";

const Programas = JSON.parse(JSON.stringify(Emissora));

export function DndContext({ props, children }) {
  const [programas, setProgramas] = useState(Programas.Programas);
  const [selectedList, setSelectedList] = useState([]);

  //Arrastável - ocorre quando o usuário começa a arrastar um elemento
  const onDragStart = (event) => {
    // console.log("onDragStart", event);

    const path = event?.target?.id;
    const selected = selectedList.includes(path);
    if (!selected) setSelectedList([path]);

    event.currentTarget.classList.add("isSelected");
    event.dataTransfer.setData("text/plain", path);
  };

  //Arrastável - ocorre quando um elemento está sendo arrastado
  const onDrag = (event) => {
    // console.log("onDrag", event);
  };

  //Arrastável - ocorre quando o usuário termina de arrastar o elemento
  const onDragEnd = (event) => {
    // console.log("onDragEnd", event);
    event.currentTarget.style.backgroundColor = "";
  };

  //Destino - ocorre quando o elemento arrastado entra no destino de soltar
  const onDragEnter = (event) => {
    // console.log("onDragEnter", event);

    event.currentTarget.classList.add("over");
    event.preventDefault();
  };

  //Destino - ocorre quando o elemento arrastado está sobre o destino de soltar
  const onDragOver = (event) => {
    // console.log("onDragOver", event);

    event.currentTarget.classList.add("over");
    event.preventDefault();
  };

  //Destino - ocorre quando o elemento arrastado deixa o destino de soltar
  const onDragLeave = (event) => {
    // console.log("onDragLeave", event);

    event.currentTarget.classList.remove("over");
  };

  //Destino - ocorre quando o elemento arrastado é solto no destino de soltar
  const onDrop = (event) => {
    // console.log("onDrop", event);

    const movement = getMovement(selectedList, event?.target?.id);

    const processed = selectDrag(programas, movement);
    setProgramas(processed);

    event.currentTarget.classList.remove("over");
    event.dataTransfer.clearData();
  };

  const toggleSelection = (event) => {
    console.log("toggleSelection", event);

    const path = event?.target?.id;
    const wasSelected = selectedList.includes(path);

    const newPath = (() => {
      // O Evento não foi selecionado anteriormente, agora será o único Evento selecionado
      if (!wasSelected) return [path];

      // O Evento fazia parte de um grupo selecionado, agora se tornará o único Evento selecionado
      if (selectedList.length > 1) return [path];

      // Evento foi selecionado anteriormente, mas não em um grupo, agora vamos limpar a seleção
      return [];
    })();

    setSelectedList(newPath);
  };

  const toggleSelectionInGroup = (event) => {
    console.log("toggleSelectionInGroup", event);
    const path = event?.target?.id;
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

  const multiSelectTo = (event) => {
    console.log("multiSelectTo", event);
    const path = event?.target?.id;

    if (path == null) return;

    setSelectedList(path);

    // const updated = multiSelect(programas, selectedList, newEventoPath);
  };

  console.log("selectedList", selectedList);
  console.log("programas", programas);

  const context = {
    onDragStart,
    onDrag,
    onDragEnd,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDrop,
    toggleSelection,
    toggleSelectionInGroup,
    multiSelectTo,
    selectedList,
  };

  return <div>{children(programas, context)}</div>;
}
