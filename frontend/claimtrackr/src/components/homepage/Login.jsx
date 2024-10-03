import Sidebar from './Sidebar';
import RightContent from './RightContent';
// CSS
import '../../css/login.css';

function Login() {
  return (
    <section className="container">
      <Sidebar />
      <RightContent />
    </section>
  );
}

export default Login;
