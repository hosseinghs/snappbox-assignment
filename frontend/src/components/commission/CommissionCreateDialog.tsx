import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
    Box,
    Grid,
    Button,
    Dialog,
    TextField,
    DialogTitle,
    DialogActions,
    DialogContent,
    useMediaQuery,
    CircularProgress,
    DialogContentText,
 } from "@mui/material"
import { createComissionAPI } from '@/services/comissions'
import type { ICommission } from '@/services/comissions/type';

export default function CommissionCreateDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { reset, register, handleSubmit, formState: { errors } } = useForm<ICommission>()
  
  const onSubmit: SubmitHandler<ICommission> = (data) => createCommission(data)


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset()
  };
  
  const createCommission = async (data: ICommission) => {
    try {
      setLoading(true)
      await createComissionAPI(data)
      handleClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button className='w-44 mb-4' variant="outlined" onClick={handleClickOpen}>
        New Commission
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
      >
        <DialogTitle id="responsive-dialog-title">
          New Commission
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '50ch' } }}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit);
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                label="name"
                variant="outlined"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                {...register("name", { required: 'required' })}
              />
          </Grid>
          <Grid item xs={12}>
              <TextField
                label="commission_normal"
                variant="outlined"
                fullWidth
                type="text"
                error={!!errors.commission_normal}
                helperText={errors.commission_normal?.message}
                {...register("commission_normal", { required: 'required' })}
              />
          </Grid>
          <Grid item xs={12}>
              <TextField
                label="commission_normal_new"
                variant="outlined"
                fullWidth
                type="text"
                error={!!errors.commission_normal_new}
                helperText={errors.commission_normal_new?.message}
                {...register("commission_normal_new", { required: 'required' })}
              />
          </Grid>
          <Grid item xs={12}>
              <TextField
                label="commission_promotion"
                variant="outlined"
                fullWidth
                type="text"
                error={!!errors.commission_promotion}
                helperText={errors.commission_promotion?.message}
                {...register("commission_promotion", { required: 'required' })}
              />
          </Grid>
          <Grid item xs={12}>
              <TextField
                label="commission_promotion_new"
                variant="outlined"
                fullWidth
                type="text"
                error={!!errors.commission_promotion_new}
                helperText={errors.commission_promotion_new?.message}
                {...register("commission_promotion_new", { required: 'required' })}
              />
          </Grid>
        </Grid>
      </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions className='px-4 mb-4'>
          <Button variant='outlined' color='error' autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='contained'  onClick={handleSubmit(onSubmit)} autoFocus>
            {loading ? <CircularProgress size="25px" /> : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}