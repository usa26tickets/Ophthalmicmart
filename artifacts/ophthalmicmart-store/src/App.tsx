import { Router as WouterRouter } from "wouter";
import Storefront from "./components/storefront";

function App() {
  return <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}><Storefront /></WouterRouter>;
}

export default App;
