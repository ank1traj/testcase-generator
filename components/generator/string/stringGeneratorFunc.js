import { useState } from "react";
import { sendConfirmation } from "@/lib/api";
import toast from "react-hot-toast";
"use client";
import { useUser } from "@clerk/nextjs";

const StringGeneratorFunc = () => {
  const [stringLength, setStringLength] = useState(10);
  const [numStrings, setNumStrings] = useState(1);
  const [excludedChars, setExcludedChars] = useState("");
  const [includedChars, setIncludedChars] = useState("");
  const [generatedStrings, setGeneratedStrings] = useState([]);
  const [randomSize, setRandomSize] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timeTaken, setTimeTaken] = useState(
    "Click the button to generate values"
  );
  const [smallAlphabets, setSmallAlphabets] = useState(true);
  const [capitalAlphabets, setCapitalAlphabets] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [specialChars, setSpecialChars] = useState(false);

  const [increasing, setIncreasing] = useState(false); // for sorting in increasing order
  const [decreasing, setDecreasing] = useState(false); // for sorting in decreasing order
  const [random, setRandom] = useState(false); // for random order

  const [advanceOptions, setAdvanceOptions] = useState(["Hide Length"]);

  const [isLoading, setIsLoading] = useState(false);

  const handleAdvanceOptionChange = (event) => {
    const { value } = event.target;
    setAdvanceOptions(value);
  };

  const handleSortChange = (event) => {
    if (
      (event.target.value === "increasing" ||
        event.target.value === "decreasing" ||
        event.target.value === "random") &&
      numStrings === 1
    ) {
      toast.error("Please generate more than one string to perform sort");
      return;
    }
    switch (event.target.value) {
      case "increasing":
        setIncreasing(true);
        setDecreasing(false);
        setRandom(false);
        break;
      case "decreasing":
        setIncreasing(false);
        setDecreasing(true);
        setRandom(false);
        break;
      case "random":
        setIncreasing(false);
        setDecreasing(false);
        setRandom(true);
        break;
      default:
        setIncreasing(false);
        setDecreasing(false);
        setRandom(false);
        break;
    }
  };
  const { user } = useUser();
  let send=false;
  const generateMail= async(valuesString) =>{
    let email=user.primaryEmailAddress.emailAddress;
    if (send){
      const value={
        "email": email,
        "textcontent": valuesString,
        "filename": "generated_values.txt",
        "content":valuesString,
        "value":"Test Case Generated Successfully!!!"
      }
      try{
        await sendConfirmation(value);
      }
      catch(error){
        toast.error("Couldn't send mail!!");
      }
    }
    else{
      const value={
        "email": email,
        "value":"Couldn't generate testacases!!"
      }
      try{
        await sendConfirmation(value);
      }
      catch(error){
        toast.error("Couldn't send mail!!");
      }
    }
  }
  const handleGenerateStrings = async () => {
    setIsLoading(true); // set isLoading to true
    const errorOccurred = false; // add this flag variable
    let newStrings = [];
    try {
      await toast.promise(
        new Promise((resolve, reject) => {
          // add reject parameter to the promise
          setTimeout(() => {
            if (
              smallAlphabets === false &&
              capitalAlphabets === false &&
              numbers === false &&
              specialChars === false &&
              includedChars === ""
            ) {
              reject(
                new Error(
                  "Please select at least one character set from a-z or A-Z or special characters or numbers or included characters"
                )
              );
              return;
            }

            // Check if any character is included in both includeChars and excludedChars
            const commonChars = [
              ...new Set(
                [...includedChars].filter((char) =>
                  excludedChars.includes(char)
                )
              ),
            ];
            if (commonChars.length > 0) {
              reject(
                new Error(
                  `Please do not include the same characters (${commonChars.join(
                    ", "
                  )}) in both include and exclude fields.`
                )
              );
              return;
            }

            const startTime = performance.now();

            // Define the character sets to include in the generated strings
            let chars = "";
            if (smallAlphabets) chars += "abcdefghijklmnopqrstuvwxyz";
            if (capitalAlphabets) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            if (numbers) chars += "0123456789";
            if (specialChars) chars += '!@#$%^&*()_+-={}[]|:;"<>,.?/~`';
            // if (includedChars) chars += includedChars;

            // Exclude any characters specified by the user
            if (excludedChars) {
              excludedChars.split("").forEach((char) => {
                chars = chars.split(char).join("");
              });
            }

            
            for (let i = 0; i < numStrings; i++) {
              // Generate a random length for the current string
              const length =
                randomSize && stringLength > 1
                  ? Math.floor(Math.random() * (stringLength - 1)) + 1
                  : stringLength;

              // Generate the string using the selected character set and length
              let newString = "";

              const includeCharsPos = Math.floor(Math.random() * length);
              for (let j = 0; j < length; j++) {
                if (j === includeCharsPos) {
                  newString += includedChars;
                }
                const char = chars.charAt(
                  Math.floor(Math.random() * chars.length)
                );
                newString += char;
              }

              newStrings.push(newString);
            }

            if (advanceOptions.includes("distinct strings")) {
              newStrings = [...new Set(newStrings)];
            }
            if (advanceOptions.includes("distinct strings(case sensitive)")) {
              newStrings = Array.from(
                new Set(newStrings.map((s) => s.toLowerCase()))
              ).map((s) => newStrings.find((t) => s === t.toLowerCase()));
            }

            if (increasing) newStrings.sort((a, b) => a.localeCompare(b));
            if (decreasing) newStrings.sort((a, b) => b.localeCompare(a));
            if (random) newStrings.sort(() => Math.random() - 0.5);

            const endTime = performance.now();
            const timeDiff = endTime - startTime;
            const formattedTime =
              timeDiff < 1 ? "less than 1 ms" : `${timeDiff.toFixed(2)} ms`;

            setTimeTaken(formattedTime);
            setGeneratedStrings(newStrings);
            setCopied(false);
            resolve();
          }, 2000);
        }),
        {
          loading: "Generating values...",
          success: (success)=>{
            send=true;
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
    let valuesString = "";

    if (advanceOptions.includes("Hide Length")) {
      if (advanceOptions.includes("Hide Number of Strings")) {
        valuesString = newStrings.join(", ");
      } else {
        valuesString = `${numStrings}\n${newStrings.join("\n")}`;
      }
    } else if (advanceOptions.includes("Hide Number of Strings")) {
      valuesString = newStrings
        .map((str) => `${str.length}\n${str}`)
        .join("\n");
    } else {
      valuesString = `${numStrings}\n${newStrings
        .map((str) => `${str.length}\n${str}`)
        .join("\n")}`;
    }
    setIsLoading(false); // set isLoading to false
    await generateMail(valuesString);
  };

  const handleCopyStrings = () => {
    if (!generatedStrings.length) {
      toast.error("Please generate values first");
      return;
    }

    setIsLoading(true); // set isLoading to true

    let valuesString = "";
    let totalCases = 0;

    if (advanceOptions.includes("Hide Length")) {
      valuesString = generatedStrings.join("\n");
      if (!advanceOptions.includes("Hide Number of Strings")) {
        totalCases = numStrings;
        valuesString = `${totalCases}\n${valuesString}`;
      }
    } else if (advanceOptions.includes("Hide Number of Strings")) {
      valuesString = generatedStrings
        .map((str) => `${str.length}\n${str}`)
        .join("\n");
    } else {
      totalCases = numStrings;
      valuesString = generatedStrings
        .map((str) => `${str.length}\n${str},`)
        .join("\n");
      valuesString = `${totalCases}\n${valuesString}`;
    }

    navigator.clipboard.writeText(valuesString);
    toast.promise(
      navigator.clipboard.writeText(valuesString),
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
    setIsLoading(false); // set isLoading to false
  };

  const handleDownloadValues = () => {
    if (!generatedStrings.length) {
      toast.error("Please generate values first");
      return;
    }

    setIsLoading(true); // set isLoading to true

    let valuesString = "";

    if (advanceOptions.includes("Hide Length")) {
      if (advanceOptions.includes("Hide Number of Strings")) {
        valuesString = generatedStrings.join(", ");
      } else {
        valuesString = `${numStrings}\n${generatedStrings.join("\n")}`;
      }
    } else if (advanceOptions.includes("Hide Number of Strings")) {
      valuesString = generatedStrings
        .map((str) => `${str.length}\n${str}`)
        .join("\n");
    } else {
      valuesString = `${numStrings}\n${generatedStrings
        .map((str) => `${str.length}\n${str}`)
        .join("\n")}`;
    }

    const element = document.createElement("a");
    const file = new Blob([valuesString], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "generated_values.txt";
    element.click();
    toast.promise(new Promise((resolve) => setTimeout(() => resolve(), 500)), {
      pending: "Downloading values...",
      success: "Values downloaded!",
      error: "Failed to download values",
    });
    setIsLoading(false); // set isLoading to false
  };

  const handleResetValues = () => {
    setIsLoading(true); // set isLoading to true
    setStringLength(10);
    setNumStrings(1);
    setExcludedChars("");
    setIncludedChars("");
    setGeneratedStrings([]);
    setCopied(false);
    setTimeTaken(null);
    setSmallAlphabets(true);
    setCapitalAlphabets(false);
    setNumbers(false);
    setSpecialChars(false);
    setRandomSize(false);
    setAdvanceOptions(["Hide Length"]);
    toast.promise(new Promise((resolve) => setTimeout(() => resolve(), 500)), {
      pending: "Resetting values...",
      success: "Values reset successfully!",
      error: "Error resetting values",
    });
    setIsLoading(false); // set isLoading to false
  };

  return {
    stringLength,
    setStringLength,
    numStrings,
    setNumStrings,
    excludedChars,
    setExcludedChars,
    includedChars,
    setIncludedChars,
    generatedStrings,
    copied,
    timeTaken,
    smallAlphabets,
    setSmallAlphabets,
    capitalAlphabets,
    setCapitalAlphabets,
    numbers,
    setNumbers,
    specialChars,
    setSpecialChars,
    randomSize,
    setRandomSize,
    advanceOptions,
    isLoading,
    handleGenerateStrings,
    handleCopyStrings,
    handleDownloadValues,
    handleResetValues,
    handleAdvanceOptionChange,
    increasing,
    decreasing,
    random,
    handleSortChange,
  };
};

export default StringGeneratorFunc;
