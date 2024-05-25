import { useMemo } from "react";

export const useAstronautData = (data) => {
  return useMemo(() => {
    return data.reduce((nameCounts, record) => {
      const existingRecord = nameCounts.find(
        (item) => item.name === record.name,
      );
      if (existingRecord) {
        existingRecord.count += 1;
      } else {
        nameCounts.push({ name: record.name, count: 1 });
      }
      return nameCounts;
    }, []);
  }, [data]);
};
