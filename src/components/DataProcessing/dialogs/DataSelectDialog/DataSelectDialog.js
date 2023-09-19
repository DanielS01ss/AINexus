import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import style from "./DataSelectDialog.css";
import DataSetInfo from './DataSetInfo';
import axios from 'axios';

export default function DataSelectDialog(props) {
  

  const [checked, setChecked] = React.useState([1]);
  const [dataSetSearch,setDatasetSearch] = React.useState(true);
  const [fetchedData, setFetchedData] = React.useState([]);
  const [isDataLoading, setIsDataLoading] = React.useState(true);
  const [datasetIdSelected, setDatasetIdSelected] = React.useState();
  const [selectedDataSetName, setSelectedDatasetName] = React.useState('');

  const fetchAllData = () => {
    axios.get('http://localhost:8089/api/dataset/all-datasets').then((resp)=>{
      setFetchedData(resp.data);
      setIsDataLoading(false);
      
    }).catch((err)=>{
      setIsDataLoading(false);
    });
    
  }


  React.useEffect(()=>{
    if(datasetIdSelected){
      handleDisplayDataSetInfo();
    }
  },[datasetIdSelected])

  React.useEffect(()=>{
    fetchAllData();
  },[])

  const handleDisplayDataSetInfo = (infoId) =>{
    setDatasetSearch(!dataSetSearch);
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


  return (
    
    <div>

    <ThemeProvider theme={darkTheme}>
      <Dialog open={props.open} onClose={props.handleClose} sx={{textAlign:"center", backgroundColor:""}} maxWidth="600" fullWidth="true" >

           <DialogTitle> Datasets </DialogTitle>
            <DialogContent>   

      {isDataLoading &&
        <div>
            <div className="spinner"></div>
            <p className='loading-text'>Loading...</p>
          </div> 
      }
          
            
             {
                (dataSetSearch && !isDataLoading) &&
                <Paper
                  component="form"
                  sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%" }}
                >
                  <IconButton sx={{ p: '10px' }} aria-label="menu">
                    <MenuIcon />
                  </IconButton>
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Dataset"
                    inputProps={{ 'aria-label': 'search google maps' }}
                  />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                  <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                  </IconButton> 
                </Paper>
              
              } 
              {
                (dataSetSearch && !isDataLoading) &&
                   <List dense sx={{ width: '100%', bgcolor: 'background.paper', marginTop:"10px" }}>
                      <ListItem
                        key={'first'}
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
                          
                          <ListItemText  id={'unique'}  disableTypography
                          primary={<Typography variant="body2" style={{ color: '#FFFFFF',fontSize:"1.3rem" }}>DataSet Name</Typography>} />
                        </ListItemButton>
                      </ListItem>
                   {fetchedData.map((value,index) => {
                     const labelId = `checkbox-list-secondary-label-${value}`;
                    
                     
                      return (
                        <ListItem
                          key={index}
                          secondaryAction={
                            <div className='dataset-select-toolbox'>
                              <Checkbox
                                edge="end"
                                onChange={handleToggle(value)}
                                checked={checked.indexOf(value) !== -1}
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                              <Button variant="outlined" onClick={()=>{ setDatasetIdSelected(value.id); setSelectedDatasetName(value.dataset_name); }}>Info</Button>
                            </div>
                          }
                          disablePadding
                        > 
                          <ListItemButton>
                            <ListItemAvatar>
                              <p className='select-dialog-list'><FontAwesomeIcon icon={faDatabase}/></p> 
                            </ListItemAvatar>
                            <ListItemText  id={labelId}  disableTypography
                            primary={<Typography variant="body2" style={{ color: '#FFFFFF',fontSize:"1.3rem" }}>{value.dataset_name}</Typography>} />
                          </ListItemButton>
                        </ListItem>
                      );
                     
                    
                   })}
                 </List>
              }

              {
                !dataSetSearch &&
                <DataSetInfo handleDisplayDataSetInfo={handleDisplayDataSetInfo} selectedDataSetName={selectedDataSetName} datasetId={datasetIdSelected}/>
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
