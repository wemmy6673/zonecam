import { BsCamera } from "react-icons/bs";
import { BsCapslock } from "react-icons/bs";
import { useState, useEffect, useRef, useCallback} from 'react';
import Camera from '../images/camera.png';
import Webcam from 'react-webcam';
import { toast } from "react-toastify";
import Loader from './Loader';
import {useDropzone} from 'react-dropzone';
import { createObjectURL, imgSrcToBlob} from "blob-util";
import Header from "./Header";
import Preview from './Preview';

const sources = [
  {
    name: "Upload",
    description: "Upload a photo.",
    image: Camera
  },
  {
    name: "Camera",
    description: "Snap a photo.",
    image: Camera
  },
];

const Predict = ({ submitImages }) => {


    // const [loading, setLoading] = useState(false);

    // useEffect(()=>{
    //   setLoading(true)
    //   setTimeout(()=>{
    //       setLoading(false)
    //   }, 1000)
    // }, [])


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
    maxFiles: 3,
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
        "You can only upload a maximum of 3 images at a time. Remove some images and try again."
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
          // file: base64StringToBlob(imageSrc),
          file,
        },
        ...imageFiles,
      ]);
    } else {
      setImageFiles([
        {
          preview: imageSrc,
          // file: base64StringToBlob(imageSrc),
          file,
        },
      ]);
    }
  }

  function handleSubmit() {
    if (imageFiles.length === 0) {
      toast.error("Please upload at least one image to proceed.");
      return;
    }

    submitImages(imageFiles);
  }

  return (

    <div>
      <Header />
    
    <div className="min-h-full  w-full flex flex-col justify-center items-center lg:flex-row lg:space-x-8 space-y-10 lg:space-y-0 pt-4 lg:pt-10">

      {selectedSource && (
        <div className="w-full flex flex-col justify-start items-center">
          <div className="flex flex-row justify-center items-center pb-4 lg:pb-8 space-x-4 ">
            <h2 className="text-white font-bold lg:font-black text-3xl md:text-4xl lg:text-5xl self-center text-center lg:text-left ">
              {selectedSource}
            </h2>

            {imageFiles && imageFiles.length > 0 ? (
              <button
                onClick={handleSubmit}
                className="btn-2 py-2 text-base self-center"
              >
                Detect
              </button>
            ) : (
              <button
                onClick={() => setSelectedSource(null)}
                className=" text-white uppercase self-center text-xs text-white/80 font-semibold hover:text-white"
              >
                Change Source
              </button>
            )}
          </div>

          <div className="w-full flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-8 max-w-xl">
            {selectedSource === sources[0].name && (
              <div className="w-full space-y-8">
                <div
                  {...getRootProps()}
                  className="flex flex-col justify-center items-center w-full min-h-[300px] border-2 rounded-xl border-dashed border-white/80 space-y-4"
                >
                  <input {...getInputProps()} />
                 <BsCapslock className='text-green-600 text-2xl'/>
                  <div className="space-y-1 text-green-600 text-center">
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

            {selectedSource === sources[1].name && (
              <div className="w-full space-y-8 ">
                <div className="flex flex-col justify-start items-center w-full min-h-[200px]  rounded-xl   space-y-4">
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    width="100%"
                    height="100%"
                    mirrored
                    screenshotQuality={1}
                    className="w-full h-full object-cover rounded-2xl"
                    videoConstraints={{
                      facingMode: "environment",
                      //   facingMode: { exact: "environment" },
                    }}
                  />
                </div>

                <div className="w-full flex flex-col justify-center items-center">
                  <button
                    onClick={captureImage}
                    className="w-12 h-12 rounded-full block outline-none  bg-green-600"
                  ></button>
                </div>

                 {/* Images Preview  */}

                 <Preview imageFiles={imageFiles} removeImage={removeImage} />

                
              </div>
            )}
          </div>
        </div>
      )}
      {!selectedSource && (
        <>
          {sources.map((v, i) => {
            return (
              <div
                onClick={handleSelectSource(v.name)}
                key={i}
                className="border border-green-600 rounded-xl bg-white flex flex-col space-y-4 items-center justify-center w-5/6 md:w-2/6 cursor-pointer py-10 "
              >

                <div className="flex flex-col justify-center items-center">
                  <img
                    src={v.image}
                    alt="Upload"
                    className="w-[50px] lg:min-w-[50px]  "
                  />
                </div>
                
                <h2 className="text-lg lg:text-xl text-center text-green-600 px-4 pb-4">
                  {v.description}
                </h2>
                {/* <button className="btn-2">Select</button> */}
              </div>
            );
          })}
        </>
      )}
    </div>
    </div>
  );
}


export default Predict;