import { BrowserRouter } from "react-router-dom";
import Content from "./components/Content";
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <BrowserRouter>
    <Toaster />
      <Content />
    </BrowserRouter>
  )
}

export default App
