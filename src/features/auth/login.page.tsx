import { Link } from "react-router-dom";
import { AuthLayout } from "./auth-layout";
import { ROUTES } from "@/shared/model/routes";

function LoginPage() {

  return <AuthLayout
    title="Вход в систему"
    description="Введите ваш email и пароль для входа в систему"
    footerText={<>Нет аккаунта? <Link to={ROUTES.REGISTER}>Зарегистрироваться</Link></>}
    form={<form></form>}
  />;
}

export const Component = LoginPage;
