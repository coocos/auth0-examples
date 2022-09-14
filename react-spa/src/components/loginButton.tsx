import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <a href="#" onClick={() => loginWithRedirect()}>
      Login
    </a>
  );
};

export default LoginButton;
