import { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import axios from "axios";

export default function Verification() {
  const [isActivated, setIsActivated] = useState(false);
  let { confirmationTicket } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/verification/${confirmationTicket}`)
      .then((res) => {
        console.log(res.data);
        setIsActivated(res.data.userInfo.data);
      });
  });

  return (
    <div>{!isActivated ? <div>Loading</div> : <Redirect to="/login" />}</div>
  );
}
