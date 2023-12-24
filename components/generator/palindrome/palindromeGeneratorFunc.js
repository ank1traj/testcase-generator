import { useState } from "react";
import { sendConfirmation } from "@/lib/api";
import toast from "react-hot-toast";

const PalindromeGeneratorFunc = () => {
  const [length, setLength] = useState(2);
  const [numPalindromes, setNumPalindromes] = useState(1);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(99);
  const [generatedValues, setGeneratedValues] = useState([]);
  const [copied, setCopied] = useState(false);
  const [timeTaken, setTimeTaken] = useState(
    "Click the button to generate values"
  );

  const [stringPalindrome, setStringPalindrome] = useState(true);
  const [arrayPalindrome, setArrayPalindrome] = useState(false);

  const [advanceOptions, setAdvanceOptions] = useState(["Show Total Cases"]);

  const [isLoading, setIsLoading] = useState(false);

  // Define options for string type
  const stringOptions = [
    { value: "lowercase", label: "a-z" },
    { value: "uppercase", label: "A-Z" },
    { value: "numbers", label: "0-9" },
  ];

  // Define state for selected options
  const [selectedOptions, setSelectedOptions] = useState(["lowercase"]);

  // Define function to handle checkbox changes
  const handleOptionChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleAdvanceOptionChange = (event) => {
    const { value } = event.target;
    setAdvanceOptions(value);
  };
  let Success=false;
  const Generate= async() =>{
    if (Success){
      let value={"value":"Test Case Generated Successfully!!!"}
      try{
        await sendConfirmation(value);
      }
      catch(error){
      }
    }
    else{
      let value={"value":"Some Error Occured!!!"}
      try{
        await sendConfirmation(value);
      }
      catch(error){
        console.log("ERROR")
      }
    }
  }
  const handleGenerateValues = async () => {
    setIsLoading(true); // set isLoading to true
    const errorOccurred = false; // add this flag variable

    try {
      await toast.promise(
        new Promise((resolve, reject) => {
          // add reject parameter to the promise
          setTimeout(() => {
            const values = [];

            const startTime = performance.now();

            if (stringPalindrome) {
              const allowedChars =
                selectedOptions.length > 0
                  ? selectedOptions
                      .map((option) => {
                        switch (option) {
                          case "lowercase":
                            return "abcdefghijklmnopqrstuvwxyz";
                          case "uppercase":
                            return "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                          case "numbers":
                            return "0123456789";
                          default:
                            return "";
                        }
                      })
                      .join("")
                  : "";
              if (
                allowedChars === "" ||
                isNaN(length) ||
                isNaN(numPalindromes) ||
                length < 2
              ) {
                setGeneratedValues([]);
                if (allowedChars === "") {
                  reject(
                    new Error("Please select at least one character type")
                  );
                } else if (isNaN(length)) {
                  reject(new Error("Please enter a valid palindrome length"));
                } else if (length < 2) {
                  reject(new Error("Palindrome length must be at least 2"));
                } else if (isNaN(numPalindromes)) {
                  reject(
                    new Error(
                      "Please enter a valid number of palindromes to generate"
                    )
                  );
                }
                return;
              }
              if (
                selectedOptions.includes("numbers") &&
                selectedOptions.includes("uppercase") &&
                length === 2
              ) {
                setLength(3);
                reject(
                  new Error(
                    "Cannot generate palindromes of length 2 with selected options"
                  )
                );
                return;
              }

              if (
                selectedOptions.includes("numbers") &&
                selectedOptions.includes("lowercase") &&
                length === 2
              ) {
                setLength(3);
                reject(
                  new Error(
                    "Cannot generate palindromes of length 2 with selected options"
                  )
                );
                return;
              }

              if (
                selectedOptions.includes("uppercase") &&
                selectedOptions.includes("lowercase") &&
                length === 2
              ) {
                setLength(3);
                reject(
                  new Error(
                    "Cannot generate palindromes of length 2 with selected options"
                  )
                );
                return;
              }

              if (
                selectedOptions.includes("numbers") &&
                selectedOptions.includes("uppercase") &&
                selectedOptions.includes("lowercase") &&
                length === 3
              ) {
                setLength(4);
                reject(
                  new Error(
                    "Cannot generate palindromes of length 3 with selected options"
                  )
                );
                return;
              }

              for (let i = 0; i < numPalindromes; i++) {
                let palindrome = "";
                const numChars =
                  length % 2 === 0 ? length / 2 : (length - 1) / 2 + 1;
                for (let j = 0; j < numChars; j++) {
                  const char =
                    allowedChars[
                      Math.floor(Math.random() * allowedChars.length)
                    ];
                  palindrome += char;
                }
                palindrome += [...palindrome]
                  .reverse()
                  .join("")
                  .substr(length % 2 === 0 ? 0 : 1);
                values.push(palindrome);
              }
            } else if (arrayPalindrome) {
              if (length !== ("" + max).length) {
                reject(
                  new Error(
                    `The length of the array must be equal to the number of digits in the maximum value. Here the length is ${length} and the number of digits in the maximum value is ${
                      ("" + max).length
                    }.`
                  )
                );
                return;
              } else if (length === 1 && min > 9) {
                reject(
                  new Error(
                    "It's impossible to create palindromes with length 1 and a minimum value greater than 9."
                  )
                );
                return;
              } else if (min >= max) {
                reject(
                  new Error(
                    "The minimum value must be less than the maximum value."
                  )
                );
                return;
              } else if (min >= 10 ** length || max < 10 ** (length - 1)) {
                reject(
                  new Error(
                    `It's impossible to create palindromes with length ${length}, minimum value ${min}, and maximum value ${max}.`
                  )
                );
                return;
              } else {
                while (values.length < numPalindromes) {
                  let palindromeArr = [];
                  const numDigits = arrayPalindrome
                    ? length / 2
                    : Math.floor(length / 2) + 1;

                  for (let j = 0; j < numDigits; j++) {
                    const minDigit = j === 0 && min === 0 ? 1 : 0;
                    const maxDigit =
                      j === numDigits - 1 && !arrayPalindrome ? 9 : 10;
                    const digit = Math.floor(
                      Math.random() * (maxDigit - minDigit) + minDigit
                    );
                    palindromeArr.push(digit);
                  }

                  const secondHalf = palindromeArr
                    .slice(0, Math.floor(length / 2))
                    .reverse();
                  palindromeArr = [...palindromeArr, ...secondHalf];

                  const num = parseInt(palindromeArr.join(""));
                  if (num >= min && num <= max) {
                    values.push(palindromeArr);
                  }
                }
              }
            }
            const endTime = performance.now();
            const timeDiff = endTime - startTime;
            const formattedTime =
              timeDiff < 1 ? "less than 1 ms" : `${timeDiff.toFixed(2)} ms`;

            setTimeTaken(formattedTime);
            setGeneratedValues(values);
            resolve();
          }, 2000);
        }),
        {
          loading: "Generating values...",
          success: (success)=>{
            Success=true;
            return "Values generated successfully and mail sent!";
          },
          error: (error) => {
            if (errorOccurred) {
              // show toast error if flag variable is true
              return error.message;
            } else {
              return "An error occurred while generating values";
            }
          },
        }
      );
    } catch (error) {
      toast.error(error.message);
    }
    setIsLoading(false); // set isLoading to false
    await Generate();
  };

  const handleCopyValues = () => {
    if (!generatedValues.length) {
      toast.error("Please generate values first");
      return;
    }

    setIsLoading(true);

    let values = "";

    if (
      advanceOptions.includes("Show Length") &&
      advanceOptions.includes("Show Total Cases")
    ) {
      values += `${generatedValues.length}\n`;
      values += generatedValues
        .map((value) => {
          return `${value.length}\n${
            arrayPalindrome ? value.join("") : value
          }\n`;
        })
        .join("");
    } else if (advanceOptions.includes("Show Length")) {
      values = generatedValues
        .map((value) => {
          return `${value.length}\n${
            arrayPalindrome ? value.join("") : value
          }\n`;
        })
        .join("");
    } else if (advanceOptions.includes("Show Total Cases")) {
      values = `${generatedValues.length}\n`;
      values += generatedValues
        .map((value) => {
          return `${arrayPalindrome ? value.join("") : value}\n`;
        })
        .join("");
    } else {
      values = generatedValues
        .map((value) => {
          return `${arrayPalindrome ? value.join("") : value}\n`;
        })
        .join("");
    }

    navigator.clipboard.writeText(values);
    toast.promise(
      navigator.clipboard.writeText(values),
      {
        loading: "Copying values...",
        success: "Values copied!",
        error: "Failed to copy values",
      },
      {
        style: {
          minWidth: "250px",
        },
      }
    );

    setCopied(true);
    setIsLoading(false);
  };

  const handleDownloadValues = () => {
    if (!generatedValues.length) {
      toast.error("Please generate values first");
      return;
    }

    setIsLoading(true);

    let values = "";

    if (
      advanceOptions.includes("Show Length") &&
      advanceOptions.includes("Show Total Cases")
    ) {
      values += `${generatedValues.length}\n`;
      values += generatedValues
        .map(
          (value) =>
            `${value.length}\n${arrayPalindrome ? value.join("") : value}\n`
        )
        .join("");
    } else if (advanceOptions.includes("Show Length")) {
      values = generatedValues
        .map(
          (value) =>
            `${value.length}\n${arrayPalindrome ? value.join("") : value}\n`
        )
        .join("");
    } else if (advanceOptions.includes("Show Total Cases")) {
      values += `${generatedValues.length}\n`;
      values += generatedValues
        .map((value) => `${arrayPalindrome ? value.join("") : value}\n`)
        .join("");
    } else {
      values = generatedValues
        .map((value) => `${arrayPalindrome ? value.join("") : value}\n`)
        .join("");
    }

    const element = document.createElement("a");
    const file = new Blob([values], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "palindromes.txt";
    document.body.appendChild(element);
    element.click();
    toast.promise(new Promise((resolve) => setTimeout(() => resolve(), 500)), {
      pending: "Downloading values...",
      success: "Values downloaded!",
      error: "Failed to download values",
    });
    setIsLoading(false);
  };

  const handleResetValues = () => {
    setIsLoading(true);
    setLength(2);
    setNumPalindromes(1);
    setMin(0);
    setMax(99);
    setGeneratedValues([]);
    setCopied(false);
    setSelectedOptions(["lowercase"]);
    setStringPalindrome(true);
    setArrayPalindrome(false);
    setAdvanceOptions(["Show Total Cases"]);
    toast.promise(new Promise((resolve) => setTimeout(() => resolve(), 500)), {
      pending: "Resetting values...",
      success: "Values reset successfully!",
      error: "Error resetting values",
    });
    setIsLoading(false);
  };

  return {
    length,
    setLength,
    numPalindromes,
    setNumPalindromes,
    min,
    setMin,
    max,
    setMax,
    generatedValues,
    copied,
    selectedOptions,
    stringPalindrome,
    setStringPalindrome,
    arrayPalindrome,
    setArrayPalindrome,
    advanceOptions,
    timeTaken,
    isLoading,
    handleGenerateValues,
    handleCopyValues,
    handleDownloadValues,
    handleResetValues,
    handleAdvanceOptionChange,
    stringOptions,
    handleOptionChange,
  };
};

export default PalindromeGeneratorFunc;
