/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import useLazyFetch from "@/hooks/useLazyFetch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

const SheetComponent = ({
  rowValue,
  refetch,
}: {
  rowValue: any;
  refetch: () => void;
}) => {
  const [field, setField] = useState(true);
  const { toast } = useToast();
  const [value, setValue] = useState<number>(0);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const {
    data: removeResponse,
    error: removeError,
    loading: removeLoading,
    execute: SaveWaste,
  } = useLazyFetch<StandardResponse>();

  const submitWaste = async () => {
    await SaveWaste(`http://localhost:8080/waste`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item_name: rowValue.original.item_name,
        quantity: value,
        action: field ? "remove" : "add",
      }),
    });
  };

  useEffect(() => {
    if (removeError) {
      toast({
        title: "Error",
        description: "Could not make the sale, please check stock",
        variant: "destructive",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    }

    if (removeResponse) {
      toast({
        title: "Success",
        description: "Sales made successfully",
        variant: "default",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
      setIsSheetOpen(false);
      refetch(); // Refetch data on successful response
    }
  }, [removeError, removeResponse, toast, refetch]);

  return (
    <div className="flex items-end justify-end">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button onClick={() => setIsSheetOpen(true)}>Manage</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Manage {rowValue.original.item_name}</SheetTitle>
            <SheetDescription>
              You can readjust the amount of this item in Stock
              <div className="flex items-center py-4 space-x-2">
                <Label>Add</Label>
                <Switch checked={field} onCheckedChange={setField} />
                <Label>Remove</Label>
              </div>
              <Input
                value={value}
                onChange={(e) => setValue(parseInt(e.target.value))}
              />
              <Button
                onClick={submitWaste}
                className="my-4 w-full"
                disabled={removeLoading}
              >
                Submit
              </Button>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SheetComponent;
