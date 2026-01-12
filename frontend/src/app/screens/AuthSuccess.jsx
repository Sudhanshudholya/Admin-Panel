import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from '../services/userSlice'
import { useNavigate } from 'react-router-dom'

const AuthSuccess = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(()=>{
      const handleAuth = async () => {
        const params = new URLSearchParams(window.location.search)
        console.log("params",params)

        const accessToken = params.get("token")
        console.log("accessToken", accessToken)

        if(accessToken){
          localStorage.setItem("accessToken", accessToken)
          try {
            const res = await axios.get('http://localhost:8000/auth/me', {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            })
            if(res){
              dispatch(setUser(res.data.user))
              navigate("/")
            }
          } catch (error) {
            console.log(error, "Error fetching user")
          }
        }
      }
      handleAuth()
  }, [navigate, dispatch])
  return (
    <div>
      Logging you
    </div>
  )
}

export default AuthSuccess