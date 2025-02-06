import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [mode, setMode] = useState("decimal-to-binary");
  const [decimal, setDecimal] = useState("");
  const [binary, setBinary] = useState("");
  const [binaryInput, setBinaryInput] = useState("");
  const [decimalFromBinary, setDecimalFromBinary] = useState("");
  const [twosComplement, setTwosComplement] = useState("");
  const [isTwoComplement, setIsTwoComplement] = useState(0);

  const handleDecimalChange = (e) => {
    console.log(e.target.value);
    const value = e.target.value;


    if (/^-?\d*$/.test(value)) {
      setDecimal(value); 
      if (value) {
        let num = parseInt(value, 10);
        let bitLength = 4;
        while (Math.abs(num) >= Math.pow(2, bitLength)){
          bitLength++;
          console.log(bitLength);
        }

        let bin = new Array(bitLength);

        let n = Math.pow(2, bitLength -1);
        
        console.log(num, n, bitLength);

        for (let i = 0; i < bitLength; i++) {
          if (num >= n) {
            bin[i] = 1;
            num -= n;
          } else {
            bin[i] = 0;
          }
          n /= 2;
        }
        const binaryValue = bin.join("");




        //let binaryValue = (num >>> 0).toString(2);
        //binaryValue = binaryValue.padStart(bitLength, "0");
        setBinary(binaryValue);
        
        if (num < 0) {
          let negativeNum = -1 * Math.pow(2, bitLength);
          console.log("aaaa", negativeNum, bitLength);
          n = Math.pow(2, bitLength);
          bin = new Array(bitLength);
          for (let i = 0; i < bitLength-1; i++) {
            if (negativeNum + n <= num) {
              bin[i] = 1;
              negativeNum += n;
            } else {
              bin[i] = 0;
              
            }
            n = n /2;
          }
          setTwosComplement("1" + bin.join(""));
          setBinary("N/A");
        } else {
          setTwosComplement("0"+binaryValue);
        }
      } else {
        setBinary("");
        setTwosComplement("");
      }
    }
  };

  const handleBinaryChange = (e) => {

    const value = e.target.value;
    if (/^[01]*$/.test(value)) {
      setBinaryInput(value);
      let num = 1;
      let sum = 0;
      for (let i = value.length - 1; i >= 0; i--) {
        if (value[i] === "1") {
          sum+= num;

        }
        num *= 2;

      }
      if (isTwoComplement && value.charAt(0) === "1"){
        sum -= num;
      }

      setDecimalFromBinary(sum);
    }
  };

  useEffect(() => {
    handleBinaryChange({ target: { value: binaryInput } });
  }, [isTwoComplement]);

  return (
    <div className="container">
      <div className="switch-mode">
        {mode === "binary-to-decimal" && <button onClick={() => setMode("decimal-to-binary")} className={mode === "decimal-to-binary" ? "active" : ""}>Decimal to Binary</button>}
        {mode === "decimal-to-binary" && <button onClick={() => setMode("binary-to-decimal")} className={mode === "binary-to-decimal" ? "active" : ""}>Binary to Decimal</button>}
      </div>
      {mode === "decimal-to-binary" ? (
        <div className="converter-box">
          <h2 className="title">Decimal to Binary Converter</h2>
          <input
            type="text"
            value={decimal}
            onChange={handleDecimalChange}
            placeholder="Enter decimal number"
            className="input-box"
          />
          <p className="output">Binary: <span className="binary-result">{binary || "-"}</span></p>
          <p className="output">Two's Complement: <span className="binary-result">{twosComplement || "-"}</span></p>
        </div>
      ) : (
        
        <div className="converter-box">
          
          <h2 className="title">Binary to Decimal Converter</h2>
          
          <input
            type="text"
            value={binaryInput}
            onChange={handleBinaryChange}
            placeholder="Enter binary number"
            className="input-box"
          />
          <p className="output">Decimal: <span className="binary-result">{decimalFromBinary || "-"}</span></p>
          {isTwoComplement === 0 && (
            <button onClick={() => setIsTwoComplement(1)}>
              Convert to Two's Complement
            </button>
          )}
          {isTwoComplement === 1 && (
            <button onClick={() => setIsTwoComplement(0)}>
              Convert to Binary
            </button>
          )}
        </div>
      )}
    </div>
  );
}
