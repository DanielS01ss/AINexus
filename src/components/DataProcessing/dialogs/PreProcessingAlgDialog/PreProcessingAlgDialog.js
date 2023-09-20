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

    const restorePreferences = ()=>{
      const storedPref = localStorage.getItem('preProcessing');
      if(storedPref == 1){
        setFirstCheckBox(true);
        setSecondCheckBox(false);
        setThirdCheckBox(false);
      } else  if(storedPref == 2){
        setFirstCheckBox(false);
        setSecondCheckBox(true);
        setThirdCheckBox(false);
      } else  if(storedPref == 3){
        setFirstCheckBox(false);
        setSecondCheckBox(false);
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
  
    const handleToggle = (value) => () => {
      if(value == 1){
        localStorage.setItem('preProcessing',1);
        setFirstCheckBox(true);
        setSecondCheckBox(false);
        setThirdCheckBox(false);
      } else if(value == 2){
        localStorage.setItem('preProcessing',2);
        setFirstCheckBox(false);
        setSecondCheckBox(true);
        setThirdCheckBox(false);
      } else if(value == 3) {
        localStorage.setItem('preProcessing',3);
        setFirstCheckBox(false);
        setSecondCheckBox(false);
        setThirdCheckBox(true);
      }
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
              <Button onClick={props.handleClose}>Apply</Button>
            </DialogActions>
          
      </Dialog>
    
      </ThemeProvider>
    </div>
    );
}