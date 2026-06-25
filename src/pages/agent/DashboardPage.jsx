import React, { useEffect, useState } from "react";
import api from "../api";
import { 
  Users, DollarSign, Activity, BarChart3, TrendingUp, PieChart, 
  Target, Zap, RefreshCw, Download, ChevronUp, ChevronDown,
  Wallet, UserCheck, UserX, TrendingDown, Award, Clock,
  Database, PieChart as  LineChart
} from "lucide-react";
import "../styles/DashboardStyles.css";

function DashboardPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/users");
      const userData = Array.isArray(res.data) ? res.data : (res.data.users || []);
      const sanitizedUsers = userData.map(user => ({
        ...user,
        name: user.name || 'Unknown User',
        balance: user.balance || 0
      }));
      setUsers(sanitizedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    fetchUsers();
  };

  const exportData = () => {
    const data = {
      summary: {
        totalUsers: users.length,
        totalBalance: totalBalance,
        averageBalance: averageBalance,
        activeUsers: activeUsers,
        inactiveUsers: inactiveUsers,
        maxBalance: maxBalance,
        minBalance: minBalance
      },
      distribution: balanceRanges,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-data-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalBalance = users.reduce((acc, user) => acc + (user.balance || 0), 0);
  const averageBalance = users.length > 0 ? totalBalance / users.length : 0;
  const activeUsers = users.filter(u => (u.balance || 0) > 1000).length;
  const inactiveUsers = users.length - activeUsers;
  const maxBalance = users.length > 0 ? Math.max(...users.map(u => u.balance || 0)) : 0;
  const minBalance = users.length > 0 ? Math.min(...users.map(u => u.balance || 0)) : 0;

  function calculateMedian(arr) {
    if (arr.length === 0) return 0;
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  }

  const medianBalance = calculateMedian(users.map(u => u.balance || 0));

  const balanceRanges = {
    "0-500": users.filter(u => (u.balance || 0) >= 0 && (u.balance || 0) <= 500).length,
    "501-1000": users.filter(u => (u.balance || 0) > 500 && (u.balance || 0) <= 1000).length,
    "1001-2000": users.filter(u => (u.balance || 0) > 1000 && (u.balance || 0) <= 2000).length,
    "2000-5000": users.filter(u => (u.balance || 0) > 2000 && (u.balance || 0) <= 5000).length,
    "5000+": users.filter(u => (u.balance || 0) > 5000).length
  };

  const activePercent = users.length > 0 ? (activeUsers / users.length) * 100 : 0;

  // Stats Card Component
  const StatsCard = ({ label, value, icon, change, changeType, subtitle }) => (
    <div className="stats-card">
      <div className="stats-card-header">
        <div className="stats-icon">{icon}</div>
        {change && (
          <div className={`stats-change ${changeType}`}>
            {changeType === 'up' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            <span>{change}</span>
          </div>
        )}
      </div>
      <div className="stats-value">{value}</div>
      <div className="stats-label">{label}</div>
      {subtitle && <div className="stats-subtitle">{subtitle}</div>}
    </div>
  );

  // Balance Distribution Chart
  const BalanceChart = () => {
    const maxCount = Math.max(...Object.values(balanceRanges), 1);
    
    return (
      <div className="chart-card">
        <div className="chart-title">
          <BarChart3 size={18} />
          <h3>Balance Distribution</h3>
          <Wallet size={14} className="chart-icon-secondary" />
        </div>
        <div className="balance-chart">
          {Object.entries(balanceRanges).map(([range, count]) => (
            <div key={range} className="chart-row">
              <div className="chart-label">{range}</div>
              <div className="chart-bar-wrapper">
                <div 
                  className="chart-bar"
                  style={{ width: `${(count / maxCount) * 100}%` }}
                >
                  <span className="chart-count">{count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Activity Donut Chart
  const ActivityChart = () => (
    <div className="chart-card">
      <div className="chart-title">
        <PieChart size={18} />
        <h3>User Activity</h3>
        <UserCheck size={14} className="chart-icon-secondary" />
      </div>
      <div className="activity-container">
        <div className="donut-wrapper">
          <svg width="140" height="140" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r="70" fill="none" stroke="#c7c7c7" strokeWidth="18"/>
            <circle 
              cx="80" cy="80" r="70" 
              fill="none" 
              stroke="#3e3eabf5" 
              strokeWidth="18"
              strokeDasharray={`${(activePercent * 4.398) / 100 * 100} 439.8`}
              strokeDashoffset="0"
              transform="rotate(-90 80 80)"
              strokeLinecap="square"
            />
            <text x="80" y="75" textAnchor="middle" fontSize="20" fontWeight="600" fill="#0f172a">
              {activeUsers}
            </text>
            <text x="80" y="95" textAnchor="middle" fontSize="11" fill="#676773">
              Active
            </text>
          </svg>
        </div>
        <div className="activity-stats">
          <div className="activity-stat">
            <div className="activity-dot active"></div>
            <div>
              <div className="activity-label">
                <UserCheck size={12} /> Active Users
              </div>
              <div className="activity-value">{activeUsers}</div>
              <div className="activity-percent">{activePercent.toFixed(1)}%</div>
            </div>
          </div>
          <div className="activity-stat">
            <div className="activity-dot inactive"></div>
            <div>
              <div className="activity-label">
                <UserX size={12} /> Inactive Users
              </div>
              <div className="activity-value">{inactiveUsers}</div>
              <div className="activity-percent">{(100 - activePercent).toFixed(1)}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Key Metrics Grid
  const KeyMetrics = () => (
    <div className="metrics-card">
      <div className="chart-title">
        <Target size={18} />
        <h3>Key Metrics</h3>
        <Database size={14} className="chart-icon-secondary" />
      </div>
      <div className="metrics-grid">
        <div className="metric">
          <div className="metric-label">
            <Wallet size={12} /> Average Balance
          </div>
          <div className="metric-value">{averageBalance.toFixed(0)} Birr</div>
          <div className="metric-hint">Median: {medianBalance.toFixed(0)} Birr</div>
        </div>
        <div className="metric">
          <div className="metric-label">
            <TrendingUp size={12} /> Balance Range
          </div>
          <div className="metric-value">{minBalance.toFixed(0)} - {maxBalance.toFixed(0)}</div>
          <div className="metric-hint">Spread: {(maxBalance - minBalance).toFixed(0)} Birr</div>
        </div>
        <div className="metric">
          <div className="metric-label">
            <DollarSign size={12} /> Total Value
          </div>
          <div className="metric-value">{totalBalance.toLocaleString()} Birr</div>
          <div className="metric-hint">Across {users.length} users</div>
        </div>
        <div className="metric">
          <div className="metric-label">
            <Activity size={12} /> Active Ratio
          </div>
          <div className="metric-value">{activePercent.toFixed(1)}%</div>
          <div className="metric-hint">{activeUsers} of {users.length} users</div>
        </div>
      </div>
    </div>
  );

  // Trend Indicator
  const TrendIndicator = () => {
    const trendData = [42, 45, 48, 52, 55, 58, 62, 65, 68, 72];
    const maxValue = Math.max(...trendData);
    
    return (
      <div className="trend-card">
        <div className="chart-title">
          <LineChart size={18} />
          <h3>Growth Trend</h3>
          <Clock size={14} className="chart-icon-secondary" />
        </div>
        <div className="trend-container">
          {trendData.map((value, idx) => (
            <div key={idx} className="trend-item">
              <div 
                className="trend-bar"
                style={{ height: `${(value / maxValue) * 100}%` }}
              />
              <div className="trend-label">W{idx + 1}</div>
            </div>
          ))}
        </div>
        <div className="trend-stats">
          <div className="trend-stat">
            <TrendingUp size={14} />
            <div>
              <span className="trend-stat-label">Growth Rate</span>
              <span className="trend-stat-value">+71%</span>
            </div>
          </div>
          <div className="trend-stat">
            <Clock size={14} />
            <div>
              <span className="trend-stat-label">Period</span>
              <span className="trend-stat-value">Last 10 weeks</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Insights List
  const InsightsList = () => {
    const top10Count = users.filter(u => (u.balance || 0) > (maxBalance * 0.9)).length;
    const top10Value = users.length > 0 && totalBalance > 0 
      ? (top10Count * (maxBalance * 0.9)) / totalBalance * 100 
      : 0;
    
    return (
      <div className="insights-card">
        <div className="chart-title">
          <Award size={18} />
          <h3>Insights</h3>
          <Zap size={14} className="chart-icon-secondary" />
        </div>
        <div className="insights-list">
          <div className="insight">
            <div className="insight-icon">
              <TrendingUp size={16} />
            </div>
            <div className="insight-content">
              <div className="insight-title">Balance Concentration</div>
              <div className="insight-description">
                Top 10% hold {top10Value.toFixed(1)}% of total value
              </div>
            </div>
          </div>
          <div className="insight">
            <div className="insight-icon">
              <UserCheck size={16} />
            </div>
            <div className="insight-content">
              <div className="insight-title">Adoption Rate</div>
              <div className="insight-description">
                {activePercent.toFixed(1)}% of users are active
              </div>
            </div>
          </div>
          <div className="insight">
            <div className="insight-icon">
              <Wallet size={16} />
            </div>
            <div className="insight-content">
              <div className="insight-title">Typical Balance</div>
              <div className="insight-description">
                Average user holds {averageBalance.toFixed(0)} Birr
              </div>
            </div>
          </div>
          <div className="insight">
            <div className="insight-icon">
              <TrendingDown size={16} />
            </div>
            <div className="insight-content">
              <div className="insight-title">Opportunity</div>
              <div className="insight-description">
                {inactiveUsers} users below 1000 Birr threshold
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <div className="header-badge">
              <Activity size={20} />
              <span>Live Analytics</span>
            </div>
            <h1 className="dashboard-title">Analytics Dashboard</h1>
            <p className="dashboard-subtitle">Monitor your user metrics at a glance</p>
          </div>
          <div className="header-actions">
            <button onClick={refreshData} className="action-btn">
              <RefreshCw size={16} />
              <span>Refresh</span>
            </button>
            <button onClick={exportData} className="action-btn">
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <StatsCard 
            label="Total Users"
            value={users.length}
            icon={<Users size={20} />}
            change="+12%"
            changeType="up"
            subtitle="Total registered users"
          />
          <StatsCard 
            label="Total Balance"
            value={`${totalBalance.toLocaleString()} Birr`}
            icon={<DollarSign size={20} />}
            change="+8%"
            changeType="up"
            subtitle="Combined balance"
          />
          <StatsCard 
            label="Active Users"
            value={activeUsers}
            icon={<UserCheck size={20} />}
            change={`${activePercent.toFixed(0)}%`}
            changeType="up"
            subtitle="Currently active"
          />
          <StatsCard 
            label="Avg Balance"
            value={`${averageBalance.toFixed(0)} Birr`}
            icon={<Wallet size={20} />}
            change="+5%"
            changeType="up"
            subtitle="Per user average"
          />
        </div>

        {/* Charts Grid */}
        <div className="charts-grid">
          <BalanceChart />
          <ActivityChart />
          <KeyMetrics />
          <TrendIndicator />
          <InsightsList />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>Loading data...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && users.length === 0 && (
          <div className="empty-state">
            <Database size={48} />
            <h3>No data available</h3>
            <p>Add users to see analytics and insights</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;