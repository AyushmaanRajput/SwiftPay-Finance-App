import {
  POSTLOGINREQUEST,
  POSTLOGINFAIL,
  POSTLOGINSUCCESS,
  POSTADMINSUCESS,
} from "./actionTypes";

export const login = (user, showToast, users, navigate) => (dispatch) => {
  dispatch({ type: POSTLOGINREQUEST });
  console.log(user);
  let flag = false;
  let loggedInUser;

  if (user.email === "admin@admin.com" && user.password == "admin@admin") {
    dispatch({ type: POSTADMINSUCESS });
    navigate("/admin");
    return;
  } else if (user.email === "admin@admin.com") {
    dispatch({ type: POSTLOGINFAIL });
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
    showToast("success", "Successfully logged in");
    console.log(flag, loggedInUser);
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    dispatch({ type: POSTLOGINSUCCESS, payload: loggedInUser });
    navigate("/dashboard");
  } else {
    showToast("error", "Failed logged in");
    dispatch({ type: POSTLOGINFAIL });
    navigate("/login");
  }

  return;
};
