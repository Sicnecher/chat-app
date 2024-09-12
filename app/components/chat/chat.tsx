import styles from "../components.module.css"

export default function Chat({props}: {props: any}){
    return (
<div className={styles.message}>
  <div className={styles.messageOuter}>
    <div className={styles.messageAvatar}></div>
    <div className={styles.messageInner}>
      <div className={styles.messageBubble}></div>
      <div className={styles.messageActions}></div>
      <div className={styles.messageSpacer}></div>
    </div>
    <div className={styles.messageStatus}></div>
  </div>
</div>
    )
}