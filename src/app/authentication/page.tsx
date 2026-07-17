
import { headers } from "next/headers"
import { redirect } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { auth } from "@/lib/auth"

import LoginForm from "./components/login-form"
import SignUpForm  from "./components/sign-up-form"


const AutheticationPage = async () => {
  const session = await auth.api.getSession({
  headers: await headers(),
})

  if(session?.user){
    redirect("/dashboard")
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
       <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Criar conta</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AutheticationPage


// ERROR TypeError: (0 , react_hook_form__WEBPACK_IMPORTED_MODULE_8__.useForm) is not a function
// INDENTIFICAR USAR APENAS LADO DO CLIETE user client
 