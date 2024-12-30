import apiCaller from "@/axios";
import type { ICommission } from './type'

const BASE_SCOPE_URL = '/commissions' as const

export const getAllCommissionsAPI = async (): Promise<{ data: ICommission[] }> => {
    return await apiCaller.get(BASE_SCOPE_URL) 
} 

export const createComissionAPI = async (payload) => {
    return await apiCaller.post(BASE_SCOPE_URL, payload) 
} 

export const updateComissionByIdAPI = async (payload) => {
    return await apiCaller.put(BASE_SCOPE_URL, payload) 
} 

export const deleteCommissionByIdAPI = async (id) => {
    return await apiCaller.delete(`${BASE_SCOPE_URL}/${id}`) 
} 