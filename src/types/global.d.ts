/* eslint-disable @typescript-eslint/no-explicit-any */

type StandardResponse = {
  data: any;
  status: number;
};

type Product = {
  id: number;
  item_name: string;
  quantity: number;
  type: string;
};

type Sale = {
  item_name: string;
  quantity: number;
  sold_at: Date;
};
