export const withNewItemIds = (column, itemIds) => ({
  id: column.id,
  itemIds,
});

export const reorderSingleDrag = ({ dragGroup, selectedList, result }) => {
  const destination = result.destination.droppableId.split(".");
  const source = result.source.droppableId.split(".");

  // remover da coluna inicial [0] -> Programa, [1] -> Segmento
  const [reorderedItem] = dragGroup[parseInt(source[0])].Segmentos[
    parseInt(source[1])
  ].Eventos.splice(result.source.index, 1);

  // adicionar à coluna estrangeira  [0] -> Programa, [1] -> Segmento
  dragGroup[parseInt(destination[0])].Segmentos[
    parseInt(destination[1])
  ].Eventos.splice(result.destination.index, 0, reorderedItem);

  return { dragGroup, selectedList };
};

export const getHomeColumn = (dragGroup, itemId) => {
  for (let key in dragGroup.columns) {
    if (dragGroup.columns[key].itemIds.includes(itemId))
      return dragGroup.columns[key];
  }
};

export const reorderMultiDrag = ({ dragGroup, selectedList, result }) => {
  const destination = result.destination.droppableId.split(".");

  const selectedListClone = [...selectedList];
  selectedListClone.sort((x, y) => {
    let a = x.split(".");
    let b = y.split(".");

    if (a[0] < b[0] || a[1] < b[1] || a[2] < b[2]) {
      return -1;
    }

    if (a[0] > b[0] || a[1] > b[1] || a[2] > b[2]) {
      return +1;
    }

    return 0;
  });

  // remover e adicionar itens selecionados
  const eventosRemovidos = selectedListClone.map((x) => {
    const source = x.split(".");
    return dragGroup[parseInt(source[0])].Segmentos[
      parseInt(source[1])
    ].Eventos.splice(source[2], 1)[0];
  });

  console.log("EventosRemovidos", eventosRemovidos);

  dragGroup[parseInt(destination[0])].Segmentos[
    parseInt(destination[1])
  ].Eventos.splice(result.destination.index, 0, ...eventosRemovidos);

  return { dragGroup, selectedList: [] };
};

export const mutliDragAwareReorder = (args) => {
  return args.selectedList.length > 1
    ? reorderMultiDrag(args)
    : reorderSingleDrag(args);
};

export const multiSelect = (dragGroup, selectedList, newItemId) => {
  // Nada já selecionado
  if (!selectedList.length) return [newItemId];

  const columnOfNew = getHomeColumn(dragGroup, newItemId);
  const indexOfNew = columnOfNew.itemIds.indexOf(newItemId);

  const lastSelected = selectedList[selectedList.length - 1];
  const columnOfLast = getHomeColumn(dragGroup, lastSelected);
  const indexOfLast = columnOfLast.itemIds.indexOf(lastSelected);

  // seleção múltipla para outra Segmento
  // seleciona tudo até o índice do evento atual
  if (columnOfNew !== columnOfLast) {
    return columnOfNew.itemIds.slice(0, indexOfNew + 1);
  }

  // seleção múltipla na mesma coluna
  // precisa selecionar tudo entre o último índice e o índice atual inclusive

  // nada para fazer aqui
  if (indexOfNew === indexOfLast) return null;

  const isSelectingForwards = indexOfNew > indexOfLast;
  const start = isSelectingForwards ? indexOfLast : indexOfNew;
  const end = isSelectingForwards ? indexOfNew : indexOfLast;

  const inBetween = columnOfNew.itemIds.slice(start, end + 1);

  // tudo no meio precisa ter sua seleção alternada.
  // com exceção dos valores inicial e final que sempre serão selecionados

  const toAdd = inBetween.filter((itemId) => {
    // se já estiver selecionado: então não há necessidade de selecioná-lo novamente
    if (selectedList.includes(itemId)) return false;
    return true;
  });

  const sorted = isSelectingForwards ? toAdd : [...toAdd].reverse();
  const combined = [...selectedList, ...sorted];

  return combined;
};
