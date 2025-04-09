import React, { useEffect, useImperativeHandle } from "react";
import { Table as BaseTable, Text, Box, Pagination } from "@mantine/core";
import {
  IconSelector,
  IconChevronUp,
  IconDatabaseOff,
  IconChevronDown,
} from "@tabler/icons-react";
import useSwr from "swr";
import qs from "qs";
import classes from "./table.module.css";
import { IResult } from "@/interfaces/result";

export * from "./row-action";

export type IReloadTable = { reload: () => void };

export type ColumnType<T> = {
  title?: string;
  sorter?: boolean;
  dataIndex?: string;
  render: (record: T, index: number) => JSX.Element | string | number;
  align?: "left" | "right" | "center";
  width?: string | number;
  extra?: any;
  children?: ColumnType<T>[];
};

type Props = {
  name: string;
  columns: ColumnType<any>[];
  filters?: { [key: string]: string | number | any };
  pagination?: boolean;
  dataSource?: any[];
  loadData?: (filter?: any) => Promise<any>;
  onResult?: (result: IResult<any>) => void;
  limit?: number;
  minWidth?: any;
  rowStyle?: (record: any, index: number) => React.CSSProperties;
  renderRow?: (record: any, index: number) => React.ReactNode;
};

export type ITableRef = { reload: () => void };
export const Table = React.forwardRef(TableFn);

interface ThProps {
  children: React.ReactNode;
  column: ColumnType<any>;
  sorted?: string | unknown;
  onSort(): void;
  align?: "left" | "right" | "center";
}

const Th = ({ children, column, sorted, onSort, align }: ThProps) => {
  const alignMap = {
    left: "flex-start",
    right: "flex-end",
    center: "center",
  };

  const Icon = sorted
    ? sorted === "asc"
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;

  if (!column.sorter) {
    return (
      <BaseTable.Th
        className={classes.th}
        style={{
          width: column.width,
          textAlign: align,
          whiteSpace: "nowrap",
        }}
      >
        <Text size="sm" fw={550}>
          {children}
        </Text>
      </BaseTable.Th>
    );
  }

  return (
    <BaseTable.Th
      className={`${classes.th} ${classes.control}`}
      style={{ width: column.width }}
      onClick={() => onSort()}
    >
      <div
        className={classes.button}
        style={{
          justifyContent: alignMap[align || "left"] || "flex-start",
          whiteSpace: "nowrap",
        }}
      >
        <span className={classes.child}>{children}</span>
        <span className={classes.icon}>
          <Icon size={14} stroke={1.5} />
        </span>
      </div>
    </BaseTable.Th>
  );
};

function TableFn(
  {
    name,
    columns,
    filters = {},
    pagination = true,
    minWidth,
    dataSource = [],
    loadData,
    limit: defaultLimit,
    rowStyle,
    renderRow,
    onResult,
  }: Props,
  ref: React.Ref<ITableRef>
) {
  const tableRef = React.useRef<HTMLTableElement>(null);
  const [page, setPage] = React.useState(1);
  const [limit] = React.useState(defaultLimit || 20);

  const { data, mutate } = useSwr(
    loadData
      ? `table.${name}?.[${page}, ${limit}]?${qs.stringify(filters)}`
      : null,
    async () =>
      loadData &&
      (await loadData({
        offset: {
          page,
          limit: limit || 20,
        },
        filter: filters,
      })),
    {
      fallbackData: {
        count: dataSource.length,
        rows: dataSource.slice(
          page === 1 ? 0 : page * limit - limit,
          page * limit
        ),
      },
    }
  );

  const [sorted, setSorting] = React.useState<string[]>([]);

  const onSort = (index?: string) => {
    if (index) {
      setSorting((state) => [
        index,
        state[0] === index ? (state[1] === "asc" ? "desc" : "asc") : "asc",
      ]);
    }
  };

  useImperativeHandle(ref, () => ({
    reload() {
      return mutate();
    },
  }));

  const currentPage = parseInt(page.toString(), 10);
  const onScroll = () => {
    // onScroll
  };
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);

  useEffect(() => {
    data && onResult && onResult(data);
  }, [data]);

  return (
    <>
      <div className={classes.container}>
        <div ref={scrollRef} onScroll={onScroll} className={classes.scroll}>
          <BaseTable
            style={{
              minWidth,
            }}
            ref={tableRef}
            highlightOnHover={false}
          >
            <BaseTable.Thead>
              <BaseTable.Tr>
                {columns.map((column, index) => (
                  <Th
                    key={index}
                    column={column}
                    sorted={sorted[0] === column.dataIndex && sorted[1]}
                    onSort={() => onSort(column.dataIndex)}
                    align={column.align || "left"}
                  >
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: "calc(0.9rem)",
                        lineHeight: "1.45",
                      }}
                    >
                      {column.title || column.extra}
                    </span>
                  </Th>
                ))}
              </BaseTable.Tr>
            </BaseTable.Thead>

            <BaseTable.Tbody>
              {data.rows?.length > 0 ? (
                data.rows.map((row: any, index: number) => {
                  if (renderRow) return renderRow(row, index);
                  return (
                    <BaseTable.Tr
                      key={index}
                      style={rowStyle ? rowStyle(row, index) : {}}
                    >
                      {columns.map((column, index1) => (
                        <BaseTable.Td
                          key={index1}
                          className={classes.td}
                          style={{ textAlign: column.align || "left" }}
                          {...(selectedRows.includes(index) && {
                            "data-selected": true,
                          })}
                          onClick={(e) =>
                            setSelectedRows(e.currentTarget && [index])
                          }
                        >
                          <div style={{ whiteSpace: "nowrap" }}>
                            {column.render(row, index + (page - 1) * limit)}
                          </div>
                        </BaseTable.Td>
                      ))}
                    </BaseTable.Tr>
                  );
                })
              ) : (
                <BaseTable.Tr>
                  <BaseTable.Td colSpan={columns.length} className={classes.td}>
                    <Box className={classes.empty}>
                      <IconDatabaseOff
                        size={33}
                        stroke={1.6}
                        color="var(--mantine-color-blue-4)"
                      />
                      <Text
                        style={(theme) => ({
                          color: "var(--mantine-color-blue-6)",
                        })}
                        w={500}
                        fz="md"
                        ta="center"
                      >
                        Мэдээлэл байхгүй байна
                      </Text>
                    </Box>
                  </BaseTable.Td>
                </BaseTable.Tr>
              )}
            </BaseTable.Tbody>
          </BaseTable>
        </div>
      </div>
      {pagination && limit < data?.count && (
        <>
          {data?.count ? (
            <div className={classes.pagination}>
              <Pagination
                size="sm"
                value={currentPage}
                onChange={(nextPage) => setPage(nextPage)}
                total={data.count / limit + (data.count % limit > 0 ? 1 : 0)}
                color="blue"
              />
            </div>
          ) : null}
        </>
      )}
    </>
  );
}
