import React, { useCallback,useState, useMemo } from 'react';
import ReactFlow, { MiniMap,Background, Controls, useNodesState, useEdgesState, addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import Dataset from './custom_nodes/Dataset';
import 'reactflow/dist/style.css';
import FeatureSelection from './custom_nodes/FeatureSelection';
import Normalization from './custom_nodes/Normalization';
import DataImputation from './custom_nodes/DataImputation';
import ModelTraining from './custom_nodes/ModelTraining';

function Flow() {
  const nodeTypes = useMemo(() => ({ dataSet: Dataset , featureSelection:FeatureSelection, normalization:Normalization, dataImputation:DataImputation, modelTraining:ModelTraining}), []);



  const initialNodes = [
    {
      id: 'node-1',
      type: 'featureSelection',
      data: { label: 'Feature Selection' },
      position: { x: 250, y: 5 },
    },
    {
        id: 'node-2',
        type: 'dataSet',
        data: { label: 'Dataset' },
        position: { x: 450, y: 25 },
    },
    {
      id: 'node-3',
      type: 'normalization',
      data: { label: 'Normalization' },
      position: { x: 750, y: 45 },
    },
    {
      id: 'node-4',
      type: 'dataImputation',
      data: { label: 'Data Imputation' },
      position: { x: 950, y: 195 },
    },
    {
      id: 'node-5',
      type: 'modelTraining',
      data: { label: 'Model Training' },
      position: { x: 1550, y: 500 },
    }

  ];
  const initialEdges = [  {
    id: 'e1-3',
    source: 'node-1',
    target: 'node-2',
    label: 'This edge can only be updated from source',
    updatable: 'source',
  }];

  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);
  const [variant, setVariant] = useState('cross');
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#fff' } }, eds)),
    []
  );
  const reactFlowStyle = {
    background: '#171923',
    width: '100%',
    height: 300,
  };

  const nodeColor = (node) => {
    switch (node.type) {
      case 'featureSelection':
        return '#f56b02';
      case 'dataSet':
        return '#edf502';
      case  'normalization':
        return '#06dca7'    
      case  'normalization':
        return '#06dca7'
      case 'dataImputation':
        return '#f50c0c'
      default:
          return '#c9c7c7'
    }
  };

    return (
      <div style={{ width: '96vw', height: '100vh' }}>
        <ReactFlow 
          style={reactFlowStyle}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
        >
          <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable style={{
            border: "1px solid black"
          }}
          maskColor="rgb(0,0,0, 0.1)" />

          
          <Background variant='dots' color="#fff" />
          <Controls />
          
        </ReactFlow>
      </div>
    );
  }
  
  export default Flow;