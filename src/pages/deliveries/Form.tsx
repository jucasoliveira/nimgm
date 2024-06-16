/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import useLazyFetch from "@/hooks/useLazyFetch";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { ToastAction } from "@/components/ui/toast";

const formSchema = z.object({
  item_name: z.string().min(2).max(50),
  quantity: z.number().min(1),
  delivered_at: z.date(),
});

export function FormPage() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      item_name: "",
      quantity: 1,
      delivered_at: new Date(),
    },
  });

  const {
    data: saveResponse,
    error: saveError,
    loading: saveLoading,
    execute: saveDeliveryInfo,
  } = useLazyFetch<StandardResponse>();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await saveDeliveryInfo(`http://localhost:8080/deliveries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
  };

  useEffect(() => {
    if (saveResponse) {
      toast({
        title: "Info saved!!!",
        variant: "default",
        description: "Nice one!!",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
      form.reset();
    }

    if (saveError) {
      toast({
        title: "Error",
        description: saveError,
        variant: "destructive",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    }
  }, [saveResponse, saveError, toast, form]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="item_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Name</FormLabel>
                <FormControl>
                  <Input placeholder="eg.: Apples" {...field} />
                </FormControl>
                <FormDescription>Add the product name here.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    placeholder={"1"}
                    type="number"
                    {...field}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormDescription>Add quantity</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="delivered_at"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date Accepted</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={saveLoading}>
            Accept Delivery
          </Button>
        </form>
      </Form>
    </>
  );
}
