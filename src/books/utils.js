export const getBookUrl = (formats) => {
  const htmlKey = Object.keys(formats).find((key) => key.includes('text/html'));
  if (htmlKey) return formats[htmlKey];

  const pdfKey = Object.keys(formats).find((key) =>
    key.includes('application/pdf')
  );
  if (pdfKey) return formats[pdfKey];

  const txtKey = Object.keys(formats).find((key) => key.includes('text/plain'));
  if (txtKey) return formats[txtKey];

  return null;
};
