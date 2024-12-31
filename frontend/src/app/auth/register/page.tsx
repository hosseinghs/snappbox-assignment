'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation'

import FirstStepRegister from "@/components/auth/register/RegisterForm";
import SecondStepRegister from "@/components/auth/register/VerifyOTP";
import { sendUserInfoAPI, resendOTPCodeAPI, verifyOTPCodeAPI } from '@/services/auth'
import { useForm, SubmitHandler } from "react-hook-form"
import type { IRegisterRequest } from '@/services/auth/register-request'

enum RegisterSteps {
  REGISTER = 1,
  VERIFY_OTP = 2,
  RESULT = 3,
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterRequest>()

  const onSubmit: SubmitHandler<IRegisterRequest> = () => setStateToVerifyOTP()

  const router = useRouter()

  const [state, setRegisterStep] = useState<RegisterSteps>(RegisterSteps.REGISTER);
  const [loading, setLoading] = useState<boolean>(false);
  const [verifyCode, setVerifyCode] = useState<string | null>(null);
  const [registerResult, setRegisterResult] = useState<boolean>(false);

  const setStateToVerifyOTP = async () => {
    try {
      setLoading(true)
      const { data } = await sendUserInfoAPI(userInfo)
      setVerifyCode(data.verify_code)
      setRegisterStep(RegisterSteps.VERIFY_OTP)
    } catch(e) {
      console.log(e);
    } finally {
      setLoading(false)
    }
  };

  const handleResendOTP = async () => {
    try {
      setLoading(true)

      if (!verifyCode) return

      const payload = {
        email: userInfo.email,
        verify_code: verifyCode
      }
      const { data } = await resendOTPCodeAPI(payload)
      setVerifyCode(data)
    } catch(e) {
      throw new Error(e)
    } finally {
      setLoading(false)
    } 
  }

  const handleOTPVerification = async () => {
    try {
      setLoading(true)
      if (!verifyCode) return
      const payload = {
        email: userInfo.email,
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

  const renderRegisterResult = () => registerResult ? <div>u r about to be redirected to login page :)</div> : <div>try again :(</div> 

  return (
    <div style={ { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' } }>
      {state === RegisterSteps.REGISTER && (
        <FirstStepRegister
          submit={handleSubmit(onSubmit)}
          errors={errors}
          register={register}
        />
      )}
      {state === RegisterSteps.VERIFY_OTP && <SecondStepRegister onCompleteOTP={() => handleOTPVerification()} resendOTP={() => handleResendOTP()} />}
      {state === RegisterSteps.RESULT && renderRegisterResult()}
    </div>
  );
}
