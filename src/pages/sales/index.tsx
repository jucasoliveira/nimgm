/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from "@/components/Layout";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import useFetch from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import { AutoComplete, Option } from "@/components/autocomplete";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { DollarSign } from "lucide-react";
import useLazyFetch from "@/hooks/useLazyFetch";

function Sales() {
  const { toast } = useToast();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const {
    data: result,
    error,
    loading,
  } = useFetch<StandardResponse>(`http://localhost:8080/get-stock`);

  const {
    data: saveResponse,
    error: saveError,
    loading: saveLoading,
    execute: SaveSalesInfo,
  } = useLazyFetch<StandardResponse>();

  const [productList, setProductList] = useState<Option[]>([]);
  const [value, setValue] = useState<Option[]>([]);
  const [step, setStep] = useState<number>(0);

  const [handleData, setHandleData] = useState<Product[]>([]);

  const [items, setItems] = useState<Sale[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, value: any) => {
    // find the item in handleData based on the value
    const item = handleData.find((item) => item.id === value);

    if (item) {
      const quantity = parseInt(e.target.value, 10);
      setItems((prevItems: any) => {
        // check if the item is already in the items list
        const existingItem = prevItems.find(
          (i: Sale) => i.item_name === item.item_name
        );
        if (existingItem) {
          // update the quantity of the existing item
          return prevItems.map((i: Sale) =>
            i.item_name === item.item_name ? { ...i, quantity } : i
          );
        } else {
          // add the new item to the items list
          return [
            ...prevItems,
            {
              item_name: item.item_name,
              quantity,
              sold_at: new Date(),
            },
          ];
        }
      });
    }
  };

  const onSubmitSale = async () => {
    await SaveSalesInfo(`http://localhost:8080/sales`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(items),
    });
  };

  useEffect(() => {
    saveError &&
      toast({
        title: "Error",
        description: "Could not make the sale, please check stock",
        variant: "destructive",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });

    if (saveResponse) {
      toast({
        title: "Success",
        description: "Sales made successfully",
        variant: "default",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });

      setValue([]);
      setStep(0);
    }
  }, [saveError, saveResponse, toast]);

  useEffect(() => {
    error &&
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });

    result &&
      productList.length === 0 &&
      setProductList(
        result.data.reduce(
          (acc: Option[], item: Product) => [
            ...acc,
            { value: item.id, label: item.item_name },
          ],
          []
        )
      );

    result && result?.data && setHandleData(result.data);
  }, [error, productList.length, result, toast]);

  return (
    <>
      <Layout>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Sales</h2>
            <div className="flex items-center space-x-2 w-full"></div>
          </div>
        </div>
        <div className=" space-x-2 p-8 pt-6">
          {step == 0 && productList.length > 0 && (
            <div className="flex maw-w-xl space-x-2">
              <AutoComplete
                options={productList}
                placeholder="Search for products, eg.: Apples"
                value={value}
                onValueChange={setValue}
                emptyMessage="No results found"
                isLoading={loading}
              />
              <Button
                className="w-full "
                disabled={!(value.length > 0)}
                onClick={() => value.length > 0 && setStep(1)}
              >
                Go
              </Button>
            </div>
          )}
          {step == 1 && (
            <div className=" space-y-2">
              {value.length > 0 &&
                value.map((item, indx) => (
                  <div className="max-w-[200px]" key={indx}>
                    <Label className="w-full" key={item.value}>
                      {item.label}
                    </Label>
                    <Input
                      placeholder="Quantity: 1"
                      type="number"
                      onChange={(e) => onChange(e, item.value)}
                    />
                  </div>
                ))}
              <Separator className="my-4" />
              <Button
                className="w-full"
                disabled={saveLoading}
                onClick={onSubmitSale}
              >
                <DollarSign className="mr-2 h-4 w-4" /> Sell
              </Button>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}

export default Sales;
