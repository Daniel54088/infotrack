export const isURL = (givenURL: string): boolean => {
  try {
    const checkedUrl = new URL(givenURL);
    console.log("checkedUrl is", checkedUrl);
  } catch (error) {
    console.log("error is", error);
    return false;
  }
  return true;
};
