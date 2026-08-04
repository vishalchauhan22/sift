export const formatRemainder = (count: number): string => {
  if (count < 1000) {
    return `${count}`;
  } else if (count < 10000) {
    const formattedCount = (Math.floor(count / 100) / 10).toFixed(1);

    return `${
      formattedCount.endsWith('.0')
        ? formattedCount.slice(0, -2)
        : formattedCount
    }K`;
  }

  return `${Math.floor(count / 1000)}K`;
};
