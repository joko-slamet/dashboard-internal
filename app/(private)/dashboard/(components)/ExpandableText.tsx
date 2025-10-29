"use client";

import { useState } from "react";

export default function ExpandableText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);

  const isLong = text.length > 120; // bisa disesuaikan sesuai panjang ideal

  return (
    <div className="text-white max-w-xs">
      <p
        className={`text-sm text-gray-200 transition-all duration-200 ${
          expanded ? "line-clamp-none" : `line-clamp-3`
        }`}
      >
        {text}
      </p>

      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-400 hover:text-blue-300 text-xs mt-1 underline cursor-pointer"
        >
          {expanded ? "See less" : "See more"}
        </button>
      )}
    </div>
  );
}
