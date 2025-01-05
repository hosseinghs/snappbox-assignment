import apiCaller from "@/axios";
import type { ILogin, IRegisterRequest, IVerifyRequest, ILoginResponse } from './type'

const BASE_SCOPE_URL = '/auth' as const

export const sendUserInfoAPI = async (payload: IRegisterRequest) => {
    return await apiCaller.post(`${BASE_SCOPE_URL}/register`, payload) 
} 

export const resendOTPCodeAPI = async (payload: IVerifyRequest) => {
    return await apiCaller.post(`${BASE_SCOPE_URL}/resend-code`, payload) 
} 

export const verifyOTPCodeAPI = async (payload: IVerifyRequest) => {
    return await apiCaller.post(`${BASE_SCOPE_URL}/verify`, payload) 
} 

export const loginAPI = async (payload: ILogin): Promise<{ data: ILoginResponse }> => {
    return await apiCaller.post(`${BASE_SCOPE_URL}/login`, payload) 
} 