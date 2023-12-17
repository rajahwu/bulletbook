import { SiteHeader, SiteFooter } from "../components"
import { Outlet } from "react-router-dom"
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'


type Props = {
    children: string | JSX.Element | JSX.Element[] | (() => JSX.Element)
}

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)

export default function Root({ children }: Props) {
    const [session, setSession] = useState(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session)
        })
  
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session)
        })
  
        return () => subscription.unsubscribe()
      }, [])

    return (
        <div>
            <SiteHeader session={session} />
                 { session ? <Outlet /> : <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />}
            <SiteFooter />
        </div>
    )
}

export { supabase }