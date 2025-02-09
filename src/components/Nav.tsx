import { Link } from 'react-router-dom';
const Nav = () => {
  
   
    const navStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'black',
      padding: '1rem',
      color: 'white',
      fontSize: '1.2rem',
      fontWeight: 'bold',
    };
  
  return (
    <div style= {navStyle}>
    <div ></div>
    <Link to='/'>Home</Link>
    <Link to='/SavedCandidates'>Potential Candidates
    </Link>
    <div/>
    </div>
  )
};

export default Nav;
