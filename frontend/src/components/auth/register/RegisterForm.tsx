import { Box, Button, Grid, TextField } from '@mui/material';

import { EMAIL_REGEX, PHONE_NUMBER_REGEX } from '@/utils/validations';

interface FirstStepRegisterProps {
  submit: () => void;
  errors: any;
  register: any;
}

export default function FirstStepRegister({
  submit,
  errors,
  register,
}: FirstStepRegisterProps) {
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
            <TextField
              {...register("firstName", { required: 'required' })}
              label="First Name"
              variant="outlined"
              fullWidth
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
              {...register("lastName", { required: 'required' })}
              label="Last Name"
              variant="outlined"
              fullWidth
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
              {...register("email", { required: 'required', pattern: {
                value: EMAIL_REGEX,
                message: 'Invalid email address'
              } })}
              label="Email"
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
              {...register("password", { required: 'required' })}
              type='password'
              label="Password"
              variant="outlined"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
            />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register("phone", { required: 'required', pattern: {
              value: PHONE_NUMBER_REGEX,
              message: 'Invalid phone number'
            } })}
            label="Phone"
            variant="outlined"
            fullWidth
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' type="submit">Next</Button>
        </Grid>
      </Grid>
    </Box>
  );
}
