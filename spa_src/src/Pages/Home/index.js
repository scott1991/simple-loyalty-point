import { Link } from 'react-router-dom';
function Home() {
  return (
    <div>
      <Link to='Employee'> Employee </Link>
      <div></div>
      <Link to='Customer'> Customer </Link>
    </div>
  );
}

export default Home;
