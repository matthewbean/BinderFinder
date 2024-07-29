import Home from "./pages/Home";
import "./App.css";
import Nav from "./components/Nav";
import AlertContext from "./context/AlertState";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <ChakraProvider>
        <AlertContext>
          <QueryClientProvider client={queryClient}>
            <Nav />
            <Home />
          </QueryClientProvider>
        </AlertContext>
      </ChakraProvider>
    </>
  );
}

export default App;
