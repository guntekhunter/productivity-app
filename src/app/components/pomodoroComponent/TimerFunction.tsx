// @ts-ignore
export const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};
