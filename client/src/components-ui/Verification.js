import { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import AuthService from "../services/AuthService";

export default function Verification() {
  const [isActivated, setIsActivated] = useState(false);
  let { confirmationTicket } = useParams();
  useEffect(() => {
    AuthService.verification({
      confirmationTicket: confirmationTicket,
    }).then((res) => {
      console.log(res.data);
      setIsActivated(res.data.userInfo.data);
    });
  });

  return (
    <div>{!isActivated ? <div>Loading</div> : <Redirect to="/login" />}</div>
  );
}
