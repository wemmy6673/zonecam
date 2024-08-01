import Predict from "./components/Predict";
import SignUp from "./components/SignUp";
import LandingPage from "./components/LandingPage";
import SignIn from "./components/SignIn";
// import Result from "./components/Result";
import { Route } from "wouter";

function App() {
  return (
    <div className="w-full">
      <Route path="/" component={LandingPage} />
      <Route path="/register" component={SignUp} />
      <Route path="/login" component={SignIn} />
      <Route path="/predict" component={Predict} />
      {/* <Route path="/result" component={Result} /> */}
    </div>
  );
}

export default App;
