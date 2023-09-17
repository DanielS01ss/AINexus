import * as React from 'react';
import style from "./PreProcessingDialogInfo.css";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function PreProcessingDialogInfo(props) {
 
  
    return (
      <div>

        <h1>Algorithm</h1> 
        <hr></hr>
        <div className='pre-processing-dialog-info-description-section'>
          <p className='description-title'>Description</p>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <Button variant="contained" onClick={props.handleClose}>Go back</Button>
      </div>
    );
  }