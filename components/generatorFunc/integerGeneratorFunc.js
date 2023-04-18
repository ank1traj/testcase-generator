import { useState } from "react";
import toast from "react-hot-toast";

const IntegerGeneratorFunc = () => {
  const [min, setMin] = useState(-100);
  const [max, setMax] = useState(100);
  const [numValues, setNumValues] = useState(10);
  const [generatedValues, setGeneratedValues] = useState([]);
  const [copied, setCopied] = useState(false);
  const [timeTaken, setTimeTaken] = useState(
    "Click the button to generate values"
  );

  const [advanceOptions, setAdvanceOptions] = useState(["Show Total Cases"]);

  const [isLoading, setIsLoading] = useState(false);

  const handleAdvanceOptionChange = (event) => {
    const { value } = event.target;
    setAdvanceOptions(value);
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
            if (min > max) {
              reject(
                new Error("Minimum value cannot be greater than maximum value")
              );
              return;
            }
            const newValues = Array.from(
              { length: numValues },
              () =>
                Math.floor(
                  Math.random() * (parseInt(max) - parseInt(min) + 1)
                ) + parseInt(min)
            );
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
      ? `${numValues}\n`
      : "";

    const valuesString = `${totalCases}${generatedValues.join("\n")}`;

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
    setIsLoading(false);
  };

  const handleDownloadValues = async () => {
    if (!generatedValues.length) {
      toast.error("Please generate values first");
      return;
    }

    setIsLoading(true);
    const totalCases = advanceOptions.includes("Show Total Cases")
      ? `${numValues}\n`
      : "";
    const valuesString = `${totalCases}${generatedValues.join("\n")}`;

    try {
      const element = document.createElement("a");
      const file = new Blob([valuesString], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = "generated_values.txt";
      document.body.appendChild(element);
      element.click();
      toast.success("Values downloaded!");
    } catch (error) {
      toast.error("Failed to download values");
    }

    setIsLoading(false);
  };

  const handleResetValues = () => {
    setIsLoading(true);
    setGeneratedValues([]);
    setCopied(false);
    setTimeTaken(null);
    setAdvanceOptions(["Show Total Cases"]);
    toast
      .promise(new Promise((resolve) => setTimeout(() => resolve(), 500)), {
        pending: "Resetting values...",
        success: "Values reset successfully!",
        error: "Error resetting values",
      })
      .finally(() => {
        setIsLoading(false);
        setMin(-100);
        setMax(100);
        setNumValues(10);
      });
  };

  return {
    min,
    setMin,
    max,
    setMax,
    numValues,
    setNumValues,
    generatedValues,
    copied,
    timeTaken,
    isLoading,
    handleGenerateValues,
    handleCopyValues,
    handleDownloadValues,
    handleResetValues,
    advanceOptions,
    handleAdvanceOptionChange,
  };
};

export default IntegerGeneratorFunc;
