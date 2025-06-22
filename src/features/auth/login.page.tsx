import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui/kit/card";

function LoginPage() {
    // const loginMutation = rqClient.useMutation('post', '/auth/login')

    // loginMutation.mutate({
    //     email: 'test@test.com',
    //     password: 'test',
    // })
  return <main className="grow flex flex-col pt-[200px] items-center">
    <Card className="w-full max-w-[400px]">
        <CardHeader>
            <CardTitle>Вход в систему</CardTitle>
            <CardDescription>
                    CardDescription
            </CardDescription>
        </CardHeader>
    </Card>
  </main>;
}

export const Component = LoginPage;
