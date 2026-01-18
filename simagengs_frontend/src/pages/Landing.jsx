export default function Landing() {
  return (
    <div>
      <h1>Welcome to the Landing Page</h1>
      <p>This is the main entry point of the application.</p>
      <button onClick={() => window.location.href = '/login'}>Go to Login</button>
    </div>
  )
}