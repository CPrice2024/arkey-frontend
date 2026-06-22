import {
  Outlet,
  Link
} from "react-router-dom";

const AdminLayout = () => {

  return (
    <div className="layout">

      <aside>

        <Link to="/admin">
          Dashboard
        </Link>

        <Link to="/users">
          Users
        </Link>

        <Link to="/deposits">
          Deposits
        </Link>

        <Link to="/withdrawals">
          Withdrawals
        </Link>

      </aside>

      <main>
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;