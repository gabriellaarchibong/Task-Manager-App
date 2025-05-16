import { BrowserRouter } from "react-router-dom";
import Content from "./components/Content";
import { Toaster } from "react-hot-toast";
import ReloadPrompt from "./components/ReloadPrompt";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <ReloadPrompt />
      <Content />
    </BrowserRouter>
  )
}

export default App
