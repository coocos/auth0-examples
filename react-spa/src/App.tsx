import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/loginButton";
import LogoutButton from "./components/logoutButton";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <main>Loading...</main>;
  }

  return (
    <main>
      <nav>
        <h2>Auth0 + React</h2>
        <ul>
          <li>
            <a href="https://auth0.com/">Auth0 ↗</a>
          </li>
          <li>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</li>
        </ul>
      </nav>
      <header>
        <h1>👋 Hi there {isAuthenticated ? user?.name : "stranger"}!</h1>
        <p>
          This a simple example of how to use React with Auth0.
          {!isAuthenticated
            ? " However, you are not currently logged in. Please log in."
            : null}
        </p>
      </header>
    </main>
  );
}

export default App;
