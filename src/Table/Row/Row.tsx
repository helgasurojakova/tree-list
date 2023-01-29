import { RowType } from './Row.types'
import './Row.style.sass'
import React, { useState } from 'react'
import { rowsApi } from '../Table.sevice'
import { entity } from '../Table'

export const Row = (props:RowType) => {
  const {
    row: {
      id,
      rowName,
      salary,
      equipmentCosts,
      overheads,
      estimatedProfit,
      child,
    },
    level,
    parentId,
  } = props

  const [isEditable, setIsEditable] = useState(false)
  const [children, setChildren] = useState(child)
  const [isDeleted, setIsDeleted] = useState(false)

  const [state, setState] = useState({
    rowName,
    salary,
    equipmentCosts,
    overheads,
    estimatedProfit,
    child,
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>, key: string) {
    setState((v) => ({...v, [key]: event.target.value}))
  }

  function handleEdit() {
    setIsEditable((prevState) => !prevState)
  }

  function handleKeyDownUpdate(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
        rowsApi.updateRow(
          entity.id, 
          id, 
          state.equipmentCosts, 
          state.estimatedProfit, 
          state.overheads, 
          state.rowName, 
          state.salary)
        setIsEditable(false)
    }
  }

  // Creating a new row

  const [createMode, setCreateMode] = useState(false)

  const [newRowState, setNewRowState] = useState({
    rowName: '',
    salary: 0,
    equipmentCosts: 0,
    overheads: 0,
    estimatedProfit: 0,
  })

  function handleChangeNewRow(event: React.ChangeEvent<HTMLInputElement>, key: string) {
    setNewRowState((v) => ({...v, [key]: event.target.value}))
  }

  function handleCreateRow() {
    if (!isEditable) {
      setCreateMode((prevState) => !prevState)
    }
  }

  function handleKeyDownCreate(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
        rowsApi.createRow(
          entity.id, 
          newRowState.equipmentCosts, 
          newRowState.estimatedProfit, 
          newRowState.overheads, 
          newRowState.rowName, 
          newRowState.salary,
          id,
          ).then((data) => {
            setChildren(children ? [...children, data.current] : [data.current])
          })
        setCreateMode(false)
    }
  }

  // Deleting a row

  function handleKeyDownDelete() {
    rowsApi.deleteRow(entity.id, id).then(() => setIsDeleted(true))
  }

  return (
    <>
      {!isDeleted && 
      <div className="row" onDoubleClick={handleEdit}>
        <div className={`row-icons-wrapper level-${level}`}>
          {!isEditable && <div className="row-buttons">
            <button className="row-button-add" onClick={handleCreateRow}></button>
            {!createMode && <button className="row-button-delete" onClick={handleKeyDownDelete}></button>}
          </div>}
        </div>
        <div className="row-inputs__left-part">
          <div className="row-input-wrapper">
            <input 
              className={`row-input${isEditable ? ' row-input-active' : ''}`} 
              value={state.rowName}
              onChange={(event) => handleChange(event, 'rowName')}
              readOnly={!isEditable}
              onKeyDown={handleKeyDownUpdate}
            />
          </div>
        </div>
        <div className="row-inputs__right-part">
          <div className="row-input-wrapper">
            <input 
              className={`row-input${isEditable ? ' row-input-active' : ''}`} 
              value={state.salary}
              onChange={(event) => handleChange(event, 'salary')}
              readOnly={!isEditable}
              type="number"
              onKeyDown={handleKeyDownUpdate}
            />
          </div>
          <div className="row-input-wrapper">
            <input 
              className={`row-input${isEditable ? ' row-input-active' : ''}`} 
              value={state.equipmentCosts}
              onChange={(event) => handleChange(event, 'equipmentCosts')}
              readOnly={!isEditable}
              type="number"
              onKeyDown={handleKeyDownUpdate}
            />
          </div>
          <div className="row-input-wrapper">
            <input 
              className={`row-input${isEditable ? ' row-input-active' : ''}`} 
              value={state.overheads}
              onChange={(event) => handleChange(event, 'overheads')}
              readOnly={!isEditable}
              type="number"
              onKeyDown={handleKeyDownUpdate}
            />
          </div>
          <div className="row-input-wrapper">
            <input 
              className={`row-input${isEditable ? ' row-input-active' : ''}`} 
              value={state.estimatedProfit}
              onChange={(event) => handleChange(event, 'estimatedProfit')}
              readOnly={!isEditable}
              type="number"
              onKeyDown={handleKeyDownUpdate}
            />
          </div>
        </div>
      </div>
      }
      {children && children.map((el) => {return (<Row row={el} parentId={id} key={el.id} level={level + 1}/>)})}
      {createMode && 
      <div className="row" onDoubleClick={handleEdit}>
      <div className="row-icons-wrapper">
      </div>
      <div className="row-inputs__left-part">
        <div className="row-input-wrapper">
          <input 
            className="row-input row-input-active"
            value={newRowState.rowName}
            onChange={(event) => handleChangeNewRow(event, 'rowName')}
            onKeyDown={handleKeyDownCreate}
          />
        </div>
      </div>
      <div className="row-inputs__right-part">
        <div className="row-input-wrapper">
          <input 
            className="row-input row-input-active"
            value={newRowState.salary}
            onChange={(event) => handleChangeNewRow(event, 'salary')}
            type="number"
            onKeyDown={handleKeyDownCreate}
          />
        </div>
        <div className="row-input-wrapper">
          <input 
            className="row-input row-input-active"
            value={newRowState.equipmentCosts}
            onChange={(event) => handleChangeNewRow(event, 'equipmentCosts')}
            type="number"
            onKeyDown={handleKeyDownCreate}
          />
        </div>
        <div className="row-input-wrapper">
        <input 
          className="row-input row-input-active"
          value={newRowState.overheads}
          onChange={(event) => handleChangeNewRow(event, 'overheads')}
          type="number"
          onKeyDown={handleKeyDownCreate}
        />
        </div>
        <div className="row-input-wrapper">
          <input 
            className="row-input row-input-active"
            value={newRowState.estimatedProfit}
            onChange={(event) => handleChangeNewRow(event, 'estimatedProfit')}
            type="number"
            onKeyDown={handleKeyDownCreate}
          />
        </div>
      </div>
      </div>
      }
    </>
  )
}

