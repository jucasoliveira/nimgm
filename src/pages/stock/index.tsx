import Layout from "@/components/Layout";
import { useToast } from "@/components/ui/use-toast";
import useFetch from "@/hooks/useFetch";

function App() {
  const { toast } = useToast();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const {
    data: result,
    error,
    loading,
  } = useFetch<StandardResponse>(`http://localhost:8080/get-stock`);

  return (
    <>
      <Layout>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Stock</h2>
            <div className="flex items-center space-x-2"></div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default App;
