import { Day } from "./day";
import { Month } from "./month";
import { useEffect, useState } from "react";
import { DayInfo } from "./dayinfo";
import Styles from './daylist.module.css';
import { MonthInfo } from "./monthinfo";
import { GR } from "./GoldenRation";


const Daylist = () => {

    //Day list info
    const [inData, setinData] = useState([]) 
    //Month list info
    const [inDataM, setinDataM] = useState([]) 

    const [MonthBud, setMonthBud] = useState([])
    const [ShowDayInfo, setShowDayInfo] = useState(false)
    const [spent, setspent] = useState(0)
    const [Daybudget, setDaybudget] = useState()
    const [date, setdate] = useState()
    const [showMonthInfo, setShowMonthInfo] = useState(false)
    //Month selected to show on info screen
    const [MonthName ,setMonthName] = useState()

    document.documentElement.style.setProperty('--h1' , GR(1) + 'vmin')
    document.documentElement.style.setProperty('--h2' , GR(2) + 'vmin')
    document.documentElement.style.setProperty('--h3' , GR(3) + 'vmin')
    document.documentElement.style.setProperty('--h4' , GR(4) + 'vmin')
    document.documentElement.style.setProperty('--h5' , GR(5) + 'vmin')
    document.documentElement.style.setProperty('--h6' , GR(6) + 'vmin')
    document.documentElement.style.setProperty('--h7' , GR(7) + 'vmin')

    var    date_today = new Date();
    var    date_loop = new Date();
    var    daysback = 60;
    var    date_last = new Date(date_today.getTime() - (86400000*daysback));


    //Initilize Days Array 
    const init = () => {
        var ar = []
        while (date_loop >= date_last) {
            let yyyy = date_loop.getFullYear(),
            mm = date_loop.getMonth() +1 ,
            dd = date_loop.getDate()
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            let id = dd + '/' + mm + '/' + yyyy;
            
            const obj = {id: id, date: date_loop, spent: 0, budget:0 }
            // inData.push(obj)
            ar.push(obj)
            date_loop = new Date(date_loop.getTime() - (86400000*1))
        }
        setinData(ar)
    }

    //Initilize Month Array
    const initM = (id) => {

        let found = false
    
        for (let x = 0; x < inDataM.length; x++ ) {
           console.log("Finding")
           if (id === inDataM[x].id) {
               found = true
           } 

        } 

        if(found === false) {
           

            //const obj = {id: id, date: date_loop, spent: 0}

            let tempM = inDataM
            let obj = {id: id, budget:0}
            tempM.push(obj)
          
            setinDataM(...[tempM])

           
            
        }
            

        
        

    }

    const overFlow = (date, id , min) => {
        //this months budget - min (<- cant do this or wont overflow for more than 1 day)

        console.log("Checking for overflow")

        let prev = new Date(date.getTime() + (86400000*1))

        let yyyy = prev.getFullYear(),
        mm = prev.getMonth()+1 ,
        dd = prev.getDate()
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        let formatdate = dd + '/' + mm + '/' + yyyy;



       // console.log(prev, "minus:", min, "format date: ", formatdate)

        let tempa = inData 
        for(let y = 0; y < tempa.length; y++){
        if(tempa[y].id === formatdate){
           

       // first day of the month budget needs to check that months budget!!!!!!!! Otherwise will check previous months budget (actually it wont??)
       let b = y+1
       tempa[y].budget = Number(tempa[b].budget) + Number(min)
        console.log(tempa[b].id, "<- Is over budget... changin ", tempa[y].id, "budget to first" )
     //   console.log(tempa[y].budget)

     
        }
     
}
setinData(...[tempa])
//console.log(inData)

        
        /*
        const overFlowMod =  tempa.map((x) => {
            if(prev === x.date){
            x.budget = x.budget - min
            }
  
        })

        */
  
      //  setinData(...[overFlowMod])
    }


    if (inData.length < 2){
        console.log("Dates Array Initilize")
        init()
     //   console.log(inData)
    }


    const ToggleDayInfo = (what, spent, date, budget) => {
        console.log("(Day) Visibility: ", what, " ID: ", date, budget)
      //  console.log(inData)
        setdate(date)
        setShowDayInfo(what)
        setspent(spent)
        setDaybudget(budget)
    }
        
    const ToggleMonthInfo = (what, id, monthName) => {
        console.log("(Month) Visibility: ", what, " ID: ", id)
        setShowMonthInfo(what)
        setdate(id)
        setMonthName(monthName)
        
    }

    const UpdateMonthInfoList = (bud) => {

        setMonthBud(bud)
        console.log(MonthBud)

    }
    
    //Add Button
    const spending_add = (id, spent) => {
        //console.log(inData)
        console.log("Searching for ID : " + id)

       // let dayfound = false;
        for (let i = 0; i < inData.length ; i++){
            if(inData[i].id === id){
                console.log("ID Found: " + inData[i].id)

                let items = inData
                let item = inData[i]
                item.spent = spent
                items[i] = item
                /* need to use [...items] and not (items) since react sees it as
                the same array and doesnt re-render as you only changed 
                a child value
                */
                setinData([...items])
                setspent(spent)


            
              //  setinData(inData[i].spent = 2)
           //   dayfound = true
                break;
            } 
            
        }

       // if(dayfound === false){
           
      // }
    }



//update Month Budget
    const spending_add_Month = (id, budget) => {

        console.log("Searching For Month")
        //Chaning the month budgert
        for (let i = 0; i < inDataM.length ; i++){
            if(id === inDataM[i].id){
              
                let ar = inDataM
                ar[i].budget = budget
                setinDataM(...[ar])
               
                
            }
            //changing the day budget
            let DayMan = inData
          
            let monthID = String(id)
            monthID = monthID.slice(0,2)

            for(let k = 0; k < DayMan.length ; k++){
                let DayID = String(DayMan[k].id)
                DayID = DayID.slice(3,5)

   
                if (monthID  === DayID)  {
                    DayMan[k].budget = budget
                  }

            }

        
        setinData(DayMan)
     //   console.log(inData)


        }

    }



        const Elements = inData.map(x => {


            let tempmonth = new Date()
            let monthText = tempmonth.setMonth(x.date.getMonth() -1)
            monthText = tempmonth.toLocaleString('default', {month: "long"})
          


            let yyyy = x.date.getFullYear(),
            mm = x.date.getMonth() ,
            dd = x.date.getDate()
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            let id =  mm + '/' + yyyy;
            let date = dd + '/' + mm + '/' + yyyy;
            let dateM = mm + '/' + yyyy;
            

            let y = new Date()
            let yyyy1 = y.getFullYear(),
             mm1 = y.getMonth() ,
             mm2 = y.getMonth() + 1 ,
            dd1 = y.getDate()
            if (dd1 < 10) dd1 = '0' + dd1;
            if (mm1 < 10) mm1 = '0' + mm1;
            if (mm2 < 10) mm2 = '0' + mm2;
            let todayd = dd1 + '/' + mm1 + '/' + yyyy1;
            let thism = mm2 + '/' + yyyy1;

    
   
        if (todayd == date){

            let tm2 = new Date()
             tm2 = tempmonth.setMonth(x.date.getMonth())
            tm2 = tempmonth.toLocaleString('default', {month: "long"})
          
            initM(thism)

        
            return(
                <div key={x.id}>
                <Month id={thism}  Update={ToggleMonthInfo} Month={tm2}/>
                <Day overflow={overFlow} obj={x} Date1={x.date} id={x.id} budget={x.budget}  spent={x.spent} update={ToggleDayInfo}/>
                </div>
            )
        }
        
        if(x.date.getDate() === 1) {
         

            initM(dateM)

            return (
                <div key={x.id}>
                     <Day overflow={overFlow} obj={x} Date1={x.date} id={x.id} budget={x.budget} spent={x.spent} update={ToggleDayInfo}/>
                    <Month id={dateM}  Update={ToggleMonthInfo} Month={monthText}/>
                </div>
            );
        } else {
            return(
            <div key={x.id}>
                <Day overflow={overFlow} obj={x} Date1={x.date} id={x.id} budget={x.budget} spent={x.spent} update={ToggleDayInfo}/>
            </div> 
            );  


        }
    })

    /*


          <div className={Styles.header}>
                    <h1 className={Styles.totalamount}>Total Save: £100.32</h1>
                    <h1 className={Styles.gear}>⚙</h1>
                </div>

                */


    return(
        <div className={Styles.root}>
            
            <div className={ShowDayInfo ? Styles.show : Styles.hide}>
                <DayInfo  hide={ToggleDayInfo} budget={Daybudget} spent={spent} date={date} upspent={spending_add} />
            </div>

            <div className={showMonthInfo ? Styles.show : Styles.hide}>
                <MonthInfo upMonthInf={UpdateMonthInfoList} MN={MonthName} hide={ToggleMonthInfo} date={date} upspent={spending_add_Month}/>
            </div>
            
            <div className={Styles.welcome}>
                <h1 className={Styles.welt1}>Hey👋 </h1>
            </div>

            <div className={Styles.welcomeinfo}>
                <p className={Styles.welt2}>Welcome to budget, a simple clean application to help you save money. Click on the months 
                    the add your fixed expensis, income and set your monthly budget, click on days to add 
                    expensis.
                </p>
            </div>
        

            <div>
                <div onClick={() => console.log("Clickeddd")} className={Styles.Elements}>
                    {Elements}
                </div>
                <h1>‏‏‎ ‎</h1>
            </div>
        </div>
    );

}


export {Daylist};