import { baseURL } from "../../store";
import {
  GETSUBSREQUEST,
  GETSUBSFAILURE,
  GETSUBSSUCESS,
  ADDSUBREQUEST,
  ADDSUBSUCCESS,
  DELETESUBREQUEST,
  DELETESUBSUCCESS,
  DELETESUBFAILURE,
  EDITSUBREQUEST,
} from "./actionTypes";
import axios from "axios";

export const getSubscriptions = () => (dispatch) => {
  dispatch({ type: GETSUBSREQUEST });
  const data = axios
    .get(`${baseURL}/subscriptions`)
    .then((res) => {
      // console.log(res);
      dispatch({ type: GETSUBSSUCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: GETSUBSFAILURE });
      console.log(err);
    });
  return data;
};

export const addSubscriptions =
  (newSubsciptionData, showToast) => (dispatch) => {
    dispatch({ type: ADDSUBREQUEST });
    const data = axios
      .post(`${baseURL}/subscriptions`, newSubsciptionData)
      .then((res) => {
        // console.log(res);
        showToast("success", "New Subscription Added");
        dispatch({ type: ADDSUBSUCCESS, payload: res.data });
      })
      .catch((err) => {
        // console.log(err)
        showToast("error", "Failed to add subscription");
      });
    return data;
  };

export const deleteSubscription = (id, showToast, getSubscriptionsData) => (dispatch) => {
  dispatch({ type: DELETESUBREQUEST });
  const data = axios
    .delete(`${baseURL}/subscriptions/${id}`)
    .then((res) => {
      // console.log(res);
      showToast("success", "Subscription Deleted");
      dispatch({ type: DELETESUBSUCCESS, payload: res.data });
      // getSubscriptionsData();
    })
    .catch((err) => {
      // console.log(err)
      showToast("error", "Failed to delete subscription");
      dispatch({ type: DELETESUBFAILURE});
    });
  return data;
};

export const editSubscription = (id, getSubscriptions, showToast) => (dispatch) => {
  dispatch({ type: EDITSUBREQUEST});
  const data = axios
  .patch(`${baseURL}/subscriptions/${id}`, )
}