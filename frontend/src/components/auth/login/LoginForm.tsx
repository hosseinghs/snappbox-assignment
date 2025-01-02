'use client'
import { Box, Button, Grid, CircularProgress, TextField } from '@mui/material';

import { useForm, SubmitHandler } from "react-hook-form"

import { EMAIL_REGEX } from '@/utils/validations';
import type { ILoginForm } from '@/services/auth/register-request'

interface Iprops {
  loading: boolean;
  submit: (payload: ILoginForm) => void
}

export default function LoginForm({ submit, loading }: Iprops) {
    const { register, handleSubmit, formState: { errors } } = useForm<ILoginForm>()
  
    const onSubmit: SubmitHandler<ILoginForm> = (data) => submit(data)

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