


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import SignUpForm  from "./components/sign-up-form"

const AutheticationPage = () => {

  return (
    <div className="flex h-screen w-screen items-center justify-center">
       <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Criar conta</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
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
 