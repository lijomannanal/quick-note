export function convertDateToLocalString(dateObject: Date) {
  return dateObject.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
