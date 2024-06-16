/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useFetch from "@/hooks/useFetch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export function History({ update, setUpdate }: any) {
  const { toast } = useToast();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const {
    data: result,
    error,
    loading,
    refetch,
  } = useFetch<StandardResponse>(`http://localhost:8080/delivery-history`);

  useEffect(() => {
    error &&
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
  }, [error]);

  useEffect(() => {
    if (update) {
      refetch();
      setUpdate(false);
    }
  }, [update]);

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Deliveries</CardTitle>
        <CardDescription>You made 265 sales this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full ">
          {!loading &&
            result &&
            result.data?.map((value: any, index: number) => (
              <div key={index}>
                <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {value.item_name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {value.quantity}
                    </p>
                  </div>
                  <div className="ml-auto font-medium text-clip">
                    {new Date(value.delivered_at).toLocaleString()}
                  </div>
                </div>
                {value !== result.data[result.data.length - 1] && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
