import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const STATUS_OPTIONS = [
  {
    label: "IT",
    value: "it",
  },
  {
    label: "Operational",
    value: "operational",
  },
  {
    label: "Academic",
    value: "academic",
  },
  {
    label: "Student",
    value: "student",
  },
];
export function ScopeDropdown({
  current,
  onChange,
  disabled,
}: {
  current: string;
  onChange: (status: string) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className={`px-3 py-1 rounded-md text-sm font-medium flex items-center gap-2 transition-all ${getButtonStyle(
          current
        )} ${
          disabled ? "opacity-60 cursor-not-allowed" : "hover:brightness-110"
        }`}
      >
        {STATUS_OPTIONS.find((s) => s.value === current)?.label || "Unknown"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute z-20 mt-1 w-40 rounded-md bg-[#1e293b] border border-gray-600 shadow-lg"
          >
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s.value}
                onClick={() => {
                  setOpen(false);
                  onChange(s.value);
                }}
                className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                  s.value === current
                    ? getButtonStyle(s.value) + " cursor-default"
                    : "text-gray-300 hover:bg-[#334155]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function getButtonStyle(status: string) {
  switch (status) {
    case "todo":
      return "text-red-400 bg-red-500/10 border border-red-500/30";
    case "on_progress":
      return "text-yellow-400 bg-yellow-500/10 border border-yellow-400/30";
    case "finish":
      return "text-green-400 bg-green-500/10 border border-green-500/30";
    default:
      return "text-gray-300 bg-gray-700 border border-gray-600";
  }
}
