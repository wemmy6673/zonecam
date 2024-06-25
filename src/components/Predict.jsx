import { BsCamera } from "react-icons/bs";
import { BsCapslock } from "react-icons/bs";
import { useState, useEffect, useRef, useCallback} from 'react';
import Loader from './Loader';
import {useDropzone} from 'react-dropzone';
import {Camera} from "react-camera-pro";
import Header from "./Header";

const Predict = () => {


    const [loading, setLoading] = useState(false);

    useEffect(()=>{
      setLoading(true)
      setTimeout(()=>{
          setLoading(false)
      }, 1000)
    }, [])


    const [image, setImage] = useState(null);
    const camera = useRef(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const onDrop = useCallback(acceptedFiles => {

      console.log(acceptedFiles);

    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: {
      'image/png': [".png"],
      'image/jpg': [".jpeg", ".jpg"],
      'image/jpeg': [".jpg", "jpeg"],
      'image/svg': [".svg"],
      'image/webp': [".webp"],

    }
    })

    const openCamera = () => {

      setIsCameraOpen(true);
    }

    const takePicture = () =>{
      const photo = camera.takePhoto();
      setImage(photo);
      setIsCameraOpen(false);
    }



    

    

    return(

      <div className=''>
        {
            loading  ? 
                
            <Loader/>  :
  
        <div className=' mx-auto py-5 md:py-0 px-6 md:px-0 items-center'>
          <Header />
            <div className='flex flex-col  space-y-10 w-[100%] items-center'>
              

            <div className='flex flex-col space-y-8 md:space-y-0 md:flex-row md:space-x-6 cursor-pointer mx-auto'>
            
                <div className='border border-green-600 text-green-600  p-10 rounded-2xl items-center w-full md:w-3/5'>

                {!isCameraOpen ? (<BsCamera className='text-6xl mx-auto' onClick={openCamera}/>
                ) : (
                  <>
                  <Camera ref={camera} facingMode='user' aspectRatio={4 / 3} />
                  <button onClick={takePicture}>Capture Image</button>
                  </>
                )}

               {   

                image && (
                  <div>
                    <h2>Captured Image</h2>
                    <img src={image} alt="Captured" style={{ width: '300px', height: 'auto' }} />
                  </div>
                )

                }

                <p className="text-center">Take Photo</p>

                

                </div>

                

                
               

            <div
               {...getRootProps()}
                 className={`border border-green-600 p-10 rounded-2xl text-center cursor-pointer ${
                   isDragActive ? 'border-green-600' : 'border-green-600'
                 }`}
    >
                <input {...getInputProps()} />
                   <BsCapslock className="text-6xl text-green-600 mx-auto mb-4" />
              <p className="text-green-600">
                 {isDragActive ? 'Drop the files here ...' : 'Drag & drop some files here, or click to select files'}
              </p>
            </div>

 

            </div>
            </div>
        </div>

        }
        </div>
    )


}

export default Predict;