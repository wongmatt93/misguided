const usePaginate = (array: any[], itemsPerPage: number) => {
  const newObject: any = {};

  const pages: number = Math.ceil(array.length / itemsPerPage);

  for (let i = 0; i < pages; i++) {
    newObject[i] = [];
    if (array.length < itemsPerPage) {
      newObject[i].push(...array);
    } else {
      newObject[i].push(
        ...array.slice(i * itemsPerPage, i * itemsPerPage + itemsPerPage)
      );
    }
  }

  return newObject;
};

export default usePaginate;
