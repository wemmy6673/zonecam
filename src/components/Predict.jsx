import { BsCapslock } from "react-icons/bs";
import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { createObjectURL, imgSrcToBlob } from "blob-util";
import Header from "./Header";
import Preview from "./Preview";
import { CiCamera } from "react-icons/ci";
import { RiFileUploadLine } from "react-icons/ri";
import { withProtectedAccess } from "./Auth";
import usePrediction from "../utils/hooks/usePrediction";
import { useLocation } from "wouter";
import { retrieveState, saveState } from "../utils/browser";

const sources = [
  {
    name: "Camera",
    description: "Snap a photo",
    icon: CiCamera,
  },
  {
    name: "Upload",
    description: "Upload a photo",
    icon: RiFileUploadLine,
  },
];

const Predict = withProtectedAccess(({ user, logOut, token }) => {
  const [selectedSource, setSelectedSource] = useState(null);

  const [imageFiles, setImageFiles] = useState(null);

  const webcamRef = useRef(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 3) {
      toast.error(
        "You can only upload a maximum of 3 images at a time. Remove some images and try again."
      );
      return;
    }

    const tempFiles = acceptedFiles.map((f) => ({
      preview: createObjectURL(f),
      file: f,
    }));

    setImageFiles(tempFiles);

    // console.log(imageFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpeg", ".jpg"],
      "image/jpeg": [".jpeg", ".jpg"],
      // "image/svg": [".svg"],
      // "image/webp": [".webp"],
    },
    maxFiles: 1,
    maxSize: 1024 * 1024 * 3,

    onDropRejected: (fileRejections) => {
      const errors = fileRejections.map(({ _, errors }) => {
        return `${errors.map((e) => e.message).join(", ")}`;
      });

      console.log(errors);
      toast.error(errors.join("\n"));
    },

    onFileDialogCancel: () => {
      console.log("File dialog cancelled.");
    },

    onError: (error) => {
      console.log("Error occurred:", error);
      toast.error("An error occurred. Please try again.");
    },
  });

  function handleSelectSource(source) {
    return () => {
      setImageFiles([]);
      setSelectedSource(source);
    };
  }

  function removeImage(index) {
    return () => {
      const newImages = imageFiles.filter((_, i) => i !== index);
      setImageFiles(newImages);
    };
  }

  async function captureImage() {
    if (!webcamRef.current) {
      toast.error(
        "Camera not detected. Please allow camera access and try again."
      );
      return;
    }

    if (imageFiles && imageFiles.length >= 3) {
      console.log("Maximum images reached.");
      toast.error(
        "You can only upload a maximum of 1 image at a time. Remove some images and try again."
      );
      return;
    }

    const imageSrc = webcamRef.current.getScreenshot();

    let file;

    try {
      file = await imgSrcToBlob(imageSrc, "image/jpeg", "Anonymous", 1.0);
    } catch (e) {
      console.log(e);
      toast.error("An error occurred. Please try again.");
      return;
    }

    if (imageFiles) {
      setImageFiles([
        {
          preview: imageSrc,
          file,
        },
        ...imageFiles,
      ]);
    } else {
      setImageFiles([
        {
          preview: imageSrc,
          file,
        },
      ]);
    }
  }

  // data fetching ---------------

  const [_, setLocation] = useLocation();

  const onError = (error) => {
    console.log("usePrediction: ", error);

    toast.error("An error occurred. Please try again.");
  };

  const onSucess = (data) => {
    const predictionId = {
      uid: data.uid,
      imageId: data.imageId,
      created: Date.now(),
    };

    let temp = retrieveState("local", "ZONECAM_PREDICTS") || [];

    saveState("local", "ZONECAM_PREDICTS", [...temp, predictionId]);

    toast.success(
      "Your prediction has been queued successfully. You will be redirected to the results page shortly to view the results."
    );

    setLocation("/result");
  };

  const {
    isError,
    isLoading,
    isSuccess,
    predictionRequestResponse,
    queuePrediction,
  } = usePrediction(onSucess, onError, token);

  function handleSubmit() {
    if (imageFiles.length === 0) {
      toast.error("Please upload at least one image to proceed.");
      return;
    }

    let age = prompt("Enter the age of the person in the image.");

    try {
      age = parseInt(age);
    } catch (e) {
      console.log(e);
      toast.error("Please enter a valid age.");
      return;
    }

    if (!age) {
      toast.error("Please enter the age of the person in the image.");
      return;
    }

    let gender;

    const g = prompt("Is the person in the image a male or female? [Type M/F]");

    if (g) {
      if (g.toLowerCase() === "m") {
        gender = "M";
      } else if (g.toLowerCase() === "f") {
        gender = "F";
      } else {
        toast.error("Please enter a valid gender.");
        return;
      }
    }

    console.log("Submitting images...");
    queuePrediction(imageFiles[0], age, gender, `zonecam-${Date.now()}`);
  }

  return (
    <div className=" min-h-screen pt-[10vh] ">
      <Header />

      {!selectedSource && (
        <p className="text-sm text-center text-green-600 pb-4">
          Hello {user.firstName}, please select a source to predict a
          zone.&nbsp;&nbsp;
          <span
            role="link"
            className="text-red-600 cursor-pointer hover:underline"
            onClick={logOut}
          >
            [Log out]
          </span>
        </p>
      )}

      <div className="h-full center   w-full   ">
        {selectedSource && (
          <div className="w-full flex flex-col justify-start items-center space-y-2">
            <div className=" flex flex-row justify-center items-center gap-x-2 lg:gap-x-4 w-full ">
              <h2 className="text-green-500 font-bold lg:font-bold   text-3xl  md:text-4xl   self-center text-center lg:text-left ">
                {selectedSource}
              </h2>

              {imageFiles && imageFiles.length > 0 ? (
                <button
                  disabled={isLoading}
                  onClick={handleSubmit}
                  className="ml-4 px-4 py-2 rounded-lg text-white  bg-green-600 hover:bg-green-700 self-center"
                >
                  {isLoading ? "Predicting..." : "Predict Race"}
                </button>
              ) : (
                <button
                  onClick={() => setSelectedSource(null)}
                  className=" text-green-500 uppercase self-center text-xs  font-semibold hover:text-green-600"
                >
                  Change Source
                </button>
              )}
            </div>

            <div className="w-full flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-8 max-w-xl ">
              {selectedSource === sources[1].name && (
                <div className="w-full space-y-8">
                  <div
                    {...getRootProps()}
                    className="flex flex-col justify-center items-center w-5/6 mx-auto min-h-[300px] border-2 rounded-xl border-dashed border-green-600 space-y-4"
                  >
                    <input {...getInputProps()} />
                    <BsCapslock className="text-green-600 text-2xl" />
                    <div className="space-y-1 text-green-600 text-center px-4">
                      <p className="text-xl lg:text-2xl">
                        {isDragActive
                          ? "Drop the images here ..."
                          : "Drag and Drop images here"}
                      </p>

                      <p className="text-xs text-center">
                        (Accepted formats: png, jpg, jpeg; Max size: 3MB)
                      </p>

                      <p className="text-white/70 text-sm">or</p>
                    </div>

                    <button className="btn-2 text-green-600">Browse</button>
                  </div>

                  {/* Images Preview  */}

                  <Preview imageFiles={imageFiles} removeImage={removeImage} />
                </div>
              )}

              {selectedSource === sources[0].name && (
                <div className="w-full space-y-8  ">
                  <div className="flex flex-col justify-start w-[90%] mx-auto min-h-[200px] rounded-xl space-y-4 relative">
                    <Webcam
                      ref={webcamRef}
                      audio={false}
                      screenshotFormat="image/jpeg"
                      // width="100%"
                      // height="100%"
                      mirrored
                      screenshotQuality={1}
                      className="w-full h-full object-cover rounded-2xl"
                      videoConstraints={{
                        facingMode: "user",
                        //   facingMode: { exact: "environment" },
                      }}
                    />

                    <div className="w-[65%] h-[65%] border-2 border-white rounded-lg absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"></div>

                    <div className="w-[65%] h-[30%] border-x-2 border-inherit z-20  absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"></div>
                  </div>

                  {!(imageFiles && imageFiles.length > 0) && (
                    <div className="w-full flex flex-col justify-center items-center">
                      <button
                        onClick={captureImage}
                        className="w-12 h-12 rounded-full block outline-none  bg-gray-600"
                      ></button>
                    </div>
                  )}

                  {/* Images Preview  */}

                  <Preview imageFiles={imageFiles} removeImage={removeImage} />
                </div>
              )}
            </div>
          </div>
        )}
        {!selectedSource && (
          <div className=" w-full flex flex-col lg:flex-row justify-center gap-y-8 lg:gap-y-0 lg:gap-x-8 items-center">
            {sources.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  onClick={handleSelectSource(v.name)}
                  key={i}
                  className="border hover:bg-green-50 border-green-600 rounded-xl bg-white flex flex-col space-y-4 items-center justify-center w-5/6 md:w-2/6 cursor-pointer py-10 "
                >
                  <div className="flex flex-col justify-center items-center">
                    <Icon className="text-green-600 text-4xl" />
                  </div>

                  <h2 className="text-lg lg:text-xl text-center text-green-600 px-4 pb-4">
                    {v.description}
                  </h2>
                  {/* <button className="btn-2">Select</button> */}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
});

export default Predict;
