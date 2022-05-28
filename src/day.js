import Styles from './day.module.css'


const Day = ({obj, spent,  Date1, update, id, budget, overflow}) => {



    let Dat = id

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

    if (today === id){
        Dat = String("Today")
    } else if(yes === id) {
       Dat = String("Yesterday")
    } else {
        Dat = Date1.toLocaleString('default', { day: '2-digit', month : '2-digit' })
    }


    


    let daycheck = false
    let u = id.substring(0,2)

    
 
    if(u === '01'){
        daycheck = true
    }


    

    let spentac = obj.spent*-1
    let over = false

    if(spentac >budget){
        over = true
        let overt = budget - spentac
        console.log("Amount over budget : ", overt)
        overflow(Date1, id, overt)
    }



    return(

        <div className={daycheck ? Styles.rootlast : Styles.root}>
            
            <div onClick={() => update(true, obj.spent, id, budget)} className={Styles.headerL}>
                <div className={Styles.header}>
                    <h1 className={over ? Styles.amountover : Styles.amount} >£{spentac} </h1>
               
                </div>
                <p className={Styles.subtext} > {Dat}  </p>
            </div>

            <div>
                <p className={Styles.interact}> ></p>
            </div>    
      
        </div>

   
    );
}

export {Day};