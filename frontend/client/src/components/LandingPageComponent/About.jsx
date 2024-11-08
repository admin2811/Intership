import React from 'react'
//import about from '../../assets/About.png'
//import icon4 from '../../assets/Icons/Icon4.png'
//import icon3 from '../../assets/Icons/Icon3.png'
//import icon5 from '../../assets/Icons/Icon5.png'
//import icon6 from '../../assets/Icons/Icon6.png'
const About = () => {
  return (
    <div id='about'>
       <div className='px-4 lg:px-14 max-w-screen-2xl mx-auto my-8'>
            <div className='md:w-11/12 mx-auto flex flex-col md:flex-row justify-between items-center gap-20'>
                <div>
                    <img src="../../assets/About.png" alt= ''/>
                </div>
                <div className='md:w-3/5 mx-auto'>
                    <h2 className='text-4xl text-neutralDGrey font-semibold mb-4 md:w-4/5'>The unseen of spending three years at Pixelgrade</h2>
                    <p className='md:w-3/4 text-sm text-neutralDGrey mb-8'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo ipsum. Sed accumsan quam vitae est varius fringilla.
                        Pellentesque placerat vestibulum lorem sed porta. Nullam mattis tristique iaculis. Nullam pulvinar sit amet risus pretium auctor. 
                        Etiam quis massa pulvinar, aliquam quam vitae, tempus sem. Donec elementum pulvinar odio.
                    </p>
                    <button className='btn-primary'>Read More</button>
                </div>
            </div>
       </div>

       <div className='px-4 lg:px-14 max-w-screen-2xl mx-auto py-16 bg-neutralSliver'>
            <div className='flex flex-col md:flex-row justify-between items-center'>
                <div className='md:w-1/2'>
                    <h2 className='text-4xl text-neutralDGrey font-semibold mb-4 md:w-2/3'>
                        Helping a local
                        <br/>
                        <span className='text-brandPrimary'>bussiness reinvent itself</span>
                    </h2>
                    <p className=''>
                        We reached here with our hard work and dedication
                    </p>
                </div>

                <div className='md:w-1/2 mx-auto flex sm:flex-row flex-col sm:items-center justify-around gap-12'>
                    <div className='space-y-8'>
                        <div className='flex items-center gap-4'>
                            <img src='../../assets/Icons/Icon4.png' alt=''/>
                            <div>
                                <h4 className='text-2xl font-semibold text-neutralDGrey mb-2'>2,245,341</h4>
                                <p className='text-sm text-neutralDGrey'>Membership</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-4'>
                            <img src='../../assets/Icons/Icon3.png' alt=''/>
                            <div>
                                <h4 className='text-2xl font-semibold text-neutralDGrey mb-2'>46,328</h4>
                                <p className='text-sm text-neutralDGrey'>Clubs</p>
                            </div>
                        </div>
                    </div>
                    <div className='space-y-8'>
                        <div className='flex items-center gap-4'>
                            <img src='../../assets/Icons/Icon3.png' alt=''/>
                            <div>
                                <h4 className='text-2xl font-semibold text-neutralDGrey mb-2'>828,867</h4>
                                <p className='text-sm text-neutralDGrey'>Event Bookings</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-4'>
                            <img src='../../assets/Icons/Icon6.png' alt=''/>
                            <div>
                                <h4 className='text-2xl font-semibold text-neutralDGrey mb-2'>1,926,436</h4>
                                <p className='text-sm text-neutralDGrey'>Payments</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </div>
    </div>
  )
}

export default About
