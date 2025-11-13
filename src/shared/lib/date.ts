export const formatDate = (isoDateString: string) => {
  const date = new Date(isoDateString);

  const dateTimeValue = isoDateString.substring(0, 10);

  const displayValue = date.toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit'
  });

  return {dateTimeValue, displayValue};
};
