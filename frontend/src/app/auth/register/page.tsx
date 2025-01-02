'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

import { useForm, SubmitHandler } from "react-hook-form"
import { sendUserInfoAPI, resendOTPCodeAPI, verifyOTPCodeAPI } from '@/services/auth'
import type { IRegisterRequest } from '@/services/auth/register-request'

const FirstStepRegister = dynamic(() => import('@/components/auth/register/RegisterForm')) 
const SecondStepRegister = dynamic(() => import('@/components/auth/register/VerifyOTP')) 
const LastStepRegister = dynamic(() => import('@/components/auth/register/RegisterResult')) 

enum RegisterSteps {
  REGISTER = 1,
  VERIFY_OTP = 2,
  RESULT = 3,
}

export default function Register() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterRequest>()

  const onSubmit: SubmitHandler<IRegisterRequest> = (data) => setStateToVerifyOTP(data)

  const router = useRouter()

  const [state, setRegisterStep] = useState<RegisterSteps>(RegisterSteps.REGISTER);
  const [loading, setLoading] = useState<boolean>(false);
  const [verifyCode, setVerifyCode] = useState<string | null>(null);
  const [registerResult, setRegisterResult] = useState<boolean>(false);

  const setStateToVerifyOTP = async (payload: IRegisterRequest) => {
    try {
      setLoading(true)
      const { data } = await sendUserInfoAPI(payload)
      setVerifyCode(data.verify_code)
      setRegisterStep(RegisterSteps.VERIFY_OTP)
    } finally {
      setLoading(false)
    }
  };

  const handleResendOTP = async () => {
    try {
      setLoading(true)
      if (!verifyCode) return

      const payload = {
        email: getValues('email'),
        verify_code: verifyCode
      }
      const { data } = await resendOTPCodeAPI(payload)
      setVerifyCode(data)
    } finally {
      setLoading(false)
    } 
  }

  const handleOTPVerification = async () => {
    try {
      setLoading(true)
      if (!verifyCode) return
      const payload = {
        email: getValues('email'),
        verify_code: verifyCode
      }
      const { data } = await verifyOTPCodeAPI(payload)
      setRegisterResult(data)
      setRegisterStep(RegisterSteps.RESULT)
      setTimeout(() => {
        router.push('/auth/login')
      }, 3000);
    } catch (_) {
      setRegisterResult(false)
    } 
    finally {
      setLoading(false)
    }
  }

  return (
    <div style={ { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' } }>
      {state === RegisterSteps.REGISTER && (
        <FirstStepRegister
          submit={handleSubmit(onSubmit)}
          errors={errors}
          loading={loading}
          register={register}
        />
      )}
      {state === RegisterSteps.VERIFY_OTP && <SecondStepRegister loading={loading} onCompleteOTP={() => handleOTPVerification()} resendOTP={() => handleResendOTP()} />}
      {state === RegisterSteps.RESULT && <LastStepRegister success={registerResult} />}
    </div>
  );
}
