import { Link } from "react-router-dom";

const Nav = () => {
  const navLinks = {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem",
    color: "white",
  backgroundColor: "black",
  fontSize: "1.5rem",
  fontWeight: "bold",
  };

  // TODO: Add necessary code to display the navigation bar and Link between the pages
  return (
    <div style={navLinks}>Nav</div>
    <div></div>
    <Link to="/">Home</Link>
    <Link to=''></Link>
  )
};

export default Nav;
