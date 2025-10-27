/*File: App.jsx located in RootFolder/src/      */

import { useState } from "react";
import { sanitizeInput } from "./utils/sanitizeInput";
import { isAlphabetOnly } from "./utils/isAlphabetOnly";
import { charLength } from "./utils/charLength";

function App() {
  //States for errors
  const [errorOverallState, setErrorOverallState] = useState("");
  const [errortxtField1State, setErrortxtField1State] = useState("");

  //initialize states for all input fields
  const [InputData, setInputData] = useState({
    txtField1: ""
  });
  //function to update values of states when user types
  const onChangeInputData = (event) => {
    setInputData({ ...InputData, [event.target.name]: event.target.value });
  };

  //When form is submitted
  const handleForm = (event)=>{
    event.preventDefault(); //avoid page loading when form is submitted
    console.log("button submitted")

    // Reset previous errors
    setErrorOverallState("");
    setErrortxtField1State("");

    let errorOverall = 1; // assume no errors initially
    
    //Validating txtField1
    let txtField1_get = sanitizeInput(InputData.txtField1);//sanitization
    if (txtField1_get === "") {
      setErrortxtField1State("Please enter in textField1");
      errorOverall = 0;
    }else if(isAlphabetOnly(txtField1_get) === 0){
      setErrortxtField1State("Only characters are allowed, here");
      errorOverall = 0;
    }else if (charLength(txtField1_get, 6, 35) === 0) {
      setErrortxtField1State("character should be within 6 to 35");
      errorOverall = 0;
    }

    //Stop execution if errors exist
    if (errorOverall === 0) {
      setErrorOverallState("Please enter all data in correct format");
      return;// stops the function here
    }
    console.log("txtField1: ",txtField1_get);
  }
  
  return <div>
    {errorOverallState && (
      <p style={{color: "red"}}>{errorOverallState}</p>
    )}

    <form onSubmit={handleForm}>

      {errortxtField1State && (
        <p style={{color: "red"}}>{errortxtField1State}</p>
      )}
      <input type="text" name="txtField1" id="txtField1" value={InputData.regEmail} onChange={onChangeInputData} placeholder="Type txtField1 data here" />
      <br />

      <button type="submit">Submit</button>
    </form>
  </div>
}
export default App;