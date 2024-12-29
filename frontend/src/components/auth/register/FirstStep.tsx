import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import type { IRegisterRequest } from '@/services/auth/register-request'

interface FirstStepRegisterProps {
  submit: () => void;
  userInfo: IRegisterRequest;
  updateUserInfo: ({ key, value }: { key: string; value: string }) => void;
}

export default function FirstStepRegister({
  userInfo,
  submit,
  updateUserInfo,
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
            value={userInfo.firstName}
            onChange={(e) => updateUserInfo({ key: 'firstName', value: e.target.value })}
            label="First Name"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={userInfo.lastName}
            onChange={(e) => updateUserInfo({ key: 'lastName', value: e.target.value })}
            label="Last Name"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={userInfo.email}
            onChange={(e) => updateUserInfo({ key: 'email', value: e.target.value })}
            label="Email"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={userInfo.password}
            onChange={(e) => updateUserInfo({ key: 'password', value: e.target.value })}
            label="Password"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={userInfo.phone}
            onChange={(e) => updateUserInfo({ key: 'phone', value: e.target.value })}
            label="Phone"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
      <Button type="submit">Next</Button>
    </Box>
  );
}
