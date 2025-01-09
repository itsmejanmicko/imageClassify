import  { ReactNode } from 'react'
import Header from '../common/Header'

export default function MainLayout({children}:{children:ReactNode}) {
  return (
   <main className='font-customFont bg-primary '>
     <Header />
     <div className=''>
       {children}
     </div>
   </main>
  )
}
