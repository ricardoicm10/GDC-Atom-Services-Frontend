import React,{useState} from "react";
import Select from "react-select"
import "./FormInput.css"

function FormInput({id,select,label,textArea,isValid,onChange,options,isMulti,errorMessage,onChangeMultiple,...inputProps}){

    const [focused,setFocused] = useState(false)

    const handleFocus = (e) =>{
        setFocused(true)
    }



    return(
        <div className="FormInput">
            <label>{label}</label>
            {select && isMulti &&
                    <Select  {...inputProps}     options={options} isMulti={isMulti} onChange={onChangeMultiple}   onBlur={handleFocus} focused={focused.toString()}>
                </Select>
            }
            
            {select && !isMulti &&
                <select {...inputProps} className="select" onChange={onChange} onBlur={handleFocus} focused={focused.toString()}>
                    <option value="" >Please choose an option</option>
                    {options.map((option)=>(
                        <option value={option} key={option}>{option}</option>
                    ))}
                </select>

            }
            {textArea &&
                <textarea {...inputProps} onChange={onChange} onBlur={handleFocus} focused={focused.toString()}></textarea>
             }
             {!select && !textArea &&
             <input {...inputProps} onChange={onChange} onBlur={handleFocus} focused={focused.toString()}/>}
            <span >{errorMessage}</span>
        </div>
    )
}


export default FormInput