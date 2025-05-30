import { Link } from "react-router-dom";
import { AuthLayout } from "./auth-layout";
import { ROUTES } from "@/shared/model/routes";

function RegisterPage() {
  return <AuthLayout
    title="Регистрация"
    description="Введите ваш email и пароль для регистрации"
    footerText={<>Уже есть аккаунт? <Link to={ROUTES.LOGIN}>Войти</Link></>}
    form={<form></form>}
  />;
}

export const Component = RegisterPage;
