export const getSplitPath = (path) => {
  if (!path) return;

  let [indexPrograma, indexSegmento, indexEvento, NumeroUnico] =
    path.split(".");

  indexPrograma = parseInt(indexPrograma);
  indexSegmento = parseInt(indexSegmento);
  indexEvento = parseInt(indexEvento);

  return { indexPrograma, indexSegmento, indexEvento, NumeroUnico };
};

export const getMovement = (source, destination) => {
  if (!source.length || !destination) return;

  source = source.map((x) => getSplitPath(x));
  destination = getSplitPath(destination);

  return { source, destination };
};

export const selectDrag = (programaList, movement) => {
  return movement.source.length > 1
    ? multiDrag(programaList, movement)
    : singleDrag(programaList, movement);
};

export const singleDrag = (programaList, movement) => {
  const destination = movement.destination;
  const source = movement.source[0];

  const [eventoRemovido] = programaList[source.indexPrograma].Segmentos[
    source.indexSegmento
  ].Eventos.splice(source.indexEvento, 1);

  programaList[destination.indexPrograma].Segmentos[
    destination.indexSegmento
  ].Eventos.splice(destination.indexEvento + 1 || 0, 0, eventoRemovido);

  return programaList;
};

export const multiDrag = (programaList, movement) => {
  const destination = movement.destination;
  const source = movement.source;

  source.sort((a, b) => {
    if (
      a.indexPrograma < b.indexPrograma ||
      a.indexSegmento < b.indexSegmento ||
      a.indexEvento < b.indexEvento
    ) {
      return -1;
    }

    if (
      a.indexPrograma > b.indexPrograma ||
      a.indexSegmento > b.indexSegmento ||
      a.indexEvento > b.indexEvento
    ) {
      return +1;
    }

    return 0;
  });

  // remover e adicionar itens selecionados
  const eventosRemovidos = source.map((x) => {
    return programaList[x.indexPrograma].Segmentos[
      x.indexSegmento
    ].Eventos.splice(x.indexEvento, 1);
  });

  programaList[destination.indexPrograma].Segmentos[
    destination.indexSegmento
  ].Eventos.splice(destination.indexEvento + 1 || 0, 0, eventosRemovidos);

  return { programaList, selectedList: [] };
};
