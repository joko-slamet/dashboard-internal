"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { FiMessageSquare, FiClock, FiUsers, FiLogIn } from "react-icons/fi";
import { getCookie } from "cookies-next";

export default function LandingPage() {
  const isLogin = getCookie("token-ticketing");
  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 flex flex-col">
      {/* HEADER */}
      <header className="flex justify-between items-center px-8 py-4 border-b border-gray-800">
        <h1 className="text-xl font-semibold text-white">
          💬 IT Helpdesk System
        </h1>
      </header>

      {/* HERO */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-20 grow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Centralized{" "}
            <span className="text-blue-400">IT Ticketing Dashboard</span>
          </h2>
          <p className="text-gray-400 mb-8 text-base">
            Manage all internal requests, complaints, and technical issues in
            one place. Streamline communication and improve response times
            across your organization.
          </p>
          <Link href="/login">
            <Button
              color="blue"
              size="lg"
              className="flex items-center gap-2 px-6 py-3 text-sm font-semibold cursor-pointer"
            >
              <FiLogIn className="h-4 w-4" />{" "}
              {isLogin ? "Go to Dashboard" : "Login"}
            </Button>
          </Link>
        </motion.div>

        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          src="/it-help-desk.png"
          alt="IT Helpdesk Illustration"
          className="w-[380px] md:w-72 mt-10 md:mt-0"
        />
      </section>

      {/* FEATURES */}
      <section className="px-10 md:px-20 py-16 bg-[#1e293b] border-t border-gray-800">
        <Typography
          variant="h5"
          className="text-center text-gray-100 mb-10 font-semibold"
        >
          Why use IT Helpdesk Portal?
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="bg-[#273449] border border-gray-700 hover:bg-[#334155] transition-all duration-200">
                <CardBody className="p-6 flex flex-col items-center text-center">
                  <feature.icon className="h-10 w-10 text-blue-400 mb-3" />
                  <Typography variant="h6" className="text-gray-100 mb-2">
                    {feature.title}
                  </Typography>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center border-t border-gray-800 text-gray-500 text-sm">
        © 2025 IT Helpdesk Portal — Kobi Education. All rights reserved.
      </footer>
    </div>
  );
}

const features = [
  {
    icon: FiMessageSquare,
    title: "Centralized Communication",
    desc: "All complaints, requests, and error reports from WhatsApp are managed in one dashboard.",
  },
  {
    icon: FiClock,
    title: "Faster Response",
    desc: "Prioritize and assign tickets instantly, ensuring quick resolution and accountability.",
  },
  {
    icon: FiUsers,
    title: "Collaborative IT Workflow",
    desc: "Empower your IT team to coordinate, track progress, and close tickets efficiently.",
  },
];
