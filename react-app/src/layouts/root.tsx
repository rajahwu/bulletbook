import { SiteHeader, SiteFooter } from "../components"
import { Outlet } from "react-router-dom"
import { useState, useEffect } from 'react'
import { createClient, Session } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Database } from "../../database.types"

const supabase = createClient<Database>(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)

export default function Root() {
    const [session, setSession] = useState<Session | null>(null)
    const [user, setUser] = useState(null)

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

      useEffect(() => {
      supabase.auth.getUser()
        .then(({data}) => setUser(data.user))
        console.log(user)

      if(user?.id) {
        supabase.from('profiles').select('username', 'email').eq('id', user?.id)
        .then(({ data }) => {
          if(!data[0]) console.log('redirect to create profile')
        })
      }
      }, [user?.id])

      

    return (
        <div>
            <SiteHeader session={session} />
                 { session ? <Outlet /> : <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />}
            <SiteFooter />
        </div>
    )
}

export { supabase }