import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";
import { AllRoutes } from "./routes/AllRoutes";
import { getUsers } from "./redux/user/usersReducer/action";
import { useDispatch, useSelector } from "react-redux";
import { useCustomToast } from "./components/utils/useCustomToast";
import { useNavigate } from "react-router-dom";
import { alreadyLoggedIn } from "./redux/authReducer/action";

function App() {
  const { showToast, ToastContainer } = useCustomToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((store) => store.usersReducer.users);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      await dispatch(getUsers(showToast));
      const id = JSON.parse(localStorage.getItem("id"));
      if (id) {
        dispatch(alreadyLoggedIn(id, showToast, users, navigate));
        console.log("reload success");
      } else {
        console.log("reload failed");
        navigate("/");
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="App">
      <AllRoutes></AllRoutes>
    </div>
  );
}


export default App;
