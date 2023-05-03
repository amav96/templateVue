export const getIndex = (value: Array<any>, k: string): number => {
  if(!value || value === undefined || value === null){
    throw new Error("Object is expected in getIndex");
  }
  let i = -1
  for (let index = 0; index < value.length; index++) {
    if(value[index].key == k) {
      i = index;
      break
    }
  }
  return i;
}