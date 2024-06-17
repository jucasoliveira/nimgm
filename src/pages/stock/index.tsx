import Layout from "@/components/Layout";
import useFetch from "@/hooks/useFetch";
import { DataTable } from "./data-table";
import { columns } from "./colums";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const {
    data: result,
    error,
    loading,
    refetch,
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
        {!error && !loading && result && (
          <div className="flex-1 space-y-4 p-8 pt-6">
            <DataTable columns={columns} data={result.data} refetch={refetch} />
          </div>
        )}
      </Layout>
    </>
  );
}

export default App;
