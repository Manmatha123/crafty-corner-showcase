import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ProductImageDialogProps {
  imageUrl: string;
  productName: string;
  open: boolean;
  onClose: () => void;
}

const ProductImageDialog = ({
  imageUrl,
  productName,
  open,
  onClose,
}: ProductImageDialogProps) => {

  const handleDownload = async() => {
    const link = document.createElement("a");
    link.href = `data:image/jpeg;base64,${imageUrl}`;
    link.download = `${productName.replace(/\s+/g, "-").toLowerCase()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden">
        <div className="relative">
          <img
            src={`data:image/jpeg;base64,${imageUrl}`}
            alt={productName}
            className="w-full h-auto object-contain"
          />
          <Button
            onClick={handleDownload}
            className="absolute bottom-4 right-4"
            variant="secondary"
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductImageDialog;
