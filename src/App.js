import { Route, Routes} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import { useSelector } from "react-redux";
import { selectIsLoginAuthToken } from "./store/reducer/authReducer";
import UsersTable from "./components/UsersTable";
import SignUpForm from "./components/SignUpForm";
function App() {

  const authToken = useSelector(selectIsLoginAuthToken)
  console.log(authToken)

  return (
    <div className="App ">

      <Routes>

      {!authToken && <Route path='/' element={<SignUpForm/>}/>}
         <Route path='/login' element={<LoginForm/>}/>
         
        {authToken && <Route path="/user-list" element={<UsersTable/>} />}

      </Routes>

      {/* <LoginForm/>     */}
    </div>
  );
}

export default App;
