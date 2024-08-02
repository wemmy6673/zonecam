import Verified from "../assets/images/verifiedicon.png";
import { withProtectedAccess } from "./Auth";

const Result = withProtectedAccess(() => {
  return (
    <div className="w-[100%] flex items-center justify-center h-screen">
      <div className="flex flex-col space-y-2 mx-auto items-center">
        <img src={Verified} alt="verified" width="96" height="96" />
        <h1 className="text-4xl font-normal">Test Complete</h1>
        <p className="text-gray-700 max-w-lg text-center font-light">
          Results show that this person comes from XXXX zone.
        </p>
      </div>
    </div>
  );
});

export default Result;
