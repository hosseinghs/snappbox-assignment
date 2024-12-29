'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation'

import FirstStepRegister from "@/components/auth/register/FirstStep";
import SecondStepRegister from "@/components/auth/register/SecondStep";
import { sendUserInfoAPI, resendOTPCodeAPI, verifyOTPCodeAPI } from '@/services/auth'

enum RegisterSteps {
  REGISTER = 1,
  VERIFY_OTP = 2,
  RESULT = 3,
}

export default function Register() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState({
    phone: '',
    email: '',
    password: '',
    lastName: '',
    firstName: '',
  });

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

  const updateUserInfo = ({ key, value }: { key: string; value: string }) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [key]: value,
    }));
  };

  const renderRegisterResult = () => registerResult ? <div>u r about to be redirected to login page :)</div> : <div>try again :(</div> 

  return (
    <div style={ { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' } }>
      {state === RegisterSteps.REGISTER && (
        <FirstStepRegister
          submit={setStateToVerifyOTP}
          userInfo={userInfo}
          updateUserInfo={updateUserInfo}
        />
      )}
      {state === RegisterSteps.VERIFY_OTP && <SecondStepRegister onCompleteOTP={() => handleOTPVerification()} resendOTP={() => handleResendOTP()} />}
      {state === RegisterSteps.RESULT && renderRegisterResult()}
    </div>
  );
}
