import React, {useState} from "react";
import {connect} from "react-redux";
import {AddCashPosition, RemoveCashPosition} from "../../../../redux/actions/Main/cashResult";
import WomanPriceTable from "./WomanPriceTable";


function PriceTable(props) {
    let cashResult = props.store.cashResult
    let data = props.data
    let priceList = data?.price_list || []
    let service = data?.header

    let [chosenPosition, setChosenPosition] = useState(null)

    function handleAddPosition(pos) {
        if (!chosenPosition) {
            props.AddCashPosition(data.service_index, pos)
            setChosenPosition(pos)
        }
    }

    return (
        <div className="add-client-window__price-table">
            {service === 'Мужской зал' &&
                <div className="table">
                    {priceList.map((elem) => {
                        return <div className="row">
                            <div className="name">{elem.name}</div>
                            <div className="price" onClick={() => handleAddPosition(elem)}>{elem.price}</div>
                        </div>
                    })}
                </div>}
            {service === 'Стрижка женская' && <WomanPriceTable data={data}
                                                               chosenPosition={chosenPosition}
                                                               setChosenPosition={setChosenPosition}/>}
        </div>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        AddCashPosition: (service_index, pos) => dispatch(AddCashPosition(service_index, pos)),
        RemoveCashPosition: (pos) => dispatch(RemoveCashPosition(pos)),
    })
)(PriceTable);
