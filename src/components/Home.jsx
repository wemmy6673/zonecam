import { BsCamera } from "react-icons/bs";
import { BsCapslock } from "react-icons/bs";
import { useRef } from 'react';

const Home = () => {

    const videoRef = useRef(null);
    // const canvasRef = useRef(null);



    const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        } catch (error) {
          console.error('Error accessing camera:', error);
        }
      };

    //   const stopCamera = () => {
    //     const stream = videoRef.current.srcObject;
    //     const tracks = stream.getTracks();
    
    //     tracks.forEach((track) => {
    //       track.stop();
    //     });
    
    //     videoRef.current.srcObject = null;
    //   };
    

    return(
        <div className=' mx-auto py-10 md:py-20'>
            <div className='flex flex-col space-y-10 w-[100%] items-center'>
            <h1 className='text-green-600 text-2xl font-bold'>WELCOME!</h1>

            <div className='flex flex-col space-y-8 md:space-y-0 md:flex-row md:space-x-6 cursor-pointer'>
                <div className='border border-green-600 text-green-600  p-10 rounded-2xl items-center' onClick={startCamera()}>


                <BsCamera className='text-6xl' />

                <p className='py-2'>Take Photo</p>
                

                </div>

                <div className='border border-green-600 text-green-600  p-10 rounded-2xl items-center'>


                <BsCapslock className='text-6xl' />

                <p className='py-2'>Upload Photo</p>

                </div>

 

            </div>
            </div>
        </div>
    )


}

export default Home;