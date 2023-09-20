import React,{useState,useEffect} from "react";
import styles from "./DataSetInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from "@mui/material";
import axios from 'axios';

export default function DataSetInfo (props){


  function capitalizeFirstLetter(str) {

    if (!str) {
      return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


    const [isDataLoading, setIsDataLoading] = useState(true);
    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
        {
          id: 'population',
          label: 'Population',
          minWidth: 170,
          align: 'right',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'size',
          label: 'Size\u00a0(km\u00b2)',
          minWidth: 170,
          align: 'right',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'density',
          label: 'Density',
          minWidth: 170,
          align: 'right',
          format: (value) => value.toFixed(2),
        },
      ];

      const [tableColumns, setTableColumns] = useState([]);
      const [response, setResponse] = useState({});
      const [datasetInfo, setDatasetInfo] = useState({});
      
      useEffect(()=>{
        if(response.data){
          parseAndSetRows(response.data);
        }
        
        
      },[tableColumns])

      const parseAndSetColumns = (data)=>{
          const oneObject = Object.keys(data[0]);
          const result = [];
          for(let objKey of oneObject){
            objKey = capitalizeFirstLetter(objKey);
              const oneObj = {
                id:objKey,
                label:objKey,
                minWidth:130,
                align:'right',
                format:(value) => value
              }
              result.push(oneObj);
          }
          setTableColumns(result);
          
      }

      const [rows, setRows] = useState([]);

   

      const parseAndSetRows = (data)=>{
        
        const array_res = [];
        for(let elem of data ){
          
          const result = Object.values(elem);
          const obj = {};
          const newObj = tableColumns.map((column,i)=>{
            
            obj[column.id] = result[i];
            return {};
          })
          
          array_res.push(obj);
        }
        
        setRows(array_res);
      }


      const fetchedDataForDataSet = ()=>{

        axios.get(`http://localhost:8089/api/dataset/dataset-info?id=${props.datasetId}`).then((resp)=>{
          setDatasetInfo(resp.data);
          setIsDataLoading(false);
        }).catch((err)=>{
          console.log(err);
          setIsDataLoading(false);
        });

        axios.get(`http://localhost:8089/api/dataset/fetch-snippet?id=${props.datasetId}`).then((resp)=>{
          setResponse(resp);
          parseAndSetColumns(resp.data);
          setIsDataLoading(false);
         
        }).catch((err)=>{
          console.log(err);
          setIsDataLoading(false);
        })
      }

      useEffect(()=>{
        fetchedDataForDataSet();
      },[]);

      function createData(
        name,
        code,
        population,
        size
      ) {
        const density = population / size;
        return { name, code, population, size, density };
      }
    

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
      

    return(
        <div>
            <p className="back-btn" onClick={()=>{props.handleDisplayDataSetInfo();}}><FontAwesomeIcon icon={faAnglesLeft}/></p>
            <h1>{props.selectedDataSetName} </h1>
            {isDataLoading && <div>
            <div className="spinner"></div>
            <p className='loading-text'>Loading...</p>
          </div> }
            { !isDataLoading && <div className="data-set-info-section">
                <p className="about-dataset-text">About Dataset</p>
                <p> &nbsp; &nbsp;  {datasetInfo.about}</p>
                <p className="about-dataset-text">Authors</p>
                {datasetInfo.authors && datasetInfo.authors.map((vl)=><div>{vl}</div>)}                
                <p className="about-dataset-text">Keywords</p>
                <div className="keywords-container">
                {datasetInfo.keywords && datasetInfo.keywords.map((vl)=><div className="keywords-bubble">{vl}</div>)} 
                </div>
                <Paper sx={{ width: '100%',marginTop:"30px", overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 940 }}>
                        <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                            {tableColumns.map((column) => (
                                <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                                >
                                {column.label}
                                </TableCell>
                            ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {tableColumns.map((column,i) => {
                                    const value = row[column.id];
                                   
                                    return (
                                        <TableCell key={i} align={column.align}>
                                        {column.format && typeof value === 'number'
                                            ? column.format(value)
                                            : value}
                                        </TableCell>
                                    );
                                    })}
                                </TableRow>
                                );
                            })}
                        </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                 </Paper>
                 <div className="dataset-info-toolbox">
                    <Button variant="contained" sx={{marginTop:"40px"}}>Select this dataset</Button>
                    <Button variant="contained" sx={{marginTop:"40px"}}>Donwload CSV</Button>
                 </div>
            </div>
                }
        </div>
    );

}