"use client";

import SearchFilterInput from "@/components/filter/search-filter-input";
import Orders from "@/data/orders";
import { StyleProvider } from "@ant-design/cssinjs";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, Table, TableColumnType } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const dataSource = Orders.slice(0, 4).map((order) => ({
  key: order.id,
  orderId: order.id,
  date: dayjs(order.createdAt).format("DD MMM YYYY"),
  items: order.products.length,
  status: order.status,
  amount: order.total,
}));

const columns: TableColumnType[] = [
  {
    title: "Order Id",
    key: "orderId",
    dataIndex: "orderId",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Items",
    dataIndex: "items",
    key: "items",
    sorter: (a, b) => a.items - b.items,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Amount ($)",
    dataIndex: "amount",
    key: "amount",
    sorter: (a, b) => a.amount - b.amount,
  },
];

export default function OrdersPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return;

  return (
    <AntdRegistry>
      <StyleProvider layer>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBorderRadius: 0,
                headerSplitColor: "white",
              },
            },
          }}
        >
          <title>Your Orders</title>
          <div className="maximum-width space-y-5 pt-5">
            <h3 className="text-lg font-medium sm:text-2xl md:text-3xl">
              Order History
            </h3>
            <div className="flex flex-col gap-5 sm:flex-row">
              <SearchFilterInput />
            </div>

            <Table
              dataSource={dataSource}
              components={{
                header: {
                  cell: (properties: {
                    children: React.ReactNode;
                    className?: string;
                    [key: string]: any;
                  }) => (
                    <td
                      {...properties}
                      className="border-x-0 border-y-2 border-black py-2 text-center"
                    >
                      {properties.children}
                    </td>
                  ),
                },
              }}
              bordered
              columns={columns}
              pagination={{ pageSize: 50 }}
              scroll={{
                y: 240,
              }}
            />
          </div>
        </ConfigProvider>
      </StyleProvider>
    </AntdRegistry>
  );
}
