'use client'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { loginAPI } from '@/services/auth/request';
import { setAccessToken } from '@/auth';

export default function LoginForm() {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const [payload, setPayload] = useState({
        email: '',
        password: ''
    })

    const onPayloadChange = (key: string, value: string) => {
        setPayload((pervPayload) => ({
            ...pervPayload,
            [key]: value,
          }));
    }

    const handleSubmit = async () => {
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
              handleSubmit();
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="email"
              variant="outlined"
              fullWidth
              onChange={(e) => onPayloadChange('email', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="password"
              variant="outlined"
              fullWidth
              value={payload.password}
              onChange={(e) => onPayloadChange('password', e.target.value)}
            />
          </Grid>
        </Grid>
        <Button loading={loading} type="submit">LOGIN</Button>
      </Box>
    )
}