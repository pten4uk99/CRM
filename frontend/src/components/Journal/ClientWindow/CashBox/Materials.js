import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import AddCategory from "./AddCategory";


function Materials(props) {
    let [categoryList, setCategoryList] = useState([])
    let [activeCategoryField, setActiveCategoryField] = useState(null)

    useEffect(() => {
        let visit = JSON.parse(localStorage.getItem(`visit ${1}`))
        let newCategoryList = []
        if (visit) {
            for (let elem of visit) {
                newCategoryList.push([elem.id, elem.category])
            }
        }
        if (newCategoryList.length === 0) newCategoryList = [[1, '']]
        setCategoryList(newCategoryList)
    }, [])

    function handleRemoveCategory(index) {
        setCategoryList(categoryList.filter((elem) => elem[0] !== index))
        let visit = JSON.parse(localStorage.getItem(`visit ${1}`)) // идентификатор посещения потом будет браться из бэка
        localStorage.setItem(`visit ${1}`, JSON.stringify(visit.filter((elem) => elem.id !== index)))
    }

    function handleAddCategory() {
        let newIndex = categoryList.length + 1

        for (let elem of categoryList) {
            if (elem[0] === newIndex) newIndex++
        }
        if (categoryList.length < 4) setCategoryList([...categoryList, [newIndex, '']])
    }

    function handleChangeCatValue(value, index) {
        setCategoryList(categoryList.map((elem) => {
            if (elem[0] === index) elem[1] = value
            return elem
        }))
    }

    return (
        <div className="add-client-window__materials" onClick={() => setActiveCategoryField(null)}>

            {categoryList.map((elem) => {
                return <AddCategory key={elem[0]}
                                    activeCategory={activeCategoryField}
                                    setActiveCategory={setActiveCategoryField}
                                    index={elem[0]}
                                    lastIndex={categoryList[categoryList.length - 1][0]}
                                    onAdd={handleAddCategory}
                                    onRemove={() => handleRemoveCategory(elem[0])}
                                    setCatValue={(value) => handleChangeCatValue(value, elem[0])}
                                    catValue={elem[1]}
                                    setPaintSumPrice={props.setPaintSumPrice}
                                    setPaintSumValue={props.setPaintSumValue}
                                    setFlourSumValue={props.setFlourSumValue}
                                    flourPrice={props.flourPrice}
                                    paintPrice={props.paintPrice}/>
            })}
        </div>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(Materials);
