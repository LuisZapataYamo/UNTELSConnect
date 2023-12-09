import GlobalStateContext from "./context/GlobalStateContext"
import Routing from "./routes/Routing"

const App = () => {
  return (
    <GlobalStateContext>
        <Routing/>
    </GlobalStateContext>
  )
}

export default App;
