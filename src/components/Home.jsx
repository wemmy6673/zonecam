import { BsCamera } from "react-icons/bs";
import { BsCapslock } from "react-icons/bs";
import { useState, useRef } from 'react';

const Home = () => {

    const [image, setImage] = useState(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const handleImageCapture = (e) =>{
      const file = e.target.files[0];
      if(file) {
        const imageUrl = URL.createObjectUrl(file);
        setImage(imageUrl);
      }
    };

    const openCamera = async () => {

      try {
        const stream = await navigator.mediaDevices.getUserMedia({video: true});
        videoRef.current.srcObject = stream;
        setIsCameraOpen(true);
      }
      catch (err) {
        console.error('Error accessing media devices.', err);
      }
    };

    const takePicture = () =>{
      const context = canvasRef.current.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      setImageSrc(canvasRef.current.toDataURL('image/png'));

    }

    

    

    return(
        <div className=' mx-auto py-10 md:py-20'>
            <div className='flex flex-col space-y-10 w-[100%] items-center'>
            <h1 className='text-green-600 text-2xl font-bold'>WELCOME!</h1>

            <div className='flex flex-col space-y-8 md:space-y-0 md:flex-row md:space-x-6 cursor-pointer' onClick={openCamera}>
              { !isCameraOpen ? (
                <div className='border border-green-600 text-green-600  p-10 rounded-2xl items-center'>


                <BsCamera className='text-6xl' />

                <p className='py-2'>Take Photo</p>

                

                </div>) : (

                   <>
                <video ref={videoRef} autoPlay style={{ width: '300px', height: 'auto' }}></video>
                <button onClick={takePicture}>Capture Image</button>
                <canvas ref={canvasRef} style={{}} width="300" height="200"></canvas>
                  {imageSrc && (
                    <div>
                       <h2>Captured Image:</h2>
                        <img src={imageSrc} alt="Captured" style={{ width: '300px', height: 'auto' }} />
                   </div>
                )}
        </>


                )

                }

                
                <div className='border border-green-600 text-green-600  p-10 rounded-2xl items-center'>


                <BsCapslock className='text-6xl' />

                <p className='py-2'>Upload Photo</p>

                <input className='text-black' type='file' accept="image/*" capture='environment' id='cameraInput' onChange={handleImageCapture} />
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