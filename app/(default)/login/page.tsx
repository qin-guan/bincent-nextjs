'use client'

import {ChangeEvent, useEffect, useReducer, useRef} from 'react'
import {ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth'
import {useFirebase} from '../../../providers/firebase'
import {useRouter} from "next/navigation";

interface FormReducer {
  requested: boolean,
  phone: string,
  otp: string
}

export default function LoginPage() {
  const router = useRouter()
  const {auth} = useFirebase()
  const confirmationResult = useRef<ConfirmationResult>()
  const recaptchaVerifier = useRef<RecaptchaVerifier>()

  const [state, dispatch] = useReducer((state: Partial<FormReducer>, action: Partial<FormReducer>) => {
    return {
      ...state,
      ...action
    } as FormReducer
  }, {
    requested: false,
    phone: '',
    otp: ''
  })

  useEffect(() => {
    recaptchaVerifier.current = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
    }, auth);

    return () => {
      recaptchaVerifier.current
    }
  }, [auth])

  async function login() {
    if (!recaptchaVerifier.current) {
      return
    }

    confirmationResult.current = await signInWithPhoneNumber(auth, state.phone, recaptchaVerifier.current)
    dispatch({
      requested: true
    })
  }

  async function confirm() {
    if (!confirmationResult.current) {
      return
    }

    await confirmationResult.current.confirm(state.otp)
    router.push('/')
  }

  function bind(key: string) {
    return function (e: ChangeEvent<HTMLInputElement>) {
      dispatch({
        [key]: e.currentTarget.value
      })
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Login</h1>

      <div>
        <div className="form-control w-full mt-3">
          <label className="label">
            <span className="label-text">Phone</span>
          </label>
          <div className="flex items-center gap-3">
            <input className="flex-1 input input-bordered" placeholder="+6588888888" value={state.phone}
                   onChange={bind('phone')}/>
            <button onClick={login} id="sign-in-button" className="btn btn-sm btn-ghost">Request</button>
          </div>
        </div>

        <div className="form-control w-full mt-3">
          <label className="label">
            <span className="label-text">OTP</span>
          </label>
          <input disabled={!state.requested} value={state.otp} className="input input-bordered w-full"
                 onChange={bind('otp')}/>
        </div>

        <button disabled={!state.requested} onClick={confirm} className="btn btn-secondary w-full mt-6">
          Confirm number
        </button>
      </div>
    </div>
  )
}
