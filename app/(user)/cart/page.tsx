"use client";

import Products from "@/data/products";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function CartPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return;

  return (
    <div className="maximum-width flex *:pt-5">
      <div className="flex-1">
        <h2 className="main-heading">My Cart</h2>
        <div className="overflow-x-auto">
          <table className="dui-table">
            {/* head */}
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{Products[0].name}</td>
                <div className="flex border-2 border-primary/50 p-1 *:h-full *:px-1">
                  <button className="transition-colors hover:bg-tertiary">
                    <FaPlus />
                  </button>
                  <input
                    type="number"
                    name=""
                    className="w-10 flex-1 text-center outline-none"
                    id=""
                    value={1}
                    max="999"
                  />
                  <button className="transition-colors hover:bg-tertiary">
                    <FaMinus />
                  </button>
                </div>
                <td>${Products[0].price}</td>
              </tr>
              <tr>
                <td>{Products[0].name}</td>
                <td>${Products[0].price}</td>
                <td>${Products[0].price}</td>
              </tr>
              <tr>
                <td>{Products[0].name}</td>
                <td>${Products[0].price}</td>
                <td>${Products[0].price}</td>
              </tr>
              <tr>
                <td>{Products[0].name}</td>
                <td>1</td>
                <td>${Products[0].price}</td>
                <td>${Products[0].price}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-tertiary px-5"></div>
    </div>
  );
}
