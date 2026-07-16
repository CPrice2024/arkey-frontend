import React, {
  useEffect,
  useState,
  useCallback,
} from "react";
import api from "../../api";
import { Check, X, Clock} from "lucide-react";
import "../../styles/DepositsPage.css";

const DepositsPage = () => {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [report, setReport] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [processors, setProcessors] = useState({
  admins: [],
  agents: [],
});
  const [processedBy, setProcessedBy] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

const fetchDeposits = useCallback(async () => {
  try {
    setLoading(true);

    const res = await api.get("/deposits", {
      params: {
        status: filter,
        processedBy,
        startDate,
        endDate,
        search,
        page,
      },
    });

    setDeposits(res.data.deposits || []);
    setPagination(res.data.pagination);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
}, [
  filter,
  processedBy,
  startDate,
  endDate,
  search,
  page,
]);
const fetchReport = useCallback(async () => {
  try {
    const res = await api.get("/deposits/stats/summary", {
      params: {
        status: filter,
        processedBy,
        startDate,
        endDate,
        search,
      },
    });

    setReport(res.data);
  } catch (err) {
    console.log(err);
  }
}, [
  filter,
  processedBy,
  startDate,
  endDate,
  search,
]);
const [notification, setNotification] = useState({
  show: false,
  type: "",
  message: "",
});
const showNotification = (type, message) => {
  setNotification({
    show: true,
    type,
    message,
  });

  setTimeout(() => {
    setNotification({
      show: false,
      type: "",
      message: "",
    });
  }, 3000);
};

const applyFilters = () => {
  setPage(1);
};

const resetFilters = () => {

  setFilter("all");
  setProcessedBy("all");
  setStartDate("");
  setEndDate("");
  setSearch("");
  setPage(1);

};
  const approveDeposit = async (id) => {
    try {
      await api.put(`/deposits/${id}/approve`);

await fetchDeposits();
await fetchReport();

showNotification(
  "success",
  "Deposit approved successfully"
);
    } catch (error) {
      console.log(error);
      showNotification(
  "error",
  "Failed to approve deposit"
);
    }
  };

  const rejectDeposit = async (id) => {
    try {
      await api.put(`/deposits/${id}/reject`);

await fetchDeposits();
await fetchReport();

showNotification(
  "success",
  "Deposit rejected successfully"
);
    } catch (error) {
      console.log(error);
      showNotification(
  "error",
  "Failed to reject deposit"
);
    }
  };


  const getStatusIcon = (status) => {
    switch (status) {
      case "approved": return <Check size={14} />;
      case "rejected": return <X size={14} />;
      default: return <Clock size={14} />;
    }
  };

const fetchProcessors = useCallback(async () => {
  try {
    const res = await api.get("/deposits/processors");
    setProcessors(res.data);
  } catch (err) {
    console.log(err);
  }
}, []);

useEffect(() => {
  fetchProcessors();
}, [fetchProcessors]);

useEffect(() => {
  fetchDeposits();
  fetchReport();
}, [fetchDeposits, fetchReport]);



  const getStatusClass = (status) => {
    switch (status) {
      case "approved": return "status-badge approved";
      case "rejected": return "status-badge rejected";
      default: return "status-badge pending";
    }
  };

  return (
    <div className="deposits-container">
      <div className="deposits-wrapper">
        {notification.show && (
  <div
    className={`toast-notification ${
      notification.type === "success"
        ? "toast-success"
        : "toast-error"
    }`}
  >
    {notification.type === "success" ? (
      <Check size={18} />
    ) : (
      <X size={18} />
    )}

    <span>{notification.message}</span>
  </div>
)}
       
        {/* Header */}
        <div className="deposits-header">
          <h1 className="deposits-title">Deposits</h1>
          <p className="deposits-subtitle">Manage user deposits</p>
        </div>
        <div className="report-grid">

  <div className="report-card">
    <h4>Today</h4>
    <h2>{report?.today?.amount || 0} ETB</h2>
    <p>{report?.today?.count || 0} Deposits</p>
  </div>

  <div className="report-card">
    <h4>This Week</h4>
    <h2>{report?.week?.amount || 0} ETB</h2>
    <p>{report?.week?.count || 0} Deposits</p>
  </div>

  <div className="report-card">
    <h4>This Month</h4>
    <h2>{report?.month?.amount || 0} ETB</h2>
    <p>{report?.month?.count || 0} Deposits</p>
  </div>
  <div className="report-card total">

  <h4>Total</h4>

  <h2>{report?.all?.amount || 0} ETB</h2>

  <p>{report?.all?.count || 0} Deposits</p>

</div>

  <div className="report-card approved">
    <h4>Total Approved</h4>
    <h2>{report?.approved?.amount || 0} ETB</h2>
    <p>{report?.approved?.count || 0} Deposits</p>
  </div>

  <div className="report-card pending">
    <h4>Pending</h4>
    <h2>{report?.pending?.amount || 0} ETB</h2>
    <p>{report?.pending?.count || 0} Deposits</p>
  </div>

  <div className="report-card rejected">
    <h4>Rejected</h4>
    <h2>{report?.rejected?.amount || 0} ETB</h2>
    <p>{report?.rejected?.count || 0} Deposits</p>
  </div>

</div>
<div className="report-filter">

  <div className="date-input">

    <label>Start Date</label>

    <input
      type="date"
      value={startDate}
      onChange={(e) =>
        setStartDate(e.target.value)
      }
    />

  </div>

  <div className="date-input">

    <label>End Date</label>

    <input
      type="date"
      value={endDate}
      onChange={(e) =>
        setEndDate(e.target.value)
      }
    />

  </div>

  <button
  className="apply-filter-btn"
  onClick={applyFilters}
>
  Apply Filter
</button>

</div>
{report?.custom && (

<div className="report-card custom">

<h4>Custom Report</h4>

<h2>{report.custom.amount} ETB</h2>

<p>{report.custom.count} Deposits</p>

</div>

)}
<div className="search-filter-row">

  <div className="search-box">

    <input
      className="search-input"
      placeholder="Search username, transaction ID..."
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
    />

  </div>

  <div className="processor-box">

    <select
  value={processedBy}
  onChange={(e) => setProcessedBy(e.target.value)}
  className="filter-select"
>
  <option value="all">
     All Processors
  </option>

  <optgroup label="Admins">
    {processors.admins.map((admin) => (
      <option
        key={admin._id}
        value={admin.username}
      >
        {admin.username}
      </option>
    ))}
  </optgroup>

  <optgroup label="Agents">
    {processors.agents.map((agent) => (
      <option
        key={agent._id}
        value={agent.username}
      >
        {agent.username}
      </option>
    ))}
  </optgroup>
</select>

  </div>

  <button
      className="apply-filter-btn"
      onClick={applyFilters}
  >
      Apply
  </button>

  <button
      className="reset-filter-btn"
      onClick={resetFilters}
  >
      Reset
  </button>

</div>
       
{loading ? (

<div className="deposits-table-wrapper">

<table className="deposits-table">

<thead>

<tr>

<th>User</th>
<th>Phone</th>
<th>Method</th>
<th>Amount</th>
<th>Deposit No</th>
<th>Transaction ID</th>
<th>Processed By</th>
<th>Date & Time</th>
<th>Status</th>
<th>Action</th>

</tr>

</thead>

<tbody>

{[...Array(8)].map((_, index) => (

<tr key={index}>

<td><div className="skeleton skeleton-text"></div></td>
<td><div className="skeleton skeleton-text"></div></td>
<td><div className="skeleton skeleton-text"></div></td>
<td><div className="skeleton skeleton-text"></div></td>
<td><div className="skeleton skeleton-text"></div></td>
<td><div className="skeleton skeleton-text"></div></td>
<td><div className="skeleton skeleton-text"></div></td>
<td><div className="skeleton skeleton-text"></div></td>
<td><div className="skeleton skeleton-status"></div></td>
<td><div className="skeleton skeleton-btn"></div></td>

</tr>

))}

</tbody>

</table>

</div>

  
) : deposits.length === 0 ? (

  <p className="empty-state">
    No deposits found
  </p>

) : (

  <>
  <div className="deposits-table-wrapper">
    <table className="deposits-table">
      <thead>
        <tr>
          <th>User</th>
          <th>Phone</th>
          <th>Method</th>
          <th>Amount</th>
          <th>Deposit No</th>
          <th>Transaction ID</th>
           <th>Processed By</th>
          <th>Date & Time</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {deposits.map((d) => (
          <tr key={d._id}>
            <td>{d.username}</td>
            <td>{d.phone || "-"}</td>
            <td>{d.method}</td>
            <td>{d.amount || 0} Birr</td>
            <td>{d.depositNumber}</td>
            <td>{d.transactionId || "-"}</td>
            <td>
  {d.status === "approved" ? (
    <>
      <strong>{d.approvedByName || "Unknown"}</strong>
      <br />
      <small>{d.processedByRole}</small>
    </>
  ) : d.status === "rejected" ? (
    <>
      <strong>{d.rejectedByName || "Unknown"}</strong>
      <br />
      <small>{d.processedByRole}</small>
    </>
  ) : (
    "-"
  )}
</td>
<td>
  <div className="date-time">
    <strong>
      {new Date(d.createdAt).toLocaleDateString()}
    </strong>
    <br />
    <small>
      {new Date(d.createdAt).toLocaleTimeString()}
    </small>
  </div>
</td>

            <td>
              <span className={getStatusClass(d.status)}>
                {getStatusIcon(d.status)}
                {d.status}
              </span>
            </td>

            <td>
              {d.status === "pending" ? (
                <div className="table-actions">
                  <button
                    onClick={() => approveDeposit(d._id)}
                    className="approve-btn"
                  >
                    <Check size={14} />
                    Approve
                  </button>

                  <button
                    onClick={() => rejectDeposit(d._id)}
                    className="reject-btn"
                  >
                    <X size={14} />
                    Reject
                  </button>
                </div>
              ) : (
                "-"
              )}
            </td>
          </tr>
        ))}
      </tbody>
      </table>

</div>

<div className="um-pagination">

<button
disabled={page===1}
className="um-page-btn"
onClick={() => setPage((p) => p - 1)}
>
Previous
</button>

<h3 >

Page {pagination?.currentPage || 1}

of

{pagination?.totalPages || 1}

</h3>

<button
disabled={page >= (pagination?.totalPages || 1)}
className="um-page-btn"
onClick={() => setPage((p) => p + 1)}
>
Next
</button>

</div>

</>

)}
      </div>
    </div>
  );
};

export default DepositsPage;