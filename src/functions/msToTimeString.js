const msToTimeString = ms => {
  const timeGap = parseInt(ms / 1000, 10);
  const s = Number.isNaN(timeGap % 60) ? 0 : timeGap % 60;
  const m = Number.isNaN(parseInt((timeGap / 60) % 60)) ? 0 : parseInt((timeGap / 60) % 60, 10);
  const h = Number.isNaN(parseInt(timeGap / 3600)) ? 0 : parseInt(timeGap / 3600, 10);
  const seconds = s < 10 ? '0' + s.toString() : s.toString();
  const minutes = m < 10 ? '0' + m.toString() : m.toString();
  const hours = h.toString();
  return { hours, minutes, seconds };
};

export default msToTimeString;
