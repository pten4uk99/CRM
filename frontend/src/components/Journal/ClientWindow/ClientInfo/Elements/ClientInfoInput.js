import React from "react";
import {connect} from "react-redux";
import InputWrapper from "./InputWrapper";
import {useIMask} from "react-imask";


function ClientInfoInput({label, defaultValue, name, phoneMask, onChange, classNameModifier}) {
    const [opts, setOpts] = React.useState({mask: "+{7}(000)000-00-00"});
    const {ref, maskRef} = useIMask(opts);

    return (
        <InputWrapper classNameModifier={classNameModifier}>
            <div className="label">{label}</div>
            <textarea className="input client-info__input"
                      defaultValue={defaultValue}
                      onChange={(e) => onChange(e)}
                      name={name}
                      rows={1}
                      ref={phoneMask && ref}/>
        </InputWrapper>
    )

}

export default connect(
    state => ({store: state}),
    dispatch => ({}),
)(ClientInfoInput)