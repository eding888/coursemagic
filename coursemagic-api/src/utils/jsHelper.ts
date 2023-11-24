// Methods to just help with general programming tasks

// checks to see if obj has any null fields
export const findKeyWhereNull =(obj: Record<string, any>): string | boolean => {
  const nullKey = Object.entries(obj).find((pair) => (!pair[1]));
  if(nullKey) {
    return nullKey[0];
  } else {
    return false;
  }
}
