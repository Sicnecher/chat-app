import styles from "./components.module.css"

export default function LoadPage(){
    return (
        <div className={styles.loaderWrapper}>
        <div className={styles.loader}></div>
      </div>
    )
}