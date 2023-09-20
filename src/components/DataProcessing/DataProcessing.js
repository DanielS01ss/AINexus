import React, { useEffect,useRef } from "react";
import Flow from "./Flow";
import styles from './DataProcessing.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay,faCircleStop } from '@fortawesome/free-solid-svg-icons';
import LeftMenu from "./LeftMenu";

function DataProcessing() {

  const circles = document.querySelectorAll(".circle"),
  progressBar = document.querySelector(".indicator");
  const [selectedData, setSelectedData] = React.useState({});
  const [selectedPreProcessingAlgo, setSelectedPreProcessingAlgo] = React.useState("");
  const [selectedMLAlgo, setSelectedMLAlgo] = React.useState("");
  const [isRunning, setIsRunning] = React.useState(false);
  const [firstStepActive, setFirstStepActive] = React.useState(false);
  const [secondStepActive, setSecondStepActive] = React.useState(false);
  const [thirdStepActive, setThirdStepActive] = React.useState(false);
  const [fourthStepActive, setFourthStepActive] = React.useState(false);
  const [fifthStepActive, setFifthStepActive] = React.useState(false);
  const [isDone, setIsDone] = React.useState(false);
  const barRef = useRef();
  

  let currentStep = 1;
  const updateSteps = () => {
    currentStep++;
    circles.forEach((circle, index) => {
      circle.classList[`${index < currentStep ? "add" : "remove"}`]("active");
    });
    
    progressBar.style.width = `${((currentStep - 1) / (circles.length - 1)) * 100}%`;
    
  };

  const generateRefs= ()=>{
    
  }

  const runAnimation = () =>{

      const loadingBar = barRef.current;
      if(loadingBar){
      setFirstStepActive(true);
      setTimeout(()=>{
        loadingBar.style.width = "30%";
        setSecondStepActive(true);
      },3000)
  
      setTimeout(()=>{
        loadingBar.style.width = "50%";
        setThirdStepActive(true);
      },4000)
  
      setTimeout(()=>{
        loadingBar.style.width = "70%";
        setFourthStepActive(true);
      },6000)
  
      setTimeout(()=>{
        loadingBar.style.width = "90%";
        setFifthStepActive(true);
        setIsDone(true);
        
      },8000)
      }
  }

  useEffect(()=>{
    setIsDone(false);
    runAnimation();
  },[isRunning]);

  const selectDialog = (selectDialogData)=>{
     setSelectedData({...selectDialogData});
  }
  const selectPreProcessing = (data) =>{
    setSelectedPreProcessingAlgo(data);
  }

  const selectMLAlgo = (data) =>{
    setSelectedMLAlgo(data);
  }
  
    return (
      <div style={{ height: '100%' }}>        
        <div className="flow-container">
            <div class="container">
              <div className="pipeline-controller">
               {!isRunning &&<p className="play-btn" onClick={()=>{setIsRunning(true)}}><FontAwesomeIcon icon={faCirclePlay} /></p> }
                {isRunning && <p className="play-btn" onClick={()=>{setIsRunning(false)}}><FontAwesomeIcon icon={faCircleStop} /></p> }
                {isRunning &&!isDone && <p>Running...</p> }
                {isDone && <p>✨🎉🎉Done!! 🎉🎉✨</p>}
              </div>
              
              {
                isRunning && 
                <div className="steps">
                    <span className={"circle " +(firstStepActive? "active":"")} > 1 </span>
                    <span className={"circle " +(secondStepActive? "active":"")} > 2 </span>
                    <span className={"circle " +(thirdStepActive? "active":"")} > 3 </span>
                    <span className={"circle " +(fourthStepActive? "active":"")} > 4 </span>
                    <span className={"circle " +(fifthStepActive? "active":"")} > 5 </span>
                <div className="progress-bar">
                  <span className="indicator" ref={barRef} style={{width:"0%",marginLeft:"-200px"}}></span>
                </div>
              </div>
              }
              
            </div>
             <LeftMenu selectMLAlgo={selectMLAlgo} selectDialog={selectDialog} selectedPreProcessing={selectPreProcessing} />
             <Flow selectedMLAlgo={selectedMLAlgo} selectedPreProcessingAlgo={selectedPreProcessingAlgo} selectedData={selectedData}/> 
        </div>
      </div>
    );
  }
  
  export default DataProcessing;