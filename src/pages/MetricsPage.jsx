import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import { Line, Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, PointElement, LineElement, TimeScale, Tooltip, Legend } from "chart.js";
import Papa from "papaparse";

Chart.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, TimeScale, Tooltip, Legend);

export default function MetricsPage() {
  const { urlId } = useParams();
  const [metrics, setMetrics] = useState([]);
  const [urlInfo, setUrlInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMetrics = async () => {
      const { data: urlData } = await supabase
        .from("monitored_urls")
        .select("*")
        .eq("id", urlId)
        .single();

      setUrlInfo(urlData);

      const { data: metricsData } = await supabase
        .from("url_metrics")
        .select("*")
        .eq("url_id", urlId)
        .order("checked_at", { ascending: true });

      setMetrics(metricsData);
      setLoading(false);
    };

    fetchMetrics();
  }, [urlId]);

  const exportToCSV = () => {
    const csv = Papa.unparse(metrics);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${urlInfo.url.replace(/https?:\/\//, "")}_metrics.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (ts) => new Date(ts).toLocaleString();

  const avgLoadTime =
    metrics.length > 0
      ? Math.round(metrics.reduce((sum, m) => sum + (m.load_time_ms || 0), 0) / metrics.length)
      : 0;

  const totalDowntime = metrics.filter((m) => m.status !== "Up").length;
  const alertCount = metrics.filter((m) => m.status !== "Up" && m.status !== "Unknown").length;

  if (loading) return <div className="p-8 text-center">Loading metrics...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-6xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">{urlInfo?.name || urlInfo?.url}</h1>
          <p className="text-gray-600 text-sm">{urlInfo?.url}</p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
        >
          ← Back
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6 text-sm">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-600">Avg Load Time</div>
          <div className="text-lg font-bold">{avgLoadTime} ms</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-600">Total Downtime Events</div>
          <div className="text-lg font-bold">{totalDowntime}</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-600">Alerts Sent</div>
          <div className="text-lg font-bold">{alertCount}</div>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="flex justify-between mb-2">
          <h2 className="text-lg font-semibold">Load Time (ms)</h2>
        </div>
        <Line
          data={{
            labels: metrics.map((m) => formatDate(m.timestamp)),
            datasets: [
              {
                label: "Load Time",
                data: metrics.map((m) => m.load_time_ms),
                borderColor: "rgb(99, 102, 241)",
                backgroundColor: "rgba(99, 102, 241, 0.1)",
              },
            ],
          }}
        />
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Response Size (KB)</h2>
        <Line
          data={{
            labels: metrics.map((m) => formatDate(m.timestamp)),
            datasets: [
              {
                label: "Response Size",
                data: metrics.map((m) => m.response_size_bytes / 1024),
                borderColor: "rgb(16, 185, 129)",
                backgroundColor: "rgba(16, 185, 129, 0.1)",
              },
            ],
          }}
        />
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">HTTP Status Codes</h2>
        <Bar
          data={{
            labels: metrics.map((m) => formatDate(m.timestamp)),
            datasets: [
              {
                label: "HTTP Status",
                data: metrics.map((m) => m.http_status),
                backgroundColor: "rgba(255, 99, 132, 0.6)",
              },
            ],
          }}
        />
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Uptime Status Timeline</h2>
        <Line
          data={{
            labels: metrics.map((m) => formatDate(m.timestamp)),
            datasets: [
              {
                label: "Status (Up = 1, Down = 0)",
                data: metrics.map((m) =>
                  m.status === "Up" ? 1 : m.status === "Invalid Content" ? 0.5 : 0
                ),
                borderColor: "rgb(245, 158, 11)",
                backgroundColor: "rgba(245, 158, 11, 0.2)",
              },
            ],
          }}
          options={{
            scales: {
              y: {
                ticks: {
                  callback: (val) => {
                    if (val === 1) return "Up";
                    if (val === 0.5) return "Invalid";
                    return "Down";
                  },
                  stepSize: 0.5,
                },
              },
            },
          }}
        />
      </div>

      <div className="text-right">
        <button
          onClick={exportToCSV}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          Export CSV
        </button>
      </div>
    </div>
  );
}
