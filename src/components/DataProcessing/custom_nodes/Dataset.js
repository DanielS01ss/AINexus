import React, { memo ,useCallback} from 'react';
import { Handle, Position } from 'reactflow';
import styles from "./Dataset.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';

export default memo(({ data, isConnectable }) => {

  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);


  return (
    <div style={{  borderRadius:"5%",padding:"10px" , border:"1px solid yellow" }}>
      <div>
        <div className='dataset-node-header'>
            <FontAwesomeIcon icon={faFile} /> Dataset
        </div>
        <div className='dataset-node-separator'>

        </div>
        <div className='dataset-node-info-section'>
            <h3> <FontAwesomeIcon icon={faCircleQuestion}/> Info</h3>
            <hr/>
            <div className='dataset-node-info-section-container'>
                    <p><strong>Name:</strong><span>Heart Data csv</span></p>
                    <p><strong>Size:</strong><span>138kb</span></p>
                    <p><strong>Publication Date:</strong><span>7/08/2002</span></p>
            </div>
            <hr/>
            <div className='dataset-node-bottom-toolbox'>
                <button className='dataset-toolbox-btn'>More about dataset <FontAwesomeIcon icon={faArrowUpRightFromSquare}/></button>
                <button className='change-dataset-btn dataset-toolbox-btn'>Change Dataset <FontAwesomeIcon icon={faRightLeft}/> </button>
            </div>
        </div>
        <div className='dataset-node-bottom'>

        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="c"
        style={{padding:"10px",border:"3px solid yellow"}}
        isConnectable={isConnectable}
      />
     
    </div>
  );
});
