import { Link } from "react-router-dom";
import "../styles/SidebarStyle.css";

function Sidebar() {

  return (

    <div className="sidebar">

      <h2 className="logo">
        🎰 Arkey Bet
      </h2>

      <nav>

        <Link to="/">
          📊 Dashboard
        </Link>

        <Link to="/users">
          👥 Users
        </Link>

        <Link to="/promotions">
          📣 Promotions
        </Link>
        

      </nav>

    </div>
  );
}

export default Sidebar;