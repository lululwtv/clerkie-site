'use client'

import { useState } from "react";

const Checkbox = ({checked}) => {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <div className="checkbox-wrapper">
        <input 
            onChange={() => 
                setIsChecked(!isChecked)}
            type="checkbox" className={`${isChecked ? 'checked' : ""}`}/>
    </div>
  );
};
export default Checkbox;