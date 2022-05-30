import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import {roundFifty} from "./Coloring";


function AddCategory(props) {
    let [materialList, setMaterialList] = useState([
        {index: 1, name: '', quantity: 0}
    ])

    useEffect(() => {
        let visit = JSON.parse(localStorage.getItem(`visit ${1}`))
        let newMaterialList = []
        if (visit) {
            for (let elem of visit) {
                if (elem.id === props.index) newMaterialList.push(...elem.materials)
            }
        }
        if (newMaterialList.length > 0) setMaterialList(newMaterialList)
    }, [])

    useEffect(() => {
        let visitId = 1
        let visit = JSON.parse(localStorage.getItem(`visit ${visitId}`))
        if (!visit) {
            visit = [
                {
                    id: props.index,
                    category: props.catValue,
                    materials: materialList
                }
            ]
        }
        else {
            let inVisit = false
            visit.map((elem) => {
                if (elem.id === props.index) {
                    inVisit = true
                    elem.category = props.catValue
                    elem.materials = materialList
                }
                return elem
            })

            if (!inVisit) {
                visit = [
                    ...visit,
                    {
                        id: props.index,
                        category: props.catValue,
                        materials: materialList
                    }
                ]
            }

            let flourCount = 0
            let paintCount = 0
            for (let elem of visit) {
                if (elem.category === 'Порошок') {
                    for (let mat of elem.materials) flourCount += Number(mat.quantity)
                } else {
                    for (let mat of elem.materials) paintCount += Number(mat.quantity)
                }
            }
            let total = flourCount * props.flourPrice + paintCount * props.paintPrice

            props.setFlourSumValue(flourCount)
            props.setPaintSumValue(paintCount)
            props.setPaintSumPrice(roundFifty(total))
        }

        localStorage.setItem(`visit ${visitId}`, JSON.stringify(visit))
    }, [materialList, props.catValue])

    function handleRemoveMaterial(index) {
        setMaterialList(materialList.filter((elem, i) => elem['index'] !== index))
    }

    function handleAddMaterial() {
        let newIndex = materialList.length + 1

        for (let elem of materialList) {
            if (elem['index'] === newIndex) newIndex++
        }
        if (materialList.length <= 4) setMaterialList([...materialList, {index: newIndex, name: '', quantity: 0}])
    }

    function handleChangeMatName(e, index) {
        setMaterialList(materialList.map((elem, i) => {
            if (elem['index'] === index) elem['name'] = e.target.value
            return elem
        }))
    }

    function handleChangeQuantity(e, matIndex) {
        let value = e.target.value

        if (!isNaN(Number(value)) && value.length <= 3) {
            setMaterialList(materialList.map((mat) => {
                if (mat['index'] === matIndex) {
                    mat['quantity'] = value
                }
                return mat
            }))
        }
    }

    return (
        <div className="add-client-window__category">
            <div className="add-category">
                {props.index === props.lastIndex ?
                    <div className="plus" onClick={props.onAdd}>+</div> :
                    <div className="nothing"/>}

                <textarea className="input input-category"
                          placeholder="Категория"
                          rows={1}
                          value={props.catValue}
                          onChange={(e) => props.setCatValue(e)}/>
            </div>
            <div className="materials">
                {materialList && materialList.map((mat, matIndex) => {
                    return <div className="add-material" key={mat['index']}>
                        <textarea className="input input-material"
                                  placeholder="Материал"
                                  rows={1}
                                  value={mat['name']}
                                  onChange={(e) => handleChangeMatName(e, mat['index'])}/>
                        {matIndex === 0 ?
                            <span className="plus" onClick={() => handleAddMaterial()}>+</span> :
                            <span className="minus" onClick={() => handleRemoveMaterial(mat['index'])}>-</span>}

                        <div className="quantity">
                            <textarea rows={1}
                                      className="input input-quantity"
                                      value={mat['quantity']}
                                      onChange={(e) => handleChangeQuantity(e, mat['index'])}/>
                            <span>г</span>
                        </div>

                        {props.index !== 1 && matIndex === 0 &&
                            <div className="remove-category" onClick={props.onRemove}><span>-</span></div>}
                    </div>
                })}
            </div>
        </div>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(AddCategory);
