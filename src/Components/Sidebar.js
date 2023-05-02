import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const getActiveStyles = ({ isActive }) => ({
    backgroundColor: isActive ? "#e2e8f0" : "",
    padding: "0.5rem 1rem",
    borderRadius: "8px"
  });
  return (
    <div className="sidebar">
      <div>
        <NavLink to="/inbox" style={getActiveStyles}>
          Inbox
        </NavLink>
      </div>
      <div>
        {" "}
        <NavLink to="/spam" style={getActiveStyles}>
          Spam
        </NavLink>
      </div>
      <div>
        <NavLink to="/trash" style={getActiveStyles}>
          Trash
        </NavLink>
      </div>
    </div>
  );
};
export default Sidebar;
