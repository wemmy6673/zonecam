import Header from './Header';
import Nigerians from '../images/nigerians.png';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import { useState, useEffect } from 'react';



const LandingPage = () => {

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        }, 1000)
    }, [])

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckBox = (e) =>{
        setIsChecked(e.target.checked);
    };

    

    return(

        

    <div className='w-[100%]'>
        {
            loading  ? 
                
            <Loader/>  :
         <div className='w-[100%]'> 
            <Header />


            <div className='flex pb-10 px-8 md:px-20 md:space-x-20'>
                {/* <div className='w-full md:w-2/4'>

                    <img src={Nigerians} alt="Nigerians" className='rounded-lg' />

                </div> */}


                <div className='flex flex-col space-y-4 md:w-1/3 md:mx-auto'>
                    <h1 className='text-green-600 text-md font-bold'>Terms of service</h1>
                    <p className='text-gray-600 text-justify font-light text-md'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, quisquam! Inventore optio repellat voluptatem, cumque placeat mollitia voluptatibus saepe eum assumenda a temporibus tempore, accusamus sapiente asperiores! Rem doloremque sunt perspiciatis cumque voluptates eligendi, veniam aliquid minima sapiente sint quia provident sit ducimus quod non nihil nulla reprehenderit omnis quibusdam illum quis a inventore nisi. Mollitia reprehenderit ex magni voluptates maxime sed repellendus sapiente, in aut temporibus reiciendis ratione nesciunt, deserunt vel id! Fugit soluta quis nesciunt exercitationem doloribus praesentium.</p>

                    <div className='flex flex-row space-x-3'>
                        <input type="checkbox" checked={isChecked} onChange={handleCheckBox}/> 
                        <p className='text-sm text-gray-400'>Agree to terms and conditions</p>
                        
                    </div>

                    <Link to='./Predict'><button className={`bg-green-600 text-white rounded-md py-3 px-3 w-full ${isChecked ? 'hover:bg-green-600' : 'bg-green-300 cursor-not-allowed'}`}disabled={!isChecked}>Agree & Continue</button></Link>

                </div>

            </div>


        </div>


        }
        </div>
    )
}



export default LandingPage;


