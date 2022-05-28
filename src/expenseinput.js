import { useState } from 'react'
import Styles from './expenseinput.module.css'

const Expenseinput = ({Ad1, id, id2}) => {

    const [on, seton] = useState(true)

    const addex = () => {

   


    var amount =  document.getElementById(id).value
    let title = document.getElementById(id2).value

    document.getElementById(id).value = ""
    document.getElementById(id2).value = ""

    if(on === true) amount = amount * -1
    

    Ad1(amount, title)

  
}

const Flip = () => {
    seton(!on)
}


    return (
        <div className={Styles.root}>
    
            <h1 className={Styles.pound}>£</h1>
            <input className={Styles.inputm} placeholder="1" type="number" id={id}   />
            <button className={Styles.button} onClick={Flip} >{on ? "on" : "from"}</button>
            <input className={Styles.inputdes} placeholder="stuff" type="text" id={id2} name="fname"/>
            <button className={Styles.buttonadd} onClick={addex}>+</button>
        </div>

    );
}

export {Expenseinput};