import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";

export function DateFilterInput({
  filters,
  setFilters,
  dateValue,
  setDateValue,
}: {
  filters: { startDate: string | undefined; endDate: string | undefined };
  setFilters: (filters: {
    startDate: string | undefined;
    endDate: string | undefined;
  }) => void;
  dateValue: [string | undefined, string | undefined];
  setDateValue: (dateValue: [string | undefined, string | undefined]) => void;
}) {
  const dateFilter = (e: any) => {
    const endDate = e[1] ? new Date(e[1]) : undefined;

    if (endDate) {
      endDate.setDate(endDate.getDate() + 1);
    }

    setFilters({
      ...filters,
      endDate: endDate ? endDate.toISOString() : undefined,
      startDate: e[0] ? new Date(e[0]).toISOString() : undefined,
    });
  };

  return (
    <DatePickerInput
      miw={300}
      clearable
      locale="mn"
      type="range"
      yearLabelFormat="YYYY"
      valueFormat="MM сарын DD өдөр"
      monthLabelFormat="YYYY / MM сар"
      placeholder="Эхлэх огноо - Дуусах огноо"
      rightSection={filters?.endDate ? null : <IconCalendar size={20} />}
      value={
        [
          dateValue ? (dateValue[0] as string) : undefined,
          dateValue ? (dateValue[1] as string) : undefined,
        ] as any
      }
      onChange={(e: any) => {
        dateFilter(e);
        setDateValue(e);
      }}
    />
  );
}
