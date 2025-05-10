
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { format } from "date-fns";
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
  import { Separator } from "@/components/ui/separator";
  import { Badge } from "@/components/ui/badge";
  import { Order, Product } from "@/lib/types";
  import ProductImageDialog from "./ProductImageDialog";
  import { useState } from "react";
import { CustomizeOrder } from "@/pages/ProfilePage";
  
  interface OrderDetailsDialogProps {
    order: CustomizeOrder | null;
    open: boolean;
    onClose: () => void;
  }
  
  const CustomOrderrView = ({ order, open, onClose }: OrderDetailsDialogProps) => {
  
    const [selectProduct, setSelectProduct] = useState<CustomizeOrder>(null);
    const [isOpenImgView, setIsOpenImgView] = useState<boolean>(false);
  
    if (!order) return null;
  
    const formattedDate = format(new Date(order.orderdate), "PPP");
  
    return (
      <>
        <Dialog open={open} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-3xl" style={{ maxHeight: "80vh", overflowY: "scroll" }}>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Order Details</DialogTitle>
              <DialogDescription>
                Order placed on {formattedDate}
              </DialogDescription>
            </DialogHeader>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-2">Order Information</h3>
                <div className="space-y-1">
                  <p className="text-sm flex justify-between">
                    <span className="font-medium">Order ID:</span>
                    <span>ORD-00000{order.id}</span>
                  </p>
                  <p className="text-sm flex justify-between">
                    <span className="font-medium">Date:</span>
                    <span>{formattedDate}</span>
                  </p>
                  <p className="text-sm flex justify-between">
                    <span className="font-medium">Status:</span>
                    <Badge variant={
                      order.status === 'pending' ? 'outline' :
                        order.status === 'confirmed' ? 'secondary' :
                          order.status === 'delivered' ? 'default' :
                            'destructive'
                    }>{order.status}</Badge>
                  </p>
                  <p className="text-sm flex justify-between">
                  <span className="font-medium">Seller:</span>
                          <a
                            href={`tel:${order?.seller?.phone}`}
                            className="text-blue-500 hover:underline"
                          >
                            {order?.seller?.phone}
                          </a>
                        </p>
                </div>
              </div>
  
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-2">Shipping Address</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Name:</span> {order.buyer.name}</p>
                  <p>
                    <span className="font-medium">Contact:</span>
                    <a href={`tel:${order.buyer.phone}`} className="text-blue-500 hover:underline">
                      {order.buyer.phone}
                    </a>
                  </p>
                  <p><span className="font-medium">Locality:</span> {order.locality}</p>
                  <p><span className="font-medium">City:</span> {order.city}</p>
                  <p><span className="font-medium">State:</span> {order.state}, {order.district}, {order.pincode}</p>
                </div>
              </div>
            </div>
  
            <Separator className="my-4" />
  
            <div>
              <h3 className="font-medium mb-4">Order Item</h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">Name</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                      <TableRow key={order.id}>
                        <TableCell className="flex items-center gap-2">
                          <div className="h-10 w-10 overflow-hidden rounded-md"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setSelectProduct(order);
                              setIsOpenImgView(true)
                            }}>
                            <img
                              src={`data:image/jpeg;base64,${order?.image}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{order.name}</TableCell>
                        <TableCell className="text-right">{order.qty}</TableCell>
                        <TableCell className="text-right" style={{maxWidth:"100px"}}>{order?.description}</TableCell>
                      
                      </TableRow>
                 
                    
                  </TableBody>
                </Table>
              </div>
            </div>
          </DialogContent>
        </Dialog>
  
        {isOpenImgView && (
          <ProductImageDialog
            imageUrl={selectProduct?.image}
            productName={`ORD-00000${selectProduct?.id}`}
            open={isOpenImgView}
            onClose={() => {
              setSelectProduct(null);
              setIsOpenImgView(false);
            }}
          />
        )}
      </>
    );
  };
  
  export default CustomOrderrView;
  