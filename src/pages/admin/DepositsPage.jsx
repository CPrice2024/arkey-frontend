import React, { useEffect, useState } from "react";
import api from "../../api";
import { RefreshCw, Check, X, Clock, Phone, CreditCard, DollarSign, Hash, FileText, User } from "lucide-react";
import "../../styles/DepositsPage.css";

const DepositsPage = () => {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");

const fetchDeposits = async () => {

  try {

    setLoading(true);

    const res = await api.get(
  "/deposits"
);

    console.log(res.data);

    // support both formats
    const depositsData = Array.isArray(res.data)
      ? res.data
      : res.data.deposits || [];

    setDeposits(depositsData);

  } catch (error) {

    console.log(error);

    setDeposits([]);

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

  fetchDeposits();

  if (filter !== "pending") return;

  const interval = setInterval(() => {
    fetchDeposits();
  }, 20000);

  return () => clearInterval(interval);

}, [filter]);

  const approveDeposit = async (id) => {
    try {
      await api.put(
  `/deposits/${id}/approve`
);
      fetchDeposits();
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
      await api.put(
  `/deposits/${id}/reject`
);
      fetchDeposits();
      showNotification(
  "error",
  "Deposit rejected"
);
    } catch (error) {
      console.log(error);
      showNotification(
  "error",
  "Failed to reject deposit"
);
    }
  };

const filteredDeposits = Array.isArray(deposits)
  ? (
      filter === "all"
        ? deposits
        : deposits.filter(
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
          <h1 className="deposits-title">Deposits</h1>
          <p className="deposits-subtitle">Manage user deposits</p>
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
          <button onClick={fetchDeposits} className="refresh-btn">
            <RefreshCw size={14} /> Refresh
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <p className="empty-state">Auto Refresh...</p>
        ) : filteredDeposits.length === 0 ? (
          <p className="empty-state">No deposits found</p>
        ) : (
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
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      {filteredDeposits.map((d) => (
        <tr key={d._id}>
          <td>{d.username}</td>

          <td>{d.phone || "-"}</td>

          <td>{d.method}</td>

          <td>{d.amount || 0} ETB
          </td>

          <td>{d.depositNumber}</td>

          <td>{d.transactionId || "-"}</td>

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
        )}
      </div>
    </div>
  );
};

// Helper component for detail items
const DetailItem = ({ icon, label }) => (
  <div className="detail-item">
    {icon}
    <span>{label}</span>
  </div>
);

export default DepositsPage;