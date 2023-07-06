import React from "react";
// import IconBtn from "../../common/IconBtn";
import { useNavigate } from "react-router-dom";
const PurchaseHistory = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-richblack-5">
          Check your registered mail for payment details
        </h1>
        onclick={() => navigate("/dashboard/purchase-history")}
      </div>
    </div>
  );
};

export default PurchaseHistory;
