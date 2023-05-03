export const formatDateTime = (dateTime: string): string => {
  if (!dateTime) return "";
  const date: Date = new Date(dateTime);
  const dia: number = date.getDate();
  const ano: number = date.getFullYear();

  const hora: number = date.getHours();
  const minutos: number = date.getMinutes();
  if (!dia || !ano) return dateTime;

  const dateFormat = `${("0" + date.getDate()).slice(-2).slice(-2)}/${(
    "0" +
    (date.getMonth() + 1)
  ).slice(-2)}/${ano}`;

  return `${dateFormat} ${`0${hora}`.slice(-2)}:${`0${minutos}`.slice(-2)}`;
};

export const formatDate = (onlyDate: string): string => {
  if (!onlyDate) return "";
  if (onlyDate.indexOf("/") > -1) {
    return onlyDate;
  }
  const date: Date = new Date(onlyDate);
  const ano: number = date.getFullYear();
  const dateFormat = `${("0" + date.getDate()).slice(-2).slice(-2)}/${(
    "0" +
    (date.getMonth() + 1)
  ).slice(-2)}/${ano}`;

  return dateFormat;
};

export const removeAccents = (str: string): string => {
  if (!str) {
    return "";
  }
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const getErrores = (errors : any) => {
  
}