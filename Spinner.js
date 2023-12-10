import React from 'react'
import loading1 from './loading1.gif'
const Spinner = () => {

  return (
    <div className='text-center'>
      <img style={{ width: '60px', height: '60px' }} src={loading1} alt="loading1" />
    </div>
  )
}


export default Spinner