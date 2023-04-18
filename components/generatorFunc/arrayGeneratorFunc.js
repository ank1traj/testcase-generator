import { useState } from "react";
import toast from "react-hot-toast";

const ArrayGeneratorFunc = () => {
  const [minValue, setMinValue] = useState(-100);
  const [maxValue, setMaxValue] = useState(100);
  const [arraySize, setArraySize] = useState(10);
  const [numArrays, setNumArrays] = useState(1);
  const [generatedValues, setGeneratedValues] = useState([]);
  const [isFloat, setIsFloat] = useState(false);
  const [randomSize, setRandomSize] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timeTaken, setTimeTaken] = useState(
    "Click the button to generate values"
  );

  const [any, setAny] = useState(true);
  const [odd, setOdd] = useState(false);
  const [even, setEven] = useState(false);
  const [prime, setPrime] = useState(false);
  const [selectedOption, setSelectedOption] = useState("any");

  const [increasing, setIncreasing] = useState(false); // for sorting in increasing order
  const [decreasing, setDecreasing] = useState(false); // for sorting in decreasing order
  const [random, setRandom] = useState(true); // for random order

  const [advanceOptions, setAdvanceOptions] = useState(["Show Total Cases"]);

  const [isLoading, setIsLoading] = useState(false);

  const handleAdvanceOptionChange = (event) => {
    const { value } = event.target;
    setAdvanceOptions(value);
  };

  const handleSortChange = (event) => {
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

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    switch (event.target.value) {
      case "even":
        setEven(true);
        setOdd(false);
        setPrime(false);
        setAny(false);
        break;
      case "odd":
        setEven(false);
        setOdd(true);
        setPrime(false);
        setAny(false);
        break;
      case "prime":
        setEven(false);
        setOdd(false);
        setPrime(true);
        setAny(false);
        break;
      default:
        setEven(false);
        setOdd(false);
        setPrime(false);
        setAny(true);
        break;
    }
  };

  const handleGenerateValues = async () => {
    setIsLoading(true); // set isLoading to true
    const errorOccurred = false; // add this flag variable

    try {
      await toast.promise(
        new Promise((resolve, reject) => {
          // add reject parameter to the promise
          setTimeout(() => {
            const startTime = performance.now();
            let newValues = Array.from({ length: numArrays }, (_, index) => {
              const size = randomSize
                ? Math.floor(Math.random() * arraySize) + 1
                : arraySize;
              return Array.from({ length: size }, () => {
                if (odd) {
                  let num = Math.floor(
                    Math.random() * (maxValue - minValue + 1)
                  );
                  if (num % 2 === 0) {
                    num += 1;
                  }
                  return num + parseInt(minValue);
                } else if (even) {
                  let num = Math.floor(
                    Math.random() * (maxValue - minValue + 1)
                  );
                  if (num % 2 !== 0) {
                    num += 1;
                  }
                  return num + parseInt(minValue);
                } else if (prime) {
                  let num = 0;
                  while (true) {
                    num =
                      2 *
                        Math.floor(
                          Math.random() * ((maxValue - minValue + 1) / 2)
                        ) +
                      parseInt(minValue) +
                      1;
                    let isPrime = true;
                    for (let i = 2; i <= Math.sqrt(num); i++) {
                      if (num % i === 0) {
                        isPrime = false;
                        break;
                      }
                    }
                    if (isPrime) {
                      break;
                    }
                  }
                  return num;
                } else if (isFloat) {
                  return (
                    Math.random() * (maxValue - minValue) +
                    minValue
                  ).toFixed(2);
                } else {
                  return (
                    Math.floor(Math.random() * (maxValue - minValue + 1)) +
                    parseInt(minValue)
                  );
                }
              });
            });

            if (advanceOptions.includes("Negative Outputs")) {
              newValues = newValues.map((array) => {
                array.forEach((element, index) => {
                  if (element > 0) {
                    array[index] = -element;
                  }
                });
                return array;
              });
            }

            if (advanceOptions.includes("Distinct Elements") && randomSize) {
              newValues = newValues.map((array) => {
                const set = new Set(array);
                return Array.from(set);
              });
            } else if (advanceOptions.includes("Distinct Elements")) {
              reject(
                new Error(
                  "Distinct Elements option is only available for random size"
                )
              ); // reject the promise with an error
            }

            if (increasing) {
              newValues = newValues.map((array) => array.sort((a, b) => a - b));
            } else if (decreasing) {
              newValues = newValues.map((array) => array.sort((a, b) => b - a));
            } else if (random) {
              newValues = newValues.map((array) => {
                for (let i = array.length - 1; i > 0; i--) {
                  const j = Math.floor(Math.random() * (i + 1));
                  [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
              });
            }

            const endTime = performance.now();
            const timeDiff = endTime - startTime;
            const formattedTime =
              timeDiff < 1 ? "less than 1 ms" : `${timeDiff.toFixed(2)} ms`;
            setTimeTaken(formattedTime);
            setGeneratedValues(newValues);
            setCopied(false);
            resolve();
          }, 2000);
        }),
        {
          loading: "Generating values...",
          success: "Values generated successfully!",
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
  };

  const handleCopyValues = () => {
    if (!generatedValues.length) {
      toast.error("Please generate values first");
      return;
    }

    setIsLoading(true);
    const totalCases = advanceOptions.includes("Show Total Cases")
      ? `${numArrays}\n`
      : "";
    const valuesString = generatedValues
      .map((array) => {
        const lengthString = advanceOptions.includes("Hide Array Size")
          ? ""
          : `${array.length}\n`;
        return totalCases + lengthString + array.join(", ");
      })
      .join("\n");

    navigator.clipboard.writeText(`${totalCases}\n${valuesString}\n`);
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
    setIsLoading(false);
  };

  const handleDownloadValues = () => {
    if (!generatedValues.length) {
      toast.error("Please generate values first");
      return;
    }

    setIsLoading(true);

    let valuesString = "";
    let totalCases = 0;
    if (
      advanceOptions.includes("Show Total Cases") &&
      advanceOptions.includes("Hide Array Size")
    ) {
      totalCases = numArrays;
      valuesString = `${totalCases} \n` + generatedValues.maIntegerild(element);
      toast.promise(
        new Promise((resolve) => setTimeout(() => resolve(), 500)),
        {
          pending: "Downloading values...",
          success: "Values downloaded!",
          error: "Failed to download values",
        }
      );
      setIsLoading(false);
    }
  };

  const handleResetValues = () => {
    setIsLoading(true);
    setMinValue(-100);
    setMaxValue(100);
    setArraySize(10);
    setNumArrays(1);
    setGeneratedValues([]);
    setCopied(false);
    setTimeTaken(null);
    setIsFloat(false);
    setRandomSize(false);
    setAdvanceOptions(["Show Total Cases"]);
    toast.promise(new Promise((resolve) => setTimeout(() => resolve(), 500)), {
      pending: "Resetting values...",
      success: "Values reset successfully!",
      error: "Error resetting values",
    });
    setIsLoading(false);
  };

  return {
    minValue,
    setMinValue,
    maxValue,
    setMaxValue,
    arraySize,
    setArraySize,
    numArrays,
    setNumArrays,
    generatedValues,
    copied,
    timeTaken,
    isFloat,
    setIsFloat,
    randomSize,
    setRandomSize,
    advanceOptions,
    isLoading,
    handleGenerateValues,
    handleCopyValues,
    handleDownloadValues,
    handleResetValues,
    handleAdvanceOptionChange,
    handleSortChange,
    handleOptionChange,
    any,
    odd,
    even,
    prime,
    increasing,
    decreasing,
    random,
  };
};

export default ArrayGeneratorFunc;
