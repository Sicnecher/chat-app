import Form from "./form"
import styles from '../../global.module.css'
import { LogOutBtn } from "@/app/page"

export default function  formPage(){
    return (
        <>
        <LogOutBtn />
        <div className={styles.sideColumn}>
            <h1>Start your 30-day free trial</h1>
            <section>
            <i className="bi bi-people-fill"></i>
                <h3>Communicate with anybody you want!</h3>
            </section>
            <section>
                <></>
                <h3>Createreirjgn gekjrg kern gji er gergerij gerj gie rg erg</h3>
            </section>
            <section>
                <></>
                <h3>sfdsdf sfdsdfdgh fdfhj gyhkghjfgh hgfhjkh</h3>
            </section>
        </div>
        <Form />
        </>
    )
}