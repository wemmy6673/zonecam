import { useMutation } from "react-query";
import { createFetcher } from "../fetchhelpers";
import config from "../../config";
import { saveState, retrieveState, resizeFile } from "../browser";

function usePrediction(onSucess, onError, token) {
  const { data, isError, isLoading, isSuccess, mutate } = useMutation({
    mutationFn: createFetcher({
      url: config.endpoints.queuePrediction,
      method: "POST",
      auth: token,
    }),

    mutationKey: config.endpoints.queuePrediction,

    onSuccess: (data) => {
      const prev = retrieveState("local", "queuedPredictions");

      if (prev) {
        try {
          const parsed = JSON.parse(prev);

          const updated = [...parsed, data];

          saveState("local", "queuedPredictions", JSON.stringify(updated));
        } catch (e) {
          console.error(e);

          saveState("local", "queuedPredictions", JSON.stringify([data]));
        }
      } else {
        saveState("local", "queuedPredictions", JSON.stringify([data]));
      }

      if (onSucess) {
        onSucess(data);
      }
    },

    onError: (error) => {
      if (onError) {
        onError(error);
      }
    },
  });

  async function queuePrediction(imageFile, age, gender, predictionId) {
    if (isLoading) return;

    const file = imageFile;

    const resized = await resizeFile(file.file);

    const body = {
      imageString: resized.split(",")[1],
      age,
      gender,
      id: predictionId,
    };

    // console.log("Body: ", body);

    mutate(body);
  }

  return {
    queuePrediction,
    predictionRequestResponse: data,
    isError,
    isLoading,
    isSuccess,
  };
}

export default usePrediction;
