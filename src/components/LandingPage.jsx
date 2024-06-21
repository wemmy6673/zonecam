import Header from './Header';
import Nigerians from '../images/nigerians.png';
import {Link} from 'react-router-dom'

const LandingPage = () => {

    return(

        <div className=''>

            <Header />


            <div className='flex flex-col-reverse pb-10 md:flex-row px-6 md:px-20 md:space-x-20'>
                <div className='w-full md:w-2/4'>

                    <img src={Nigerians} alt="Nigerians" className='rounded-lg' />

                </div>


                <div className='flex flex-col space-y-4 md:w-1/3'>
                    <h1 className='text-green-600 text-md font-bold'>OVERVIEW</h1>
                    <p className='text-green-600 text-justify font-light text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, quisquam! Inventore optio repellat voluptatem, cumque placeat mollitia voluptatibus saepe eum assumenda a temporibus tempore, accusamus sapiente asperiores! Rem doloremque sunt perspiciatis cumque voluptates eligendi, veniam aliquid minima sapiente sint quia provident sit ducimus quod non nihil nulla reprehenderit omnis quibusdam illum quis a inventore nisi. Mollitia reprehenderit ex magni voluptates maxime sed repellendus sapiente, in aut temporibus reiciendis ratione nesciunt, deserunt vel id! Fugit soluta quis nesciunt exercitationem doloribus praesentium.</p>

                    <Link to='./Predict'><button className='bg-green-600 text-white rounded-xl py-3 px-6'>Make Prediction</button></Link>

                </div>

            </div>


        </div>

    )
}

export default LandingPage;


