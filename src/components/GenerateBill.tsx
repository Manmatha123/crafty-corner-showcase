import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Order } from '@/lib/types';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";

interface BillProps {
  order: Order;
  open: boolean;
  onClose: () => void;
}

const GenerateBill: React.FC<BillProps> = ({ order, open, onClose }) => {
  const billRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (billRef.current) {
      const canvas = await html2canvas(billRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`order_bill_ORD-00000${order.id}.pdf`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl" style={{maxHeight:"80vh",overflowY:"scroll"}}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Order Details</DialogTitle>
        </DialogHeader>
    <div>
      <button onClick={handleDownloadPDF} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        Download Bill
      </button>

      <div ref={billRef} className="p-8 bg-white shadow-md max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Order Invoice</h1>

        <div className="mb-4">
          <strong>Order ID:</strong> ORD-00000{order?.id} <br />
          <strong>Order Date:</strong> {new Date(order.orderdate).toLocaleDateString()} <br />
          <strong>Status:</strong> {order.status}
        </div>

        <div className="mb-4">
          <strong>Seller:</strong> {order.seller.name} <br />
          <strong>Buyer:</strong> {order.buyer.name}
        </div>

        <div className="mb-4">
          <strong>Delivery Address:</strong><br />
          {order.locality}, {order.district}, {order.city}, {order.state} - {order.pincode}
        </div>

        <table className="w-full border-collapse border mb-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1 text-left">Product</th>
              <th className="border px-2 py-1 text-right">Quantity</th>
              <th className="border px-2 py-1 text-right">Price</th>
              <th className="border px-2 py-1 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.orderProducts.map((op) => (
              <tr key={op.id}>
                <td className="border px-2 py-1">{op.product.name}</td>
                <td className="border px-2 py-1 text-right">{op.quantity}</td>
                <td className="border px-2 py-1 text-right">₹{op.price.toFixed(2)}</td>
                <td className="border px-2 py-1 text-right">₹{(op.price * op.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right">
          <strong>Final Price:</strong> ₹{order.finalprice.toFixed(2)}
        </div>

        <div className="text-center mt-6 text-sm text-gray-600">
          Thank you for your purchase!
        </div>
      </div>
    </div>

          </DialogContent>
        </Dialog>
    
  );
};

export default GenerateBill;
