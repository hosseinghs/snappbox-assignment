import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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
          <div>
            <TextField
              {...register("firstName", { required: 'required' })}
              label="First Name"
              variant="outlined"
              fullWidth
            />
            <p>{ errors.firstName?.message }</p>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div>
            <TextField
              {...register("lastName", { required: 'required' })}
              label="Last Name"
              variant="outlined"
              fullWidth
            />
            <p>{ errors.lastName?.message }</p>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div>
            <TextField
              {...register("email", { required: 'required' })}
              label="Email"
              variant="outlined"
              fullWidth
            />
            <p>{ errors.email?.message }</p>
            </div>
        </Grid>
        <Grid item xs={12}>
          <div>
            <TextField
              {...register("password", { required: 'required' })}
              type='password'
              label="Password"
              variant="outlined"
              fullWidth
            />
            <p>{ errors.password?.message }</p>

          </div>
        </Grid>
        <Grid item xs={12}>
         <div>
          <TextField
            {...register("phone", { required: 'required' })}
            label="Phone"
            variant="outlined"
            fullWidth
          />
            <p>{ errors.phone?.message }</p>
         </div>
        </Grid>
      </Grid>
      <Button type="submit">Next</Button>
    </Box>
  );
}
