'use client'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { CircularProgress } from '@mui/material';

import { useState } from 'react';
import { loginAPI } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { setAccessToken } from '@/cookie';
import { useForm, SubmitHandler } from "react-hook-form"

interface IForm {
    email: string
    password: string
}

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<IForm>()
  
    const onSubmit: SubmitHandler<IForm> = (data) => login(data)
   
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)

    async function login(payload: IForm) {
        try {
            setLoading(true)
            const { data } = await loginAPI(payload)
            setAccessToken(data.access_token)
            router.push('/dashboard/commission')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit);
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div>
              <TextField
                label="email"
                variant="outlined"
                fullWidth
                {...register("email", { required: 'required' })}
              />
              <p>{ errors.email?.message }</p>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div>
              <TextField
                label="password"
                variant="outlined"
                fullWidth
                type="password"
                {...register("password", { required: 'required' })}
              />
              <p>{ errors.password?.message }</p>
            </div>
          </Grid>
        </Grid>
        <Button type="submit" onClick={handleSubmit(onSubmit)}>
          {loading ? <CircularProgress /> : 'Login'}
        </Button>
      </Box>
    )
}