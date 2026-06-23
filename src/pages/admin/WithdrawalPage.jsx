import React, { useEffect, useState } from "react";
import api from "../../api";
import { RefreshCw, Check, X, Clock} from "lucide-react";
import "../../styles/DepositsPage.css";

const WithdrawalsPage = () => {
  const [Withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");

const fetchWithdrawals = async () => {
  try {

    setLoading(true);

    const res = await api.get(
  "/withdrawals"
);

console.log("WITHDRAWALS:", res.data);

    const data = Array.isArray(res.data)
      ? res.data
      : res.data.withdrawals || [];

    setWithdrawals(data);

  } catch (error) {

    console.log(error);

    setWithdrawals([]);

  } finally {

    setLoading(false);
  }
};
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

  if (filter !== "pending") return;

  const interval = setInterval(() => {
    fetchWithdrawals();
  }, 20000);

  return () => clearInterval(interval);

}, [filter]);

const approveWithdrawal = async (id) => {

  try {

    await api.put(
  `/withdrawals/${id}/approve`
);
    fetchWithdrawals();

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

    await api.put(
  `/withdrawals/${id}/reject`
);

    fetchWithdrawals();

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

const filteredWithdrawals = Array.isArray(Withdrawals)
  ? (
      filter === "all"
        ? Withdrawals
        : Withdrawals.filter(
            (d) => d.status === filter
          )
    )
  : [];
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
          <h1 className="deposits-title">withdrawals</h1>
          <p className="deposits-subtitle">Manage user withdrawals</p>
        </div>

        {/* Filters */}
        <div className="filters-wrapper">
          {["all", "pending", "approved", "rejected"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`filter-btn ${filter === f ? "filter-btn-active" : ""}`}
            >
              {f}
            </button>
          ))}
          <button onClick={fetchWithdrawals} className="refresh-btn">
            <RefreshCw size={14} /> Refresh
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <p className="empty-state">Auto Refresh...</p>
        ) : filteredWithdrawals.length === 0 ? (
          <p className="empty-state">No Withdrawals found</p>
        ) : (
<div className="deposits-table-wrapper">
  <table className="deposits-table">
<thead>
  <tr>
    <th>User</th>
    <th>Phone</th>
    <th>Method</th>
    <th>Amount</th>
    <th>Account Number</th>
    <th>Status</th>
    <th>Action</th>
  </tr>
</thead>

  <tbody>
  {filteredWithdrawals.map((w) => (
    <tr key={w._id}>

      <td>{w.username}</td>

      <td>{w.phone}</td>

      <td>{w.method}</td>

      <td>
          {w.amount} ETB
      </td>

      <td>
        {w.accountNumber}
      </td>

      <td>
        <span
          className={
            getStatusClass(
              w.status
            )
          }
        >
          {getStatusIcon(
            w.status
          )}

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
        )}
      </div>
    </div>
  );
};


export default WithdrawalsPage;