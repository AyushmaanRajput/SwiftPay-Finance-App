import {
  POSTLOGINREQUEST,
  POSTLOGINFAIL,
  POSTLOGINSUCCESS,
  POSTADMINSUCESS,
} from "./actionTypes";

export const login = (user, showToast, users, navigate) => (dispatch) => {
  dispatch({ type: POSTLOGINREQUEST });
  // console.log(user);
  let flag = false;
  let loggedInUser;

  if (user.email === "admin@admin.com" && user.password == "admin@admin") {
    dispatch({ type: POSTADMINSUCESS });
    showToast("success", "Admin Login Successful");
    navigate("/admin");
    return;
  } else if (user.email === "admin@admin.com") {
    dispatch({ type: POSTLOGINFAIL });
    showToast("error", "Admin Login Failed");
    navigate("/login");
    return;
  }

  for (let i = 0; i < users.length; i++) {
    if (users[i].email === user.email && users[i].password === user.password) {
      flag = true;
      loggedInUser = users[i];
    }
  }
  if (flag) {
    // console.log(flag, loggedInUser);
    localStorage.setItem("id", JSON.stringify(loggedInUser.id));
    dispatch({ type: POSTLOGINSUCCESS, payload: loggedInUser });
    showToast("success", "Successfully logged in");
    navigate("/dashboard");
  } else {
    localStorage.removeItem("id");
    dispatch({ type: POSTLOGINFAIL });
    showToast("error", "Failed logged in");
    navigate("/login");
  }
  return;
};

export const alreadyLoggedIn =
  (id, showToast, users, navigate) => (dispatch) => {
    let flag = false;
    let loggedInUser;
    console.log(id, users);
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        loggedInUser = users[i];
        flag = true;
      }
    }
    if (flag) {
      // console.log(flag, loggedInUser);
      localStorage.setItem("id", JSON.stringify(loggedInUser.id));
      dispatch({ type: POSTLOGINSUCCESS, payload: loggedInUser });
      showToast("success", "Successfully logged in");
      navigate("/dashboard");
    } else {
      dispatch({ type: POSTLOGINFAIL });
      showToast("error", "Failed logged in");
      navigate("/");
    }
  };
