import { useState } from "react";

const InputForm = ({leftIcon, placeholder, rightIcon, size, altIcon, name, onChange, onBlur, value}) => {

    const [focusColor, setFocusColor] = useState(false);
    const [visibility, setVisibility] = useState(false);

    const focusClick = () => {
        setFocusColor(true);
    };

    const focusClickFalse = () => {
        setFocusColor(false);
    };

    const toggleVisibility = () => {
        setVisibility(!visibility);
    }

    return (
        <div>
            {focusColor ? <div onFocus={focusClick} onBlur={focusClickFalse} className={`container-input-form-true w-${size ? `[327px]` : `[528px]`} h-${size ? `[44px]` : `[48px]`}`}>
            {focusColor ? <div className="text-orangePrimary ml-4">{leftIcon}</div> : <div className="text-black ml-4">{leftIcon}</div>}
           <input name={name} onChange={onChange} onBlur={onBlur} value={value} className="input-form" type={rightIcon ? visibility ? "text" : "password" : "text"} placeholder={`${placeholder}`}/>
            {rightIcon ? <button onClick={toggleVisibility} className="right-icon-true">{visibility ? rightIcon : altIcon}</button> : null}
            </div> : <div onFocus={focusClick} onBlur={focusClickFalse} className={`container-input-form-false w-${size ? `[327px]` : `[528px]`} h-${size ? `[44px]` : `[48px]`}`}>
            {focusColor ? <div className="text-orangePrimary ml-4">{leftIcon}</div> : <div className="text-black ml-4">{leftIcon}</div>}
           <input name={name} onChange={onChange} onBlur={onBlur} value={value} className="input-form" type={rightIcon ? visibility ? "text" : "password" : "text"} placeholder={`${placeholder}`}/>
           {rightIcon ? <button onClick={toggleVisibility} className="right-icon-false">{visibility ? rightIcon : altIcon}</button> : null}
            </div>}     
        </div>     
    );
}
 
export default InputForm;