import Predict from "./components/Predict";
import SignUp from "./components/SignUp";
import Verify from "./components/Verify";
import LandingPage from "./components/LandingPage";
import SignIn from "./components/SignIn";
import Result from "./components/Result";
import { Route, Switch } from "wouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RecoilRoot } from "recoil";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <div className="w-full">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        closeButton={false}
        limit={1}
        stacked
      />

      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/register" component={SignUp} />
            <Route path="/login" component={SignIn} />
            <Route path="/predict" component={Predict} />
            <Route path="/email/:acuid/:rid" component={Verify} />
            <Route path="/result" component={Result} />
          </Switch>
        </QueryClientProvider>
      </RecoilRoot>
    </div>
  );
}

export default App;
