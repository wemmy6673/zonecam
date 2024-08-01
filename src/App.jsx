import Predict from "./components/Predict";
import SignUp from "./components/SignUp";
import LandingPage from "./components/LandingPage";
import SignIn from "./components/SignIn";
// import Result from "./components/Result";
import { Route } from "wouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <Route path="/" component={LandingPage} />
      <Route path="/register" component={SignUp} />
      <Route path="/login" component={SignIn} />
      <Route path="/predict" component={Predict} />
      {/* <Route path="/result" component={Result} /> */}
    </div>
  );
}

export default App;
