import React, {useRef, useState} from "react";
import {connect} from "react-redux";
import AddCategory from "./AddCategory";


function Materials(props) {
    let [categoryList, setCategoryList] = useState([[1, '']])

    function handleRemoveCategory(index) {
        setCategoryList(categoryList.filter((elem) => elem[0] !== index))
    }

    function handleAddCategory() {
        let newIndex = categoryList.length + 1

        for (let elem of categoryList) {
            if (elem[0] === newIndex) newIndex++
        }
        if (categoryList.length < 4) setCategoryList([...categoryList, [newIndex, '']])
    }



    function handleChangeCatValue(e, index) {
        setCategoryList(categoryList.map((elem) => {
            if (elem[0] === index) elem[1] = e.target.value
            return elem
        }))
    }

    return (
        <div className="add-client-window__materials">

            {categoryList.map((elem) => {
                return <AddCategory key={elem[0]}
                                    index={elem[0]}
                                    lastIndex={categoryList[categoryList.length - 1][0]}
                                    onAdd={handleAddCategory}
                                    onRemove={() => handleRemoveCategory(elem[0])}
                                    setCatValue={(e) => handleChangeCatValue(e, elem[0])}
                                    catValue={elem[1]}/>
            })}
        </div>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(Materials);
