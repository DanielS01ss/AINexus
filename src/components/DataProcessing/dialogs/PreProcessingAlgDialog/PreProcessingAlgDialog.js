import React, { useEffect } from "react";
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Typography } from '@mui/material';
import PreProcessingDialogInfo from "../PreProcessingDialogInfo/PreProcessingDialogInfo";
import { useEdges } from "reactflow";


export default function PreProcessingAlgDialog (props) {

    const [checked, setChecked] = React.useState([1]);
    const [dataSetSearch,setDatasetSearch] = React.useState(true);
    const [infoDialogOpen, setInfoDialogOpen] = React.useState()
    const [displayMoreInfo, setDisplayMoreInfo] = React.useState(false);
    const [algSelectedId, setAlgSelectedId] = React.useState(1);
    const [firstCheckBox,setFirstCheckBox] = React.useState(false);
    const [secondCheckBox,setSecondCheckBox] = React.useState(false);
    const [thirdCheckBox, setThirdCheckBox] = React.useState(false);
    const [preProcessingAlgo, setPreProcessingAlgo] = React.useState([]);


    const restorePreferences = ()=>{
      const storedPref = JSON.parse(localStorage.getItem('pre-processing-preferences'));
      if(storedPref == null){
        return;
      }
      setPreProcessingAlgo(storedPref);
      if(storedPref.includes("Data featuring")){
        setFirstCheckBox(true);
      }
       if(storedPref.includes("Normalization")){
        setSecondCheckBox(true);
      }
       if (storedPref.includes("Data Imputation")){
        setThirdCheckBox(true);
      }
    }

    

    useEffect(()=>{
      setAlgSelectedId();
      restorePreferences();
    },[])


    const handleDisplayDataSetInfo = () =>{
      setDatasetSearch(!dataSetSearch);
    }

    const handleDisplayAlgInfo = ()=>{
      setDisplayMoreInfo(false);
    }

    const updateProcessingAlgoArray = (arr)=>{
        return arr
    }
  
    const handleToggle = (value) => () => {
      let processingAlgoArray = preProcessingAlgo;
      
      if(value == 1){
        if(processingAlgoArray.includes("Data featuring")){
          processingAlgoArray = processingAlgoArray.filter(elem => elem !== "Data featuring");
        } else {
          processingAlgoArray.push("Data featuring");
        }
        setFirstCheckBox(!firstCheckBox);
      } else if(value == 2){
        if(processingAlgoArray.includes("Normalization")){
          processingAlgoArray = processingAlgoArray.filter(elem => elem !== "Normalization");
        } else {
          processingAlgoArray.push("Normalization");
        }
        setSecondCheckBox(!secondCheckBox);
      } else if(value == 3) {
        if(processingAlgoArray.includes("Data Imputation")){
          processingAlgoArray = processingAlgoArray.filter(elem => elem !== "Data Imputation");
        } else {
          processingAlgoArray.push("Data Imputation");
        }
        setThirdCheckBox(!thirdCheckBox);
      }
      localStorage.setItem("pre-processing-preferences",JSON.stringify(processingAlgoArray));
      setPreProcessingAlgo(processingAlgoArray);

    };
  
   
  
    const darkTheme = createTheme({
      palette: {
        mode: 'dark',
      },
    });
  
    const allAlgorithms = ['Procedure name','Data featuring','Normalization','Data Imputation']
   

    return(
        <div>

    <ThemeProvider theme={darkTheme}>
      <Dialog open={props.open} onClose={props.handleClose} sx={{textAlign:"center", backgroundColor:""}} maxWidth="600" fullWidth="true" >
           <DialogTitle> Pre-processing Algorithms </DialogTitle>
            <DialogContent>   
              {!displayMoreInfo && 
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
                  } else if (index == 1 ){
                   return (
                     <ListItem
                       key={value}
                       secondaryAction={
                         <div className='dataset-select-toolbox'>
                           <Checkbox
                             edge="end"
                             onChange={handleToggle(index)}
                             checked={firstCheckBox}
                             inputProps={{ 'aria-labelledby': labelId }}
                           />
                           <Button variant="outlined" onClick={()=>{setDisplayMoreInfo(true); setAlgSelectedId(1)}}>Info</Button>
                         </div>
                       }
                       disablePadding
                       sx={{
                        padding:"15px"
                       }}
                     >
                       <ListItemButton>
                         <ListItemAvatar>
                           <p className='select-dialog-list'><FontAwesomeIcon icon={faFilter}/></p> 
                         </ListItemAvatar>
                         <ListItemText  id={labelId}  disableTypography
                         primary={<Typography variant="body2" style={{ color: '#FFFFFF',fontSize:"1.3rem" }}>{value}</Typography>} />
                       </ListItemButton>
                     </ListItem>
                   );
                  } else if(index == 2){
                   return (
                     <ListItem
                       key={value}
                       secondaryAction={
                         <div className='dataset-select-toolbox'>
                           <Checkbox
                             edge="end"
                             onChange={handleToggle(index)}
                             checked={secondCheckBox}
                             inputProps={{ 'aria-labelledby': labelId }}
                           />
                           <Button variant="outlined" onClick={()=>{setDisplayMoreInfo(true); setAlgSelectedId(2)}}>Info</Button>
                         </div>
                       }
                       disablePadding
                       sx={{
                        padding:"15px"
                       }}
                     >
                       <ListItemButton>
                         <ListItemAvatar>
                           <p className='select-dialog-list'><FontAwesomeIcon icon={faSquareRootVariable}/></p> 
                         </ListItemAvatar>
                         <ListItemText  id={labelId}  disableTypography
                         primary={<Typography variant="body2" style={{ color: '#FFFFFF',fontSize:"1.3rem" }}>{value}</Typography>} />
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
                               onChange={handleToggle(index)}
                               checked={thirdCheckBox}
                               inputProps={{ 'aria-labelledby': labelId }}
                             />
                             <Button variant="outlined" onClick={()=>{setDisplayMoreInfo(true);  setAlgSelectedId(3)}}>Info</Button>
                           </div>
                         }
                         disablePadding
                         sx={{
                         padding:"15px"
                         }}
                       >
                         <ListItemButton>
                           <ListItemAvatar>
                             <p className='select-dialog-list'><FontAwesomeIcon icon={faDivide}/></p> 
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
              {
                displayMoreInfo &&
                <PreProcessingDialogInfo handleClose={handleDisplayAlgInfo} algSelectedId={algSelectedId}/>
              }
                 
            </DialogContent>
            <DialogActions>
              <Button onClick={props.handleClose}>Close</Button>
              <Button onClick={()=>{props.handleClose();  props.selectPreProcessingAlgo(preProcessingAlgo)}}>Apply</Button>
            </DialogActions>
          
      </Dialog>
    
      </ThemeProvider>
    </div>
    );
}