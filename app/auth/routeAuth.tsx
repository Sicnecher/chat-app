// import { useRouter } from "next/router";
// import { JSXElementConstructor, ReactElement, useEffect } from "react";

// export default function authWrapper(Component: React.ReactDOM){
//     return function AuthenticatedComponent(props: any){
//         const router = useRouter()
//         useEffect(() => {
//             const isAuthenticated = false
//             if(!isAuthenticated){
//                 router.push('/login')
//             }
//         })
//         return (
//             <Component {...props} />
//         )
//     }
// }