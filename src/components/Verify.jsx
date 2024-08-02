import Header from "./Header";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { useState } from "react";
import { useLocation, useParams } from "wouter";
import Loader from "./Loader";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { createFetcher, endpoints } from "../utils/fetchhelpers";
import useCountdownTimer from "../utils/hooks/useCountdownTimer";
import cn from "classnames";
import OTPField from "./OTPField";

const Verify = () => {
  const { acuid, rid } = useParams();

  const [args, setArgs] = useState({
    acuid,
    rid,
  });

  const numInputs = 6;
  const [otp, setOtp] = useState("");

  const otpValid = !(!otp || otp.length < numInputs);

  const [_, navigate] = useLocation();

  const [resendCount, setResendCount] = useState(0);

  const url = `${endpoints.verifyEmail}/${args.rid}/${args.acuid}/complete?&code=${otp}`;
  const url2 = `${endpoints.verifyEmail}/${args.rid}/${args.acuid}`;

  const { countEnded, remainingTime, setFutureTimestamp } = useCountdownTimer(
    new Date()
  );

  const {
    mutate: resendCode,
    isLoading: resending,
    reset: resetResend,
  } = useMutation({
    mutationFn: createFetcher({
      url: url2,
      method: "POST",
    }),

    mutationKey: [endpoints.verifyEmail, args],

    onError: (error) => {
      resetResend();

      toast.error(error.message);

      console.log("error: ", error);
    },

    onSuccess: (data) => {
      // console.log("data: ", data);

      setArgs({
        acuid: data.acuid,
        rid: data.rid,
      });

      setOtp("");

      setFutureTimestamp(Date.now() + 30000 * (resendCount + 1));
      setResendCount((p) => p + 1);

      toast.success("New code sent to your inbox.");
    },
  });

  const { mutate, isLoading, reset } = useMutation({
    mutationFn: createFetcher({
      url,
      method: "POST",
    }),

    mutationKey: [endpoints.verifyEmailComplete, otp],

    onError: (error) => {
      reset();

      toast.error(error.message);

      console.log("error: ", error);
    },

    onSuccess: (data) => {
      // console.log("data: ", data);

      toast.success("Email verified successfully.");

      navigate("/login");
    },
  });

  function handleProceed() {
    mutate();
  }

  function handleResendClick() {
    resendCode();
  }

  const resendDisabled = isLoading || resending || !countEnded;

  return (
    <div className="w-[80%] mx-auto pt-[10vh] max-w-2xl">
      <Header />

      <p className="text-center text-sm text-green-500">
        We sent a verification code to your email address ({args.rid}) . Please
        check your inbox.
      </p>

      <div className="px-4  block w-full mx-auto ">
        <div className="w-full">
          <OTPField otp={otp} setOtp={setOtp} />
        </div>

        <div className="w-full mt-8 text-green-500 center ">
          <button
            type="button"
            role="button"
            onClick={handleProceed}
            disabled={!otpValid}
            className={
              "bg-green-600 w-max text-white my-2 py-4 rounded-xl px-6 disabled:opacity-40 disabled:pointer-events-none" +
              cn({
                " pointer-events-none ": false,
              })
            }
          >
            {isLoading ? <Loader inverted /> : "Verify email"}
          </button>
        </div>

        <section className="mt-8 w-full flex flex-row space-x-4 items-center justify-center text-faint mb-4 text-sm">
          {!resendDisabled && (
            <button
              type="button"
              role="button"
              onClick={handleResendClick}
              disabled={resendDisabled}
              className=" disabled:opacity-50 hover:cursor-pointer  hover:text-foreground transition-flow  text-sm text-green-700 space-x-1 flex flex-row justify-center items-center "
            >
              <BsArrowCounterclockwise className="text-base" />
              <span className=" px-1 whitespace-nowrap inline-block text-center">
                Resend Code
              </span>
            </button>
          )}
          {resendDisabled && (
            <span className="text-base opacity-60">
              Resend in {remainingTime.minutesStr}:
              {remainingTime.secondsStr + ""}
            </span>
          )}
        </section>
      </div>
    </div>
  );
};

export default Verify;
