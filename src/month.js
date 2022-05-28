import Styles from './month.module.css'


const Month = ({Month, Update, id}) => {

   // let date1 = new Date()
   
   // const month = date1.toLocaleString('default', { month: 'long'  });
    

    
    return(

        <div onClick={() => Update(true, id, Month)} className={Styles.block}>
            
                <p className={Styles.headertext}>{Month}</p>
                <button className={Styles.interact}>></button>

        </div>

   
    );
}

export {Month};