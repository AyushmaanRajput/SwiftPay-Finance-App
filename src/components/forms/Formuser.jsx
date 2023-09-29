import React, { useEffect, useState } from "react";
import { AuthChange } from "../../redux/user/usersReducer/accountReducer/action";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

export const Formuser = () => {
  const [emailChange, setEmailChange] = useState("");
  const [passwordChange, setPasswordChange] = useState("");
  const { id } = useParams();
    // console.log(id, "aa");
    
  const userDetails = useSelector((store) => store.accountReducer.userDetails);
  const dispatch = useDispatch();
  //   console.log(userDetails, "ali");

  useEffect(() => {
    const data = userDetails.find((el) => el.id === +id);
    if (data) {
      setEmailChange(data);
      setPasswordChange(data);
    }
  }, [id, userDetails]);
  const handleSubmit = (e) => {
    e.preventDefault();
    let newUserObj = {
      email: emailChange,
      password: passwordChange,
    };
    // console.log("ok");
    dispatch(AuthChange(newUserObj, id));
  };
  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={emailChange}
        onChange={(e) => setEmailChange(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={passwordChange}
        onChange={(e) => setPasswordChange(e.target.value)}
      />
      <button type="submit" onClick={handleSubmit}>
        Continue
      </button>
    </div>
  );
};
