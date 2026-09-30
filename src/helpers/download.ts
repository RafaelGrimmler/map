export const downloadJSON = (filename: string, data: any) => {
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(data),
  )}`;

  const link = document.createElement('a');

  link.href = jsonString;
  link.download = filename;
  link.click();
};
