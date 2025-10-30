"use client";
import {  Typography } from "@material-tailwind/react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@material-tailwind/react";
import { dateFormatter } from "@/lib/function/formatter";
import { StatusDropdown } from "./(components)/StatusDropdown";
import ExpandableText from "./(components)/ExpandableText";
import { ScopeDropdown } from "./(components)/ScopeDropdown";

type Bug = {
  id: number;
  title: string;
  status: string;
  assignedTo: string;
  message_text: string;
  category: string;
  created_at: string;
  updated: string;
};

interface ResponseComplain {
  data: Bug[];
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default function DashboardPage() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["bugs"],
    queryFn: async (): Promise<ResponseComplain> => {
      const res = await api.get("/complaints");
      return res.data;
    },
    retry: false,
  });

  const updateBugStatus = async ({
    id,
    status,
  }: {
    id: number;
    status: string;
  }) => {
    const res = await api.post(`/complaints/${id}/status`, {
      to_status: status,
    });
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: updateBugStatus,
    onSuccess: () => {
      // refetch data setelah update berhasil
      queryClient.invalidateQueries({ queryKey: ["bugs"] });
    },
    onError: (error) => {
      console.error("Gagal update status:", error);
    },
  });

  return (
    <div className="min-h-screen bg-[#0f172a] p-8 text-gray-100">
      <Typography variant="h4" className="mb-6 font-semibold text-white">
        🧩 IT Helpdesk System
      </Typography>

      {/* <Card className="bg-[#1e293b] border border-gray-700 shadow-xl">
        <CardBody className="overflow-auto p-6"> */}
      {/* LOADING */}

      {/* DATA TABLE */}
      {!isLoading && !isError && data && (
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-700 text-left text-gray-300">
              <th className="p-3 font-medium">ID</th>
              <th className="p-3 font-medium">Complain Report</th>
              <th className="p-3 font-medium">Error Source</th>
              <th className="p-3 font-medium">Category</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium">Created At</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.length > 0 ? (
              data?.data.map((item, idx) => {
                const isUpdating =
                  mutation.isPending && mutation.variables?.id === item.id;
                return (
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
                    <td className="p-3">
                      <ScopeDropdown
                        current={item.status}
                        onChange={(status) =>
                          console.log(
                            `Change scope of bug ID ${item.id} to ${status}`
                          )
                        }
                        // disabled={mutation.isPending}
                      />
                    </td>
                    <td className="p-3 text-white uppercase">
                      <span className="rounded-full bg-blue-400 px-2 py-1 font-bold text-sm">
                        {item.category}
                      </span>
                    </td>
                    {/* STATUS — editable */}
                    {/* Custom Select */}
                    <td className="p-3">
                      {isUpdating ? (
                        <div className="flex items-center space-x-2">
                          <Spinner className="h-4 w-4 text-blue-400 animate-spin" />
                          <span className="text-xs text-gray-300">
                            Updating...
                          </span>
                        </div>
                      ) : (
                        <StatusDropdown
                          current={item.status}
                          onChange={(status) => {
                            mutation.mutate({ id: item.id, status });
                          }}
                          disabled={mutation.isPending}
                        />
                      )}
                    </td>

                    <td className="p-3 text-white">
                      {dateFormatter(item.created_at)}
                    </td>
                  </tr>
                );
              })
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
      {/* </CardBody>
      </Card> */}

      {isLoading && (
        <div className="flex items-center justify-center py-10">
          <Spinner className="h-6 w-6 text-blue-400" />
          <span className="ml-2 text-gray-300 text-sm">Memuat data bug...</span>
        </div>
      )}

      {/* ERROR */}
      {isError && (
        <div className="text-center text-red-400 py-8">
          Gagal memuat data bug. Pastikan server API aktif.
        </div>
      )}
    </div>
  );
}
