import Layout from "@/components/Layout";
import { FormPage } from "./Form";
import { History } from "./History";

function App() {
  return (
    <>
      <Layout>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-start space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Deliveries</h2>
          </div>
          <div className="flex items-center justify-start space-y-2">
            <h3 className="text-xl font-bold tracking-tight">
              Accept products into your stock
            </h3>
          </div>
        </div>
        <div className="flex p-8 space-x-4 justify-between">
          <div className="w-2/3">
            <FormPage />
          </div>
          <div className="w-1/3">
            <History />
          </div>
        </div>
      </Layout>
    </>
  );
}

export default App;
