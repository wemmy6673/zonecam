import { retrieveState, clearState, saveState } from "../utils/browser";
import { createFetcher } from "../utils/fetchhelpers";
import { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { BsX } from "react-icons/bs";
import moment from "moment";
import config from "../config";
import { withProtectedAccess } from "./Auth";
import Bg1 from "../assets/images/bg2.jpg";

const Results = withProtectedAccess(function A({ token }) {
  let temp = retrieveState("local", "ZONECAM_PREDICTS") || [];

  if (!Array.isArray(temp)) {
    saveState("local", "ZONECAM_PREDICTS", []);

    temp = [];
  }

  const [predictionIds, setPredictionIds] = useState(temp);

  const sortedPredictionIds = predictionIds.sort((a, b) => {
    if (a.created && b.created) return +a.created - b.created;

    return 0;
  });

  const { data, isFetching } = useQuery({
    queryKey: [config.endpoints.getPredictionResult, predictionIds],

    refetchInterval: (data) => {
      if (data && data.length === predictionIds.length) return false;

      return 10000;
    },

    queryFn: createFetcher({
      url: config.endpoints.getPredictionResult,
      method: "POST",
      body: sortedPredictionIds.map((v) => v.uid),
      auth: token,
    }),

    onError(err) {
      console.log(err);
      toast.error("Unable to fetch results.");
    },

    onSuccess(data) {
      //   console.log("Results: ", data);
    },
  });

  function removePendingResult(uid) {
    return () => {
      if (!confirm("Delete result?")) return;

      const newPredictionIds = predictionIds.filter((v) => v.uid !== uid);
      saveState("local", "ZONECAM_PREDICTS", newPredictionIds);
      setPredictionIds(newPredictionIds);
    };
  }

  function getResultFromData(uid) {
    if (!data || data.length === 0)
      return {
        ready: false,
        data: null,
      };

    const result = data.find((v) => {
      return v.predictionRequestId === uid;
    });

    if (!result) {
      return {
        ready: false,
        data: null,
      };
    }

    return {
      ready: true,
      data: result["result"],
    };
  }

  return (
    <div className="fixed inset-0 min-h-screen w-full bg-white text-green-500">
      <div className="absolute inset-0 bg-white bg-opacity-10"></div>

      {/* Main Content  */}
      <main className=" min-h-screen  absolute z-10 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[90%] pt-8 pb-24 max-w-[1024px] space-y-8  overflow-y-scroll max-h-full no-scrollbar">
        <div className="space-y-8 lg:space-y-12">
          <h2 className="font-bold text-2xl lg:text-3xl ">
            {" "}
            Your ZoneCam Results{" "}
          </h2>

          {sortedPredictionIds.length === 0 && (
            <div className="space-y-8 lg:space-y-16 pb-16">
              <p className="text-green-500  ">
                You have no pending results at the moment.
              </p>
            </div>
          )}

          {sortedPredictionIds.length > 0 && (
            <div className="space-y-5 lg:space-y-10 pb-16">
              {sortedPredictionIds.map((v, i) => {
                const r = getResultFromData(v.uid);

                return (
                  <div
                    key={i}
                    className="flex relative min-h-[100px] w-full bg-green-500 border border-dashed border-white/20 flex-col  justify-start items-start p-4 lg:p-6 space-y-2"
                  >
                    <div
                      title="Delete result"
                      onClick={removePendingResult(v.uid)}
                      className="p-1 absolute top-2 right-2 cursor-pointer bg-white hover:bg-white/90"
                    >
                      <BsX className=" text-2xl" />
                    </div>

                    <p className="text-white font-semibold text-xl capitalize">
                      {v.imageId}
                    </p>

                    {r?.data?.imageString && (
                      <img
                        src={`data:image/png;base64,${r.data.imageString}`}
                        alt="Maize"
                        className="w-24 h-24"
                      />
                    )}

                    {r.ready && (
                      <div className="space-y-2 font-normal text-white">
                        <p>
                          This person's race is most likely{" "}
                          <span className="text-[--corn-yellow] font-bold">
                            {" "}
                            {r.data.labelClass}.{"  "}
                          </span>
                        </p>
                      </div>
                    )}

                    {!r.ready && (
                      <p className="text-sm text-white/70">
                        Status :{" "}
                        {isFetching
                          ? "Refreshing"
                          : r.ready
                          ? "Ready"
                          : "Pending"}
                      </p>
                    )}
                    <p className="text-sm text-white">
                      Requested{" "}
                      {moment(new Date(+v.created), "YYYYMMDD").fromNow()}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
});

export default Results;
