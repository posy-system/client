import React from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonCompo from './ButtonCompo'
import { LogoutUser } from '../../apis/LoginApis'

export default function LogoutButton() {
  const navigate = useNavigate();

  return (
    <div>
      <ButtonCompo onClick={() => LogoutUser(navigate)}>
        Logout
      </ButtonCompo>
    </div>
  )
}
