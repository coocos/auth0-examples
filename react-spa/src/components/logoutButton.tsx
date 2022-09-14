import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <a href="#" onClick={() => logout({ returnTo: window.location.origin })}>
      Logout
    </a>
  );
};

export default LogoutButton;
