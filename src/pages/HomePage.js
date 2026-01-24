import React from 'react'
import InputCompo from '../components/inputfield/InputCompo'
import { FaRegUser } from "react-icons/fa";
import ButtonCompo from '../components/button/ButtonCompo';

export default function HomePage() {
  return (
    <div className="mx-auto  px-4 pb-8">
      <h1 className="mb-4 text-2xl font-semibold">Home Page</h1>

      <InputCompo 
        type="text" 
        placeholder="Enter something"
        label="Input Label"
        icon={<FaRegUser className='text-slate-500 dark:text-slate-300' />}
      />

      <div className="mt-6 flex flex-wrap gap-3">
        <ButtonCompo
          variant="blue"
          onClick={() => alert('Blue button clicked!')}
          icon={<FaRegUser className='text-current' />}
        >
          Blue
        </ButtonCompo>

        <ButtonCompo
          variant="red"
          onClick={() => alert('Red button clicked!')}
          icon={<FaRegUser className='text-current' />}
        >
          Red
        </ButtonCompo>

        <ButtonCompo
          variant="green"
          onClick={() => alert('Green button clicked!')}
          icon={<FaRegUser className='text-current' />}
        >
          Green
        </ButtonCompo>
      </div>
    </div>
  )
}
