import { QRCodeCanvas } from "qrcode.react";

export default function Step5({ data }) {
  return (
    <div>
      <h2>QR Code</h2>

      <QRCodeCanvas value={JSON.stringify(data)} />
    </div>
  );
}
