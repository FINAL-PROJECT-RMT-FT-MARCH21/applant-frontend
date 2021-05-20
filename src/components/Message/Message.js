import React from 'react'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

export default function CustomizedSnackbars(props) {
  const classes = useStyles();
  const [open, setOpen, msg] = React.useState(false)

  const handleClick = () => {
    // props.addMsg('message example')
    setOpen(true)
  }
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }
  
  const closeMessage = (funct)=>{
    props.cleanMsg()
    funct()
  }

  const openMessage = ()=> {
    console.log('opening message', props.message)
    setOpen(true)
    closeMessage((event, reason) => {
      if (reason === 'clickaway') {
        return
      }
        setOpen(false)
    })
    // handleClick()
    // msg(true)
    // handleClick()
  }
  
  return (
    <div className={classes.root}>
      {console.log('rendering msg', props.message)}
      {props.message ? openMessage() : null}
      <Button variant="outlined" onClick={handleClick}>
        Open
      </Button>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  )
}
