/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import SheetComponent from "./SheetComponent";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "item_name",
    header: "Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "change",
    header: () => <div className="text-right"></div>,
    cell: ({ row, table }) => {
      //@ts-ignore
      const refetch = table.options.meta?.refetch;
      return (
        <div className="flex items-end justify-end">
          <SheetComponent rowValue={row} refetch={refetch} />
        </div>
      );
    },
  },
];
