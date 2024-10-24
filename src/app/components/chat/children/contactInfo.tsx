export default function ContactInfo({props}: {props: any}){
    const contact = props.contact.data.response
    return (
        <div>
            <h1>{contact.username}</h1>
            <h2>{contact.email}</h2>
            <hr />
            <h3>{contact.status}</h3>
        </div>
    )
}