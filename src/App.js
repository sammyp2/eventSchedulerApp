import './App.css';
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect, useState  } from 'react';
import axios from 'axios'
import Events from './pages/Events'
import PageWrapper from './reuse/PageWrapper';
import EventManagement from './pages/EventManagement'
import AddEvent from './pages/AddEvent'
import EditEvent from './pages/EditEvent' // Corrected import name

function App() {
  const [user, setUser] = useState({ id: undefined, email: "", rawPassword: "", UserType: 'USER' });

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      axios.get(`http://localhost:8080/users/findUserById/${id}`)
      .then((response) => {
          setUser(response.data)
          console.log("response", response.data)
      })
      .catch((e)=>{
        console.log(e)
      })
    } else {
      setUser(undefined);
    }
  }, [])

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("id");
    setUser(null);
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <PageWrapper user={user} setUser={setUser}>
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} handleLogout={handleLogout} />}/>
        <Route path="/sign-in" element={<SignIn user={user} setUser={setUser}/>}/>
        <Route path="/sign-up" element={<SignUp user={user} setUser={setUser}/>}/>
        <Route path="/events" element={<Events user={user} setUser={setUser}/>}/>
        <Route path="/EventManagement" element={<EventManagement user={user} setUser={setUser}/>}/>
        <Route path="/AddEvent" element={<AddEvent user={user} setUser={setUser}/>}/>
        <Route path="/EditEvent" element={<EditEvent user={user} setUser={setUser}/>}/> {/* Corrected route */}
      </Routes>
    </PageWrapper>
  );
}

export default App;