import { RowType } from './Row.types'
import './Row.style.sass'
import React, { useState } from 'react'
import { rowsApi } from '../Table.sevice'
import { entity } from '../Table'

export const Row = (props:RowType) => {
  const {
    id,
    rowName,
    salary,
    equipmentCosts,
    overheads,
    estimatedProfit,
  } = props

  const [isEditable, setIsEditable] = useState(false)

  const [rowNameValue, setRowName] = useState(rowName)
  const [salaryValue, setSalary] = useState(salary)
  const [equipmentCostsValue, setEquipmentCosts] = useState(equipmentCosts)
  const [overheadsValue, setOverheads] = useState(overheads)
  const [estimatedProfitValue, setEstimatedProfit] = useState(estimatedProfit)

  const handleEdit = () => {
    setIsEditable((prevState) => !prevState)
  }

  const handleChangeRowName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowName(event.target.value)
  }
  const handleChangeSalary = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSalary(parseInt(event.target.value))
  }
  const handleChangeEquipmentCosts = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEquipmentCosts(parseInt(event.target.value))
  }
  const handleChangeOverheads = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOverheads(parseInt(event.target.value))
  }
  const handleChangeEstimatedProfit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEstimatedProfit(parseInt(event.target.value))
  }

  const handleKeyDownUpdate= (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
        rowsApi.updateRow(
          entity.id, 
          id, 
          equipmentCostsValue, 
          estimatedProfitValue, 
          overheadsValue, 
          rowNameValue, 
          salaryValue)
        setIsEditable(false)
    }
  }

  // For creating new row
  const [createMode, setCreateMode] = useState(false)

  const [newRowName, setNewRowName] = useState('')
  const [newSalary, setNewSalary] = useState(0)
  const [newEquipmentCosts, setNewEquipmentCosts] = useState(0)
  const [newOverheads, setNewOverheads] = useState(0)
  const [newEstimatedProfit, setNewEstimatedProfit] = useState(0)

  const handleCreateRow = () => {
    setCreateMode((prevState) => !prevState)
  }

  const handleChangeNewRowName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewRowName(event.target.value)
  }
  const handleChangeNewSalary = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewSalary(parseInt(event.target.value))
  }
  const handleChangeNewEquipmentCosts = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEquipmentCosts(parseInt(event.target.value))
  }
  const handleChangeNewOverheads = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewOverheads(parseInt(event.target.value))
  }
  const handleChangeNewEstimatedProfit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEstimatedProfit(parseInt(event.target.value))
  }

  const handleKeyDownCreate= (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
        rowsApi.createRow(
          entity.id, 
          newEquipmentCosts, 
          newEstimatedProfit, 
          newOverheads, 
          newRowName, 
          newSalary,
          id,
          )
        setCreateMode(false)
    }
  }


  return (
    <>
      <div className="row" onDoubleClick={handleEdit}>
        <div className="row-icons-wrapper">
          <div className="row-icons">
            <span className="row-icons-add" onClick={handleCreateRow}></span>
            <span className="row-icons-delete"></span>
          </div>
        </div>
        <div className="row-inputs__left-part">
          <div className="row-input-wrapper">
            <input 
              className={`row-input${isEditable ? ' row-input-active' : ''}`} 
              value={rowNameValue}
              onChange={handleChangeRowName}
              readOnly={!isEditable}
              onKeyDown={handleKeyDownUpdate}
            />
          </div>
        </div>
        <div className="row-inputs__right-part">
          <div className="row-input-wrapper">
            <input 
              className={`row-input${isEditable ? ' row-input-active' : ''}`} 
              value={salaryValue}
              onChange={handleChangeSalary}
              readOnly={!isEditable}
              type="number"
              onKeyDown={handleKeyDownUpdate}
            />
          </div>
          <div className="row-input-wrapper">
            <input 
              className={`row-input${isEditable ? ' row-input-active' : ''}`} 
              value={equipmentCostsValue}
              onChange={handleChangeEquipmentCosts}
              readOnly={!isEditable}
              type="number"
              onKeyDown={handleKeyDownUpdate}
            />
          </div>
          <div className="row-input-wrapper">
            <input 
              className={`row-input${isEditable ? ' row-input-active' : ''}`} 
              value={overheadsValue}
              onChange={handleChangeOverheads}
              readOnly={!isEditable}
              type="number"
              onKeyDown={handleKeyDownUpdate}
            />
          </div>
          <div className="row-input-wrapper">
            <input 
              className={`row-input${isEditable ? ' row-input-active' : ''}`} 
              value={estimatedProfitValue}
              onChange={handleChangeEstimatedProfit}
              readOnly={!isEditable}
              type="number"
              onKeyDown={handleKeyDownUpdate}
            />
          </div>
        </div>
      </div>
      {createMode && 
      <div className="row" onDoubleClick={handleEdit}>
      <div className="row-icons-wrapper">
      </div>
      <div className="row-inputs__left-part">
        <div className="row-input-wrapper">
          <input 
            className="row-input row-input-active"
            value={newRowName}
            onChange={handleChangeNewRowName}
            onKeyDown={handleKeyDownCreate}
          />
        </div>
      </div>
      <div className="row-inputs__right-part">
        <div className="row-input-wrapper">
          <input 
            className="row-input row-input-active"
            value={newSalary}
            onChange={handleChangeNewSalary}
            type="number"
            onKeyDown={handleKeyDownCreate}
          />
        </div>
        <div className="row-input-wrapper">
          <input 
            className="row-input row-input-active"
            value={newEquipmentCosts}
            onChange={handleChangeNewEquipmentCosts}
            type="number"
            onKeyDown={handleKeyDownCreate}
          />
        </div>
        <div className="row-input-wrapper">
        <input 
          className="row-input row-input-active"
          value={newOverheads}
          onChange={handleChangeNewOverheads}
          type="number"
          onKeyDown={handleKeyDownCreate}
        />
        </div>
        <div className="row-input-wrapper">
          <input 
            className="row-input row-input-active"
            value={newEstimatedProfit}
            onChange={handleChangeNewEstimatedProfit}
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

