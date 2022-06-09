import { BsSearch } from "react-icons/bs";
import { useState } from "react";

const SearchBar = ({placeholder}) => {

    const [focusColor, setFocusColor] = useState(false);

    const focusClick = () => {
        setFocusColor(!focusColor);
    };

    return (
            <div className="relative w-fit h-fit mt-1 text-black">
                <input onFocus={focusClick} onBlur={focusClick} className={`input-mobile-header-true w-[192px] md:w-[600px] lg:w-[55vw]`} placeholder={`${placeholder}`} type="text" />
                {focusColor ? <button className="button-search-mobile-header-true"><BsSearch/></button> : <button className="button-search-mobile-header-false"><BsSearch/></button>}    
            </div>        
    );
}
 
export default SearchBar;