import React from 'react'
import { Carousel } from "flowbite-react";
import home1 from '../../assets/Home1.png'
import home2 from '../../assets/Home2.png'
import home3 from '../../assets/Home3.png'
const Home = () => {
  return (
    <div className='bg-white' id='home'>
      <div className='px-4 lg:px-14 max-w-screen-2xl mx-auto min-h-screen h-screen'>
        <Carousel className = "w-full mx-auto">
            <div className="my-28 md:my-8 py-12  flex flex-col md:flex-row-reverse items-center justify-between gap-12">
              <div>
                <img src={home1} alt=''/>
              </div>
              <div className='md:w-1/2'>
                   <h1 className='text-5xl font-semibold mb-4 text-neutralDGrey md:w-3/4 leading-snug'>Live Streaming</h1>
                   <p className = 'text-neutralDGrey text-base mb-8'>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                      industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
                   </p>
                   <button className='btn-primary'>
                      Learn More
                    </button>
              </div>
            </div>
            <div className="my-28 md:my-8 py-12  flex flex-col md:flex-row-reverse items-center justify-between gap-12">
              <div>
                <img src={home2} alt=''/>
              </div>
              <div className='md:w-1/2'>
                   <h1 className='text-5xl font-semibold mb-4 text-neutralDGrey md:w-3/4 leading-snug'>Live Streaming</h1>
                   <p className = 'text-neutralDGrey text-base mb-8'>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                      industry's standard dummy text ever since the 1500s,
                   </p>
                   <button className='btn-primary'>
                      Learn More
                    </button>
              </div>
            </div>
            <div className="my-28 md:my-8 py-12  flex flex-col md:flex-row-reverse items-center justify-between gap-12">
              <div>
                <img src={home3} alt=''/>
              </div>
              <div className='md:w-1/2'>
                   <h1 className='text-5xl font-semibold mb-4 text-neutralDGrey md:w-3/4 leading-snug'>Live Streaming</h1>
                   <p className = 'text-neutralDGrey text-base mb-8'>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                      industry's standard dummy text ever since the 1500s
                   </p>
                   <button className='btn-primary'>
                      Learn More
                    </button>
              </div>
            </div>
        </Carousel>
      </div>
    </div>
  )
}

export default Home
