export const isNotEmpty = (data) => {
  if (JSON.stringify(data) === JSON.stringify({})) {
    return false;
  }
  return true;
};

export const isNumber = (data) => {
  for (const value of Object.values(data)) {
    if (isNaN(value) || value < 0) {
      return false;
    }
  }
  return true;
};
