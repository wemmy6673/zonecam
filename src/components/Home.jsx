import { BsCamera } from "react-icons/bs";
import { BsCapslock } from "react-icons/bs";
import { useState, useRef} from 'react';
import {Camera} from "react-camera-pro";

const Home = () => {

    const [image, setImage] = useState(null);
    const camera = useRef(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);

    const openCamera = () => {

      setIsCameraOpen(true);
    }

    const takePicture = () =>{
      const photo = camera.takePhoto();
      setImage(photo);
      setIsCameraOpen(false);
    }



    

    

    return(
        <div className=' mx-auto py-10 md:py-20 px-6 md:px-0'>
            <div className='flex flex-col  space-y-10 w-[100%] items-center'>
            <h1 className='text-green-600 text-2xl font-bold'>WELCOME!</h1>

            <div className='flex flex-col space-y-8 md:space-y-0 md:flex-row md:space-x-6 cursor-pointer'>
            
                <div className='border border-green-600 text-green-600  p-10 rounded-2xl items-center'>

                {!isCameraOpen ? (<BsCamera className='text-6xl' onClick={openCamera}/>
                ) : (
                  <>
                  <Camera ref={camera} facingMode='user' />
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

                <p>Take Photo</p>

                

                </div>

                

                
                <div className='border border-green-600 text-green-600  p-10 rounded-2xl items-center md:w-2/4'>


                <BsCapslock className='text-6xl' />

                <p className='py-2'>Upload Photo</p>

                <input className='bg-white text-green-600' type='file' accept="image/*" id='cameraInput'  />
                {image && (
                  <div>
                    <img src={image} alt="captured" style={{width: '300px', height: 'auto'}}/>
                  </div>
                )}

                </div>

 

            </div>
            </div>
        </div>
    )


}

export default Home;