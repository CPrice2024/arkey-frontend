import React, {
  useEffect,
  useState,
  useCallback,
} from "react";
import api from "../../api";
import { RefreshCw, Check, X, Clock} from "lucide-react";
import "../../styles/DepositsPage.css";

const WithdrawalsPage = () => {

const [withdrawals, setWithdrawals] = useState([]);

const [loading, setLoading] = useState(false);

const [filter, setFilter] = useState("all");

const [search, setSearch] = useState("");

const [searchText, setSearchText] = useState("");

const [processor, setProcessor] = useState("all");

const [processors, setProcessors] = useState({
  admins: [],
  agents: [],
});

const [summary, setSummary] = useState(null);

const [startDate, setStartDate] = useState("");

const [endDate, setEndDate] = useState("");

const [page, setPage] = useState(1);

const [pagination, setPagination] = useState({});

const fetchWithdrawals = useCallback(async () => {
  try {
    setLoading(true);

    const res = await api.get("/withdrawals", {
      params: {
        page,
        status: filter,
        search,
        processedBy: processor,
        startDate,
        endDate,
      },
    });

    setWithdrawals(res.data.withdrawals || []);
    setPagination(res.data.pagination || {});
  } catch (error) {
    console.log(error);
    setWithdrawals([]);
  } finally {
    setLoading(false);
  }
}, [
  page,
  filter,
  search,
  processor,
  startDate,
  endDate,
]);

const fetchSummary = useCallback(async () => {
  try {
    const res = await api.get(
      "/withdrawals/stats/summary",
      {
        params: {
          status: filter,
          search,
          processedBy: processor,
          startDate,
          endDate,
        },
      }
    );

    setSummary(res.data);
  } catch (error) {
    console.log(error);
  }
}, [
  filter,
  search,
  processor,
  startDate,
  endDate,
]);

const fetchProcessors = useCallback(async () => {
  try {
    const res = await api.get("/withdrawals/processors");
    setProcessors(res.data);
  } catch (error) {
    console.log(error);
  }
}, []);

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

useEffect(() => {
  fetchWithdrawals();
  fetchSummary();
}, [fetchWithdrawals, fetchSummary]);

useEffect(() => {
  fetchProcessors();
}, [fetchProcessors]);

const approveWithdrawal = async (id) => {

  try {

    await api.put(`/withdrawals/${id}/approve`);

await Promise.all([
  fetchWithdrawals(),
  fetchSummary(),
]);

    showNotification(
  "success",
  "Withdrawal approved successfully"
);

  } catch (error) {

    console.log(error);

    showNotification(
  "error",
  error.response?.data?.message ||
  "Failed to approve withdrawal"
);

  }
};

 const rejectWithdrawal = async (id) => {

  try {

    await api.put(`/withdrawals/${id}/reject`);

await Promise.all([
  fetchWithdrawals(),
  fetchSummary(),
]);

    showNotification(
  "error",
  "Withdrawal rejected"
);

  } catch (error) {

    console.log(error);

    showNotification(
  "error",
  error.response?.data?.message ||
  "Failed to reject withdrawal"
);

  }
};
useEffect(() => {

    const timer = setTimeout(() => {

        setSearch(searchText);

        setPage(1);

    }, 500);

    return () => clearTimeout(timer);

}, [searchText]);


  const getStatusIcon = (status) => {
    switch (status) {
      case "approved": return <Check size={14} />;
      case "rejected": return <X size={14} />;
      default: return <Clock size={14} />;
    }
  };

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
          <h1 className="deposits-title">Withdrawals</h1>
          <p className="deposits-subtitle">Manage user withdrawals</p>
        </div>

        {/* Report Cards */}

<div className="report-grid">

  <div className="report-card">
    <h4>Today</h4>
    <h2>{summary?.today?.amount || 0} ETB</h2>
    <p>{summary?.today?.count || 0} Withdrawals</p>
  </div>

  <div className="report-card">
    <h4>This Week</h4>
    <h2>{summary?.week?.amount || 0} ETB</h2>
    <p>{summary?.week?.count || 0} Withdrawals</p>
  </div>

  <div className="report-card">
    <h4>This Month</h4>
    <h2>{summary?.month?.amount || 0} ETB</h2>
    <p>{summary?.month?.count || 0} Withdrawals</p>
  </div>

  <div className="report-card">
    <h4>Total</h4>
    <h2>{summary?.all?.amount || 0} ETB</h2>
    <p>{summary?.all?.count || 0} Withdrawals</p>
  </div>

</div>

        {/* Filters */}
        <div className="search-filter-row">

  <input
    type="text"
    placeholder="Search username, account..."
    value={searchText}
    onChange={(e)=>{
    setSearchText(e.target.value);
}}
    className="search-input"
  />

  <select
    value={processor}
    onChange={(e) => {
      setProcessor(e.target.value);
      setPage(1);
    }}
    className="filter-select"
  >

    <option value="all">
      All Processors
    </option>

    <optgroup label="Admins">

      {processors.admins.map(admin => (

        <option
          key={admin._id}
          value={admin.username}
        >
          {admin.username}
        </option>

      ))}

    </optgroup>

    <optgroup label="Agents">

      {processors.agents.map(agent => (

        <option
          key={agent._id}
          value={agent.username}
        >
          {agent.username}
        </option>

      ))}

    </optgroup>

  </select>
  <div className="report-filter">
<div className="date-input">

    <label>Start Date</label>
  <input
    type="date"
    value={startDate}
    onChange={(e) => {
      setStartDate(e.target.value);
      setPage(1);
    }}
   
  />
   </div>
<div className="date-input">

    <label>End Date</label>
  <input
    type="date"
    value={endDate}
    onChange={(e) => {
      setEndDate(e.target.value);
      setPage(1);
    }}
  />
   </div>

</div>
</div>

<div className="filters-wrapper">

  {["all", "pending", "approved", "rejected"].map((f) => (

    <button
      key={f}
      onClick={() => {
        setFilter(f);
        setPage(1);
      }}
      className={`filter-btn ${
        filter === f ? "filter-btn-active" : ""
      }`}
    >
      {f}
    </button>

  ))}

  <button
    onClick={() => {
  if (page !== 1) {
    setPage(1);
  } else {
    fetchWithdrawals();
    fetchSummary();
  }
}}
    className="filter-btn"
  >
    <RefreshCw size={14} />
    Refresh
  </button>

</div>

        {/* Content */}
        {loading ? (
          <p className="empty-state">Auto Refresh...</p>
        ) : withdrawals.length === 0 ? (
          <p className="empty-state">No Withdrawals found</p>
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

  <th>Account</th>

  <th>Withdrawal No.</th>

  <th>Processed By</th>

  <th>Date & Time</th>

  <th>Status</th>

  <th>Action</th>

</tr>
</thead>

  <tbody>
  {withdrawals.map((w) => (
    <tr key={w._id}>

      <td>{w.username}</td>

      <td>{w.phone}</td>

      <td>{w.method}</td>

      <td>
          {w.amount} Birr
      </td>

      <td>
        {w.accountNumber}
      </td>
      <td>{w.withdrawalNumber || "-"}</td>

      <td>
  {w.approvedByName || w.rejectedByName || "-"}
  <br />
  <small>{w.processedByRole || ""}</small>
</td>

<td>
  {w.processedAt
    ? new Date(w.processedAt).toLocaleString()
    : "-"}
</td>

<td>
  <span className={getStatusClass(w.status)}>
    {getStatusIcon(w.status)}
    {w.status}
  </span>
</td>

      <td>
        {w.status ===
        "pending" ? (
          <div className="table-actions">

            <button
              onClick={() =>
                approveWithdrawal(
                  w._id
                )
              }
              className="approve-btn"
            >
              Approve
            </button>

            <button
              onClick={() =>
                rejectWithdrawal(
                  w._id
                )
              }
              className="reject-btn"
            >
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
onClick={() => {
    if (page > 1) {
        setPage(page - 1);
    }
}}
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
onClick={() => {
    if (page < (pagination?.totalPages || 1)) {
        setPage(page + 1);
    }
}}
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


export default WithdrawalsPage;