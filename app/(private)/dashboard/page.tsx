"use client";
import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@material-tailwind/react";
import { data } from "./constant";
import { Chip } from "@material-tailwind/react";
import { dateFormatter } from "@/lib/function/formatter";
import { StatusDropdown } from "./(components)/StatusDropdown";
import ExpandableText from "./(components)/ExpandableText";

type Bug = {
  id: number;
  title: string;
  status: string;
  assignedTo: string;
  updated: string;
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API,
  headers: { "Content-Type": "application/json" },
});

export default function DashboardPage() {
  const token = getCookie("token");
  const isLoading = false;
  const isError = false;
  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["bugs"],
  //   queryFn: async (): Promise<Bug[]> => {
  //     const res = await api.get("/bugs", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     return res.data;
  //   },
  //   retry: false,
  // });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo":
        return "text-red-400 bg-red-500/10 border border-red-400/30";
      case "on_progress":
        return "text-yellow-400 bg-yellow-500/10 border border-yellow-400/30";
      case "finish":
        return "text-green-400 bg-green-500/10 border border-green-400/30";
      default:
        return "text-gray-300 bg-gray-700/50";
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] p-8 text-gray-100">
      <Typography variant="h4" className="mb-6 font-semibold text-white">
        🧩 Bug Tracking Dashboard
      </Typography>

      <Card className="bg-[#1e293b] border border-gray-700 shadow-xl">
        <CardBody className="overflow-x-auto p-6">
          {/* LOADING */}
          {isLoading && (
            <div className="flex items-center justify-center py-10">
              <Spinner className="h-6 w-6 text-blue-400" />
              <span className="ml-2 text-gray-300 text-sm">
                Memuat data bug...
              </span>
            </div>
          )}

          {/* ERROR */}
          {isError && (
            <div className="text-center text-red-400 py-8">
              Gagal memuat data bug. Pastikan server API aktif.
            </div>
          )}

          {/* DATA TABLE */}
          {!isLoading && !isError && data && (
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-left text-gray-300">
                  <th className="p-3 font-medium">ID</th>
                  <th className="p-3 font-medium">Complain Report</th>
                  <th className="p-3 font-medium">Category</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium">Created At</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item, idx) => (
                    <tr
                      key={item.id}
                      className={`${
                        idx % 2 === 0 ? "bg-[#1e293b]" : "bg-[#273449]"
                      } hover:bg-[#334155] transition-colors`}
                    >
                      <td className="px-3 text-white">{item.id}</td>
                      <td className="px-3">
                        <ExpandableText text={item.message_text} />
                      </td>
                      <td className="p-3 text-white uppercase">
                        <span className="rounded-full bg-blue-400 px-2 py-1 font-bold text-sm">
                          {item.category}
                        </span>
                      </td>
                      {/* STATUS — editable */}
                      {/* Custom Select */}
                      <td className="p-3">
                        <StatusDropdown
                          current={item.status}
                          onChange={(status) => {
                            console.log(
                              `Change status of bug ID ${item.id} to ${status}`
                            );
                          }}
                          // onChange={(status) =>
                          //   mutation.mutate({ id: item.id, status })
                          // }
                          // disabled={mutation.isPending}
                        />
                      </td>

                      <td className="p-3 text-white">
                        {dateFormatter(item.created_at)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-400 py-6">
                      Tidak ada bug ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
