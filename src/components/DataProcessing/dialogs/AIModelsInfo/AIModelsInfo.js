import * as React from 'react';
import style from "../PreProcessingDialogInfo/PreProcessingDialogInfo.css";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEdges } from 'reactflow';


export default function AIModelsInfo(props) {
 

  React.useEffect(()=>{

    if(props.selectedModelId == 1){
      setModelInfo('ResNet is a deep convolutional neural network architecture designed to address the vanishing gradient problem in very deep networks. It introduces skip connections or residual connections, allowing information to flow directly through layers, making it easier to train extremely deep networks. ResNet is widely used in image recognition tasks.');
    } else if(props.selectedModelId == 2){
      setModelInfo('BERT is a pre-trained natural language processing model based on the Transformer architecture. It is trained on large corpora of text data and can understand context and relationships in language. BERT is commonly used for various NLP tasks, such as sentiment analysis, text classification, and question answering.');
    } else if (props.selectedModelId == 3){
      setModelInfo('Random Forest is an ensemble learning method that combines multiple decision trees to make predictions. It creates a collection of decision trees and aggregates their outputs to improve accuracy and reduce overfitting. Random Forest is used for both classification and regression tasks and is known for its robustness and versatility.');
    } else if (props.selectedModelId == 4){
        setModelInfo('SVM is a supervised machine learning algorithm used for classification and regression. It works by finding a hyperplane that best separates data into different classes or predicts a continuous target variable. SVM is effective for high-dimensional data and can handle linear and non-linear relationships through kernel functions.');
      }
  },[])

  const [modelInfo, setModelInfo] = React.useState('');

  
    return (
      <div>

        <h1>Model Info</h1> 
        <hr></hr>
        <div className='pre-processing-dialog-info-description-section'>
          <p className='description-title'>Description</p>
          <p>
            {modelInfo}
          </p>
        </div>
        <Button variant="contained" onClick={props.handleClose}>Go back</Button>
      </div>
    );
  }