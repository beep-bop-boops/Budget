import { Expense } from './expense';
import Styles from './dayinfo.module.css'
import { Expenseinput } from './expenseinput.js'
import { useState, useEffect } from 'react';

const DayInfo = ({hide, spent, date, budget, upspent}) => {
    
    let b = "<"



    
    let Dat = date

    let totemp = new Date()
    let yyyy = totemp.getFullYear(),
    mm = totemp.getMonth()+1 ,
    dd = totemp.getDate(),
    dy = totemp.getDate() -1
    if (dy < 10) dd = '0' + dy;
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    let today = dd + '/' + mm + '/' + yyyy;


    let yes = dy + '/' + mm + '/' + yyyy;

    if (today === date){
        Dat = String("Today")
    } else if(yes === date) {
       Dat = String("Yesterday")
    } else {
        Dat = date
    }




   // var ar = []

   // const [sp, setsp] = useState(spent)

   


    const [expensis, setexpensis] = useState([])



    useEffect(() => {
        
        console.log('Calculating Specific Date Expenses')
        // Check total spent on that specific day
        var spenttemp = 0
        const totexpen = expensis.map(fun => {    
            if(fun.id === date){
            //spenttotal = spenttotal + Number(fun.amount)
            spenttemp = spenttemp + Number(fun.amount)
            console.log("", fun.amount, "_on_",fun.name )
            }
            //return (spenttemp)

        })

 

        upspent(date ,spenttemp)
    }, [expensis])
    
    const Removeexpense = (key) => {

       let array = expensis
       for (var i = 0; i < array.length; i++){
           if(array[i].key = key){
            var index = i
           }
        }
        array.splice(index, 1)
        setexpensis([...array])
    }

    const Addexpense = (am , nm) => {
        let key1 = new Date();
         key1 = JSON.stringify(key1)
        let ar1 = {key1: key1 ,id: date, amount: am, name : nm }
        console.log('Expense Object Added to Expensis Array : ' , ar1)
        setexpensis(expensis.concat(ar1))

       // spent = spenttotal;
       // console.log("sending ", date, "spent total", spenttotal)
    }

    
    const Elements = expensis.map(fun => {   
        if(fun.id === date){
            return(
                <Expense key={fun.key1} key1={fun.key1} amount={fun.amount} title={fun.name} remove={Removeexpense}/>
            );
            }
    })


    return(
        <div className={Styles.root}>
            <p className={Styles.backbutton} onClick={() => hide(false)}> {b} </p>

        

            <div className={Styles.header}>
                <h1 className={Styles.h1}>£{spent*-1}‏‏‎ ‎</h1>
                <h1 className={Styles.h2}>spent of £{budget}</h1>
                
            </div>

            <div className={Styles.subinfo}>
            <p className={Styles.subtext}> {Dat} </p>
            </div>

   
            {Elements}
            
            <div className={Styles.input}>
            <Expenseinput Ad1={Addexpense} id={"day"} id2={"day1"}/>
            </div>

            <h1>‏‏‎ ‎</h1>
            

      
           
          

        </div>

    );
}

export {DayInfo};

