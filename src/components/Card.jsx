import React from "react";

function Card({ title, description, location, status }) {
  // Normalize incoming status to expected keys
  const s = (status || "").toString().toLowerCase();

  // Map canonical status -> styles & display text
  const map = {
    pending: {
      class: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-700/50 shadow-sm",
      label: "Pending",
    },
    in_progress: {
      class: "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-300 dark:border-blue-700/50 shadow-sm",
      label: "In Progress",
    },
    "in-progress": {
      class: "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-300 dark:border-blue-700/50 shadow-sm",
      label: "In Progress",
    },
    resolved: {
      class: "bg-green-100 text-green-800 dark:bg-green-950/60 dark:text-green-300 border border-green-300 dark:border-green-700/50 shadow-sm",
      label: "Solved",
    },
    complete: {
      class: "bg-green-100 text-green-800 dark:bg-green-950/60 dark:text-green-300 border border-green-300 dark:border-green-700/50 shadow-sm",
      label: "Solved",
    },
  };

  const statusInfo = map[s] || {
    class: "bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-300 border border-gray-200 dark:border-slate-700",
    label: s || "Unknown",
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-800/90 rounded-2xl shadow-md p-6 flex flex-col border border-gray-200 dark:border-slate-700/80 hover:border-blue-400/50 dark:hover:border-blue-500/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
      {/* Title */}
      <h3 className="font-extrabold text-2xl text-gray-900 dark:text-white mb-3 tracking-wide transition-colors">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-700 dark:text-slate-300 mb-5 leading-relaxed line-clamp-3 transition-colors">
        {description}
      </p>

      {/* Meta Info */}
      <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-100 dark:border-slate-700/50">
        <p className="text-sm text-gray-600 dark:text-slate-400 flex items-center gap-1.5 transition-colors">
          <span className="text-base">📍</span>
          <span className="italic">{location || "—"}</span>
        </p>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-colors duration-200 ${statusInfo.class}`}
        >
          {statusInfo.label}
        </span>
      </div>
    </div>
  );
}

export default Card;
