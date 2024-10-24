import axios from "axios"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useState } from "react"
import styles from '../../../global.module.css'

export default function AddChannel({user, deactivateComponent}: {user: any, deactivateComponent: () => void}){
    const [resultedUsers, setResultedUsers] = useState<any>()
    const [creationData, setcreationData] = useState<{title: string, members: any[]}>({title: '', members: []})
    const [fieldValue, setFieldValue] = useState<any>()

    async function userToSearchHandler(e: React.ChangeEvent<HTMLInputElement>){
        setFieldValue(e.target.value);
        console.log(e.target?.value)
        if(e.target.value.length > 2){
            axios.post(`${process.env.NEXT_PUBLIC_PORT}/api/user/chats/searchUser`,e.target.value ).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log('here: ',error)
            })
        }
    }
    async function createChat(){
        axios.post(`${process.env.NEXGT_PUBLIC_API_BASE}/api/user/chats/createChat`, creationData).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log('here: ',error) 
        }).finally(() => {

        })
    }
    return(
        <div>
                <button onClick={deactivateComponent}>X</button>
                <input type="text" placeholder="Choose A title" onChange={(e) => setcreationData({title: e.target.value, members: creationData.members})}/>
                <Formik
                initialValues={{userToSearch: ''}}
                onSubmit={() => {}}>
                    {() => (
                        <Form>
                            <div>
                                <label htmlFor="userToSearch">Username or Email</label>
                                <Field
                                type="text"
                                name="userToSearch"
                                placeholder=" username or email to search"
                                value={fieldValue}
                                onChange={userToSearchHandler}
                                />
                                <ErrorMessage name="username" component="div" />
                            </div>                            
                        </Form>
                    )}
                </Formik>
                    {resultedUsers ? (
                        <section>
                            {resultedUsers.forEach(({name, email, id}: {name: string, email: string, id: number}) => (
                                <div 
                                onClick={() => {
                                    creationData.members.includes(id) ? 
                                    setcreationData({title: creationData.title, members: [...creationData.members, id]}) 
                                    : 
                                    setcreationData({title: creationData.title, members: creationData.members.filter(v => v !== id)})                                    
                                }} 
                                className={creationData.members.includes(id) ? styles.chosenUser : styles.unChosenUser}>
                                    <h4>name: {name}</h4>
                                    <h4>email: {email}</h4>
                                </div>
                            ))}
                            <button onClick={createChat}>Create Channel</button>
                        </section>
                    ) : (
                        <section>
                            <h2>Your results will appear here!</h2>
                        </section>
                    )}
            </div>
    )
}