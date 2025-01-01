'use client'
import { Box, Button, Grid, CircularProgress, TextField } from '@mui/material';

import { useState } from 'react';
import { loginAPI } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { setAccessToken } from '@/cookie';
import { useForm, SubmitHandler } from "react-hook-form"

import { EMAIL_REGEX } from '@/utils/validations';

interface IForm {
    email: string
    password: string
}

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<IForm>()
  
    const onSubmit: SubmitHandler<IForm> = (data) => login(data)
   
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    // todo: call login outside this component
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
              <TextField
                label="email"
                variant="outlined"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register("email", { required: 'required', pattern: {
                  value: EMAIL_REGEX,
                  message: 'invalid email'
                } })}
              />
          </Grid>
          <Grid item xs={12}>
              <TextField
                label="password"
                variant="outlined"
                fullWidth
                type="password"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register("password", { required: 'required' })}
              />
          </Grid>

          <Grid item xs={12}>
          <Button variant='contained' type="submit" onClick={handleSubmit(onSubmit)}>
            {loading ? <CircularProgress size="25px" /> : 'Login'}
          </Button>
        </Grid>
        </Grid>
        
      </Box>
    )
}