import React, { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import { faDivide, faFilter } from '@fortawesome/free-solid-svg-icons';
import { faSquareRootVariable } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Typography } from '@mui/material';
import AIModelsInfo from "../AIModelsInfo/AIModelsInfo";


export default function AIModels (props) {

    const [checked, setChecked] = React.useState([1]);
    const [dataSetSearch,setDatasetSearch] = React.useState(true);
    const [AIModelInfo, setAIModelInfo] = React.useState(false);
    const [AIModelId, setAIModelId] = useState(1);

    const handleDisplayDataSetInfo = () =>{
      setDatasetSearch(!dataSetSearch);
    }

    const handleClose = ()=>{  
        setAIModelInfo(false);
    }
  
    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };
  
   
  
    const darkTheme = createTheme({
      palette: {
        mode: 'dark',
      },
    });
  
    const allAlgorithms = ['Procedure name','ResNet (Residual Neural Network)','BERT (Bidirectional Encoder Representations from Transformers)','Random Forest','SVM (Support Vector Machine)']
   

    return(
        <div>

    <ThemeProvider theme={darkTheme}>
      <Dialog open={props.open} onClose={props.handleClose} sx={{textAlign:"center", backgroundColor:""}} maxWidth="600" fullWidth="true" >
           <DialogTitle> ML Models </DialogTitle>
          
           
            <DialogContent>   
              
            {!AIModelInfo && 
                   <List dense sx={{ width: '100%', bgcolor: 'background.paper', marginTop:"10px" }}>
                   {allAlgorithms.map((value,index) => {
                     const labelId = `checkbox-list-secondary-label-${value}`;
                     if(index == 0){
                          return(
                            <ListItem
                            key={value}
                            secondaryAction={
                              <div className='dataset-select-toolbox'>
                                <p>Select</p>
                                <p>More Info</p>
                              </div>
                            }
                            disablePadding
                            sx={{
                             padding:"15px",
                             pointerEvents:"none"
                            }}
                          >
                            <ListItemButton>
                              
                              <ListItemText  id={labelId}  disableTypography
                              primary={<Typography variant="body2" style={{ color: '#FFFFFF',fontSize:"1.3rem" }}>Procedure Name</Typography>} />
                            </ListItemButton>
                          </ListItem>
                          );
                     } else {
                      return (
                        <ListItem
                          key={value}
                          secondaryAction={
                            <div className='dataset-select-toolbox'>
                              <Checkbox
                                edge="end"
                                onChange={handleToggle(value)}
                                checked={checked.indexOf(value) !== -1}
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                              <Button variant="outlined" onClick={()=>{setAIModelInfo(true); setAIModelId(index)}}>Info</Button>
                            </div>
                          }
                          disablePadding
                          sx={{
                           padding:"15px"
                          }}
                        >
                          <ListItemButton>
                            <ListItemAvatar>
                              <p className='select-dialog-list'><FontAwesomeIcon icon={faChartLine}/></p> 
                            </ListItemAvatar>
                            <ListItemText  id={labelId}  disableTypography
                            primary={<Typography variant="body2" style={{ color: '#FFFFFF',fontSize:"1.3rem" }}>{value}</Typography>} />
                          </ListItemButton>
                        </ListItem>
                      );
                     } 
                   })}
                 </List>
             }
              { AIModelInfo && <AIModelsInfo handleClose={handleClose} selectedModelId = {AIModelId} />}
          
            </DialogContent>
             
            <DialogActions>
              <Button onClick={props.handleClose}>Close</Button>
              <Button onClick={props.handleClose}>Apply</Button>
            </DialogActions>

           
      </Dialog>
      </ThemeProvider>
    </div>
    );
}