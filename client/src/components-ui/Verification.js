import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Verification() {
  const [isActivated, setIsActivated] = useState(false);
  let { confirmationTicket } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/verification/${confirmationTicket}`)
      .then((res) => console.log(res));
  });

  return (
    <div>
      <div>Hesabınız aktif ediliyor</div>
    </div>
  );
}
