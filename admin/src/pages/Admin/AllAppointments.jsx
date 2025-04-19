import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken, getAllAppointments])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>

        {/* Header for larger screens */}
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b font-medium'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.map((item, index) => (
          <div
            key={index}
            className='flex flex-wrap sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] justify-between max-sm:gap-2 items-center text-gray-600 py-3 px-6 border-b hover:bg-gray-50'
          >
            {/* Index */}
            <p className='max-sm:hidden font-medium'>{index + 1}</p>

            {/* Patient Info */}
            <div className='flex items-center gap-2'>
              <img
                className='w-8 h-8 rounded-full bg-gray-200 object-cover'
                src={item.userData?.image || '/default-avatar.png'}
                alt='Patient'
              />
              <p>{item.userData?.name || 'Unknown'}</p>
            </div>

            {/* Age */}
            <p className='max-sm:hidden'>
              {item.userData?.dob ? calculateAge(item.userData.dob) : 'N/A'}
            </p>

            {/* Date & Time */}
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            {/* Doctor Info */}
            <div className='flex items-center gap-2'>
              <img
                className='w-8 h-8 rounded-full bg-gray-200 object-cover'
                src={item.docData?.image || '/default-avatar.png'}
                alt='Doctor'
              />
              <p>{item.docData?.name || 'Unknown'}</p>
            </div>

            {/* Fees - No trailing .00 */}
            <p>{currency} {item.amount}</p>

            {/* Cancel or Cancelled Status */}
            {item.cancelled ? (
              <p className='text-red-500 text-xs font-semibold'>Cancelled</p>
            ) : item.isCompleted ?
              <p className='text-green-500 text-xs font-semibold'>Completed</p> : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className='w-6 h-6 cursor-pointer'
                  src={assets.cancel_icon}
                  alt='Cancel'
                />
              )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointments
