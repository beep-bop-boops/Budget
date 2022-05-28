import Styles from './expense.module.css'

const Expense = ({amount, title, key1, remove}) => {

    let positive = true
    let am = amount

    if(amount > 0) {
        positive = true

    } else {
        positive = false
        am = am*-1
    }


    return(
        <div className={Styles.root}> 
        <div className={Styles.header}>
            <h2 className={Styles.amount}>£{am}‏‏‎ ‎</h2>
            <p className={Styles.destext}>{positive ? "from " : "on "}‎‎‎‎‎</p>
            <p className={Styles.destext}>{title}</p>
        </div>
            <button className={Styles.button} onClick={() => remove(key1)} >+</button>
           
        </div>
    );

}
export {Expense};