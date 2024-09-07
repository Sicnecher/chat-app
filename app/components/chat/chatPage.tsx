import ContactScroll from "../contact/contact.scroll"
import ContactInfo from "../contact/contact.info"
import Chat from "./chat"
export default function ChatPage({props}: {props: any}){
    return (
        <div>
            <ContactScroll props={<ContactInfo props={props.id} />} />
            <Chat props={props.id}/>
        </div>
    )
}