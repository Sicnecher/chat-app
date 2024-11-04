import AddChannelComponent from "./addChannel";

export default function Page({user}: {user: any}){
    function addChannelHandler(){
        console.log('hi')
    }
    return (
        <AddChannelComponent user={user} deactivateComponent={addChannelHandler}/>
    )
}