import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import "../CreateOrder.css";

export default function Step5({ data }) {
  const navigate = useNavigate();
  return (
    <div className="step5Container">

      <div className="step5Card">

   
        

        {/* Title */}
        <h2>Order Created Successfully!</h2>

        {/* Order ID */}
        <p className="subText">
          Order ID: {data?.orderId || "ORD-0000"}
        </p>

        {/* QR Section */}
        <div className="qrSection">
          <p>Scan this QR code for production tracking</p>

          <div className="qrBox">
            <QRCodeCanvas value={JSON.stringify(data)} size={140} />
          </div>
        </div>
        <button className="createBtn"
                 onClick={() => navigate("/JobOrder/JobOrder")}>

        Back to Orders</button>

      </div>

    </div>
  );
}