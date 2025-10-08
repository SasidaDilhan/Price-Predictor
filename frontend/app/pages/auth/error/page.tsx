export default function AuthErrorPage() {
  return (
    <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <h1>Authentication Error</h1>
      <p>Something went wrong during sign in.</p>
      <a href="/auth/signin">Back to Sign In</a>
    </div>
  );
}
