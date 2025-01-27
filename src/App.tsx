import Home from "./pages/Home";
import "./App.css";
import Nav from "./components/layout/Nav";
import AlertContext from "./context/AlertState";
import Footer from "./components/layout/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <Provider>
        <AlertContext>
          <QueryClientProvider client={queryClient}>
            <Nav />
            <Home />
            <Toaster />
          </QueryClientProvider>
        </AlertContext>
      </Provider>
    </>
  );
}

export default App;
