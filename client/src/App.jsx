import { useParams } from "react-router-dom";

function App() {
   const {id} = useParams()
   return (
      <>
         <div className="min-h-96 w-screen flex justify-center items-center">
            <h1 className="text-black dark:text-white">payment Succuss order id:  {id}</h1>
         </div>
      </>
   );
}

export default App;
