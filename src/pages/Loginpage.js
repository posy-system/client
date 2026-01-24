import React from 'react'
import InputCompo from '../components/inputfield/InputCompo'
import ButtonCompo from '../components/button/ButtonCompo'

export default function Loginpage() {
  return (
    <div className='flex justify-center'>
      <div className='bg-white/10 rounded-xl w-[800px] '>
      <form>
        <InputCompo
        type="text"
        placeholder="Enter your username"
        label="Username"
      />
        <InputCompo
        type="password"
        placeholder="Enter your password"
        label="Password"
      />

      <ButtonCompo
        variant="blue"
        onClick={() => alert('Login button clicked!')}
        
      >
        Login
      </ButtonCompo>
      </form>

      
      

      </div>
    </div>
  )
}
