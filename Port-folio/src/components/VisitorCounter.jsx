import { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import { apiRequest } from "../lib/api";

export default function VisitorCounter() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let active = true;
    const event = sessionStorage.getItem("portfolio_page_view") ? null : "page_view";
    const load = async () => {
      try {
        const result = event
          ? await apiRequest("/api/visitor", {
              method: "POST",
              body: JSON.stringify({ event }),
            })
          : await apiRequest("/api/visitor");
        if (event) sessionStorage.setItem("portfolio_page_view", "1");
        if (active) setData(result);
      } catch {
        if (active) setData(null);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  if (!data) return null;
  const since = data.since
    ? new Date(data.since).toLocaleDateString(undefined, {
        month: "short",
        year: "numeric",
      })
    : "launch";
  return (
    <span
      className="inline-flex items-center gap-2 font-mono text-xs text-faint"
      title={data.methodology}
    >
      <FiEye aria-hidden="true" />
      {Number(data.uniqueVisitors || 0).toLocaleString()} unique visitors since {since}
    </span>
  );
}
