import { Link } from 'react-router-dom';
import Logo from '../images/logo.png';

const LandingPage = () => {

    return(

        <div className="mx-auto justify-center">
            <div className='flex flex-col px-16 md:px-0 space-y-2 items-center w-[100%] pt-16'>
                <img src={Logo} width="300" height="300" className=""/>
                <div className='flex flex-col space-y-4 md:space-y-4'>
                    <p className='max-w-sm text-justify text-green-600 text-sm'>
                        Discover your roots..... 

                     </p>
                   <Link to='./Home'> <button className='bg-green-600 hover:border hover:border-green-600 hover:bg-white hover:text-green-600 text-white rounded-3xl py-3 px-6'>Get started</button> </Link>
                </div>
            </div>

        </div>

    )

}

export default LandingPage;