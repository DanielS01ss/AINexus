import * as React from 'react';
import style from "./PreProcessingDialogInfo.css";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEdges } from 'reactflow';


export default function PreProcessingDialogInfo(props) {
 
  React.useEffect(()=>{
    if(props.algSelectedId == 1){
      setAlgInfo('Data feature engineering is the process of creating new features or modifying existing features in a dataset to improve the performance of machine learning models. It involves selecting, transforming, or combining raw data attributes to extract relevant information and make it more suitable for model training. Feature engineering aims to enhance the predictive power of the data by capturing patterns, reducing noise, and providing valuable input to machine learning algorithms');
    } else if(props.algSelectedId == 2){
      setAlgInfo('Normalization is a data preprocessing technique used to scale and standardize the numerical values in a dataset. It transforms the data into a common scale to prevent features with larger magnitudes from dominating the learning process in machine learning models. Common normalization techniques include Min-Max scaling, Z-score standardization, and robust scaling. Normalization ensures that different features have comparable influence on model training, leading to better convergence and performance');
    } else if (props.algSelectedId == 3){
      setAlgInfo('Data imputation is the process of filling in missing or incomplete data values in a dataset with estimated or predicted values. Missing data can be problematic for many machine learning algorithms, and imputation helps maintain data integrity. Various imputation methods exist, such as mean imputation, median imputation, k-nearest neighbors imputation, and regression imputation. The choice of imputation method depends on the nature of the data and the specific problem');
    }
  },[])

  const [algInfo, setAlgInfo] = React.useState('');

  
    return (
      <div>

        <h1>Algorithm</h1> 
        <hr></hr>
        <div className='pre-processing-dialog-info-description-section'>
          <p className='description-title'>Description</p>
          <p>
            {algInfo}
          </p>
        </div>
        <Button variant="contained" onClick={props.handleClose}>Go back</Button>
      </div>
    );
  }