import UserRoute from "./router/UserRoute"


export default function App() {
  const routes = UserRoute();
  return (
    <main>
      {routes}
    </main>
  )
}
