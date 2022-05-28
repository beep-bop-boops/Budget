import { Expenseinput } from './expenseinput'
import { Expense } from './expense'
import Styles from './monthinfo.module.css'
import { useState } from 'react'
import { useEffect } from 'react'

const MonthInfo = ({hide, date, upspent, upMonthInf, MN}) => {

    let b = "<"


    const [expensis, setexpensis] = useState([])
    
    const [TotExp, setTotExp] = useState()
    const [saveper, setsaveper] = useState(60)
    const [TotIncome, setTotIncome] = useState()
    const [DailyLimit, setDailyLimit] = useState()
    const [ShouldSave, setShouldSave] = useState(0)

    
    //If MN (MonthName) changed make changes to month
    useEffect(() => {
        console.log("Make Changes to month")
        let expense = 0
        let income = 0
        setTotExp(0)

        //to work out how much should save
      

        expensis.map(fun => {    
            if(fun.id === date){

                if(fun.amount < 0) {
                    expense = (expense + Number(fun.amount))*-1
                } else if(fun.amount > 0) {
                    income = income + Number(fun.amount)
                }
          
            
            console.log("", fun.amount, "_on_",fun.name )
            }

            setTotExp(expense)
            setTotIncome(income)
            let limit = 0
            if (income > expense){
            //limit = ((income-expense)*(saveper/10))/30
           // limit = income-expense
           limit = income-expense
            limit = income-(income*(saveper/100))
            limit = limit/31
            limit = limit.toFixed(2)
            console.log("limit = ", income, "/", saveper, "=", limit)
       //     limit = limit/31
        } else {
            limit = 0
        }
            setDailyLimit(limit)
            upspent(date, limit)

            
            let ss = income-expense
            ss = ss*(saveper/100)
            setShouldSave(ss)


        })

     



        
    }, [MN, saveper, TotExp, TotIncome])
        
        
 

    const changeper = (e) => {
        setsaveper(e.target.value)

    }
            

    //When expense added
    useEffect(() => {
        
        console.log('Summing Up Month Expensis')
        // Check total spent on that specific day
        let spenttemp = 0
        let incometemp = 0
        const totexpen = expensis.map(fun => {    
            if(fun.id === date){

                if(fun.amount < 0) {
                    spenttemp = ( spenttemp + Number(fun.amount) ) * -1
                } else if(fun.amount > 0) {
                    incometemp = incometemp + Number(fun.amount)
                }
           
           
            console.log("", fun.amount, "_on_",fun.name )
            }
           

        })

        setTotExp(spenttemp)
        setTotIncome(incometemp)
        spenttemp =  spenttemp - (spenttemp*(0.6))


      
        upspent(date ,spenttemp)
    }, [expensis])


 

    const Addexpense = (am , nm) => {
        let key1 = JSON.stringify(new Date())
        let ar1 = {key1: key1 ,id: date, amount: am, name : nm }
        console.log('Add' , ar1, 'to Month expensis')
      


        let bud = {id: "04/2022",totalin: 1, totalout: 2, save: 60, dailybud: 30}


       // upMonthBud(bud)

       setexpensis(expensis.concat(ar1))

    
    }

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


    
    const Elements = expensis.map(fun => {   
        if(fun.id === date){
          

            return(
                <Expense key={fun.key1} key1={fun.key1} amount={fun.amount} title={fun.name} remove={Removeexpense}/>
            );
            }})

//    <p className={Styles.text2}>Saved so far : £0</p>
 
    return(
        <div className={Styles.root}>
            <p className={Styles.backbutton} onClick={() => hide(false)}>{b}</p>


            <div className={Styles.header}>
                <div className={Styles.headerL}>
                    <h1 className={Styles.text1}>{MN}</h1>
                 </div>
               
                 <div className={Styles.headerR}>
                    <p className={Styles.save}>save</p>
                    <input onChange={changeper} type={"text"} placeholder={"60"} className={Styles.percentage} />
                    <h1 className={Styles.text2} >%</h1>
                    
                </div>
            </div>

            <div className={Styles.subtextcont}>
                <p className={Styles.subtext}>Total Income : £{TotIncome}</p>
                <p className={Styles.subtext}>Fixed Expensis : £{TotExp}</p>
                <p className={Styles.subtext}>Daily Limit : £{DailyLimit}</p>
                <p className={Styles.subtext}>Should Save : £{ShouldSave}</p>
            </div>

        
            <div>
                {Elements}
            </div>

            <div className={Styles.addexpense}>
                <Expenseinput Ad1={Addexpense} id={"month"} id2={"month1"}/>
            </div>
        </div>

    );
}

export {MonthInfo};