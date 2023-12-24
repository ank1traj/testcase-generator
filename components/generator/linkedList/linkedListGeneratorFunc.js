import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { sendConfirmation } from "@/lib/api";

const LinkedListGeneratorFunc = () => {
  const [headValue, setHeadValue] = useState(0);
  const [listSize, setListSize] = useState(10);
  const [minValue, setMinValue] = useState(-100);
  const [maxValue, setMaxValue] = useState(100);
  const [numLists, setNumLists] = useState(1);
  const [generatedLists, setGeneratedLists] = useState([]);
  const [copied, setCopied] = useState(false);
  const [timeTaken, setTimeTaken] = useState(
    "Click the button to generate linked lists"
  );

  const [atStart, setAtStart] = useState(false);
  const [atEnd, setAtEnd] = useState(false);
  const [atMiddle, setAtMiddle] = useState(false);
  const [atRandom, setAtRandom] = useState(false);

  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState(0);
  const [middleValue, setMiddleValue] = useState(0);
  const [randomValue, setRandomValue] = useState(0);
  const [randomIndex, setRandomIndex] = useState(0);

  const [singleLinkedList, setSingleLinkedList] = useState(true);
  const [doublyLinkedList, setDoublyLinkedList] = useState(false);
  const [circularLinkedList, setCircularLinkedList] = useState(false);

  const [updateNode, setUpdateNode] = useState(false);
  const [addNode, setAddNode] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [advanceOptions, setAdvanceOptions] = useState(["Show Total List"]);

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
  const handleUpdateGenerateValues = async () => {
    setIsLoading(true); // set isLoading to true
    const errorOccurred = false; // add this flag variable
    try {
      await toast.promise(
        new Promise((resolve, reject) => {
          // add reject parameter to the promise
          setTimeout(() => {
            if (minValue > maxValue) {
              reject(
                new Error(
                  "The minimum value cannot be greater than the maximum value"
                )
              );
              return;
            }
            // Initialize an array to hold the generated linked lists
            const newGeneratedLists = [];

            const startTime = performance.now();

            // Generate the requested number of linked lists
            for (let i = 1; i <= numLists; i++) {
              // Initialize the head of the linked list with the given value
              let head = {
                value: atStart ? startValue : headValue,
                next: null,
              };

              // Generate additional nodes for the linked list
              let current = head;
              for (let j = 1; j < listSize; j++) {
                // Generate a random value within the specified range
                const value =
                  Math.floor(Math.random() * (maxValue - minValue + 1)) +
                  minValue;

                // Add the new node to the linked list
                current.next = { value, next: null };
                current = current.next;
              }

              // Update the value of the last node if atEnd is true
              if (atEnd) {
                current.value = endValue;
              }

              // Update the value of the middle node if atMiddle is true
              if (atMiddle) {
                let middleIndex = Math.floor(listSize / 2);
                current = head;
                for (let j = 0; j < middleIndex; j++) {
                  current = current.next;
                }
                current.value = middleValue;
              }

              // Update the value of a random node in the linked list
              if (atRandom) {
                // Generate a random index between 0 and the length of the linked list
                const index = randomIndex;

                // Iterate over the linked list to find the node at the random index
                let current = head;
                let currentIndex = 0;
                while (current && currentIndex !== index) {
                  current = current.next;
                  currentIndex++;
                }

                // Update the value of the node at the random index
                if (current) {
                  current.value = randomValue;
                }
              }

              // Add the completed linked list to the array of generated lists
              newGeneratedLists.push(head);
            }

            const endTime = performance.now();
            const timeDiff = endTime - startTime;
            const formattedTime =
              timeDiff < 1 ? "less than 1 ms" : `${timeDiff.toFixed(2)} ms`;
            setTimeTaken(formattedTime);
            // Update state with the concatenated string of all values
            console.log(newGeneratedLists);
            setGeneratedLists(newGeneratedLists);
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

  const handleAddGenerateValues = async () => {
    setIsLoading(true); // set isLoading to true
    const errorOccurred = false; // add this flag variable

    try {
      await toast.promise(
        new Promise((resolve, reject) => {
          // add reject parameter to the promise
          setTimeout(() => {
            if (minValue > maxValue) {
              reject(
                new Error(
                  "The minimum value cannot be greater than the maximum value"
                )
              );
              return;
            }
            // Initialize an array to hold the generated linked lists
            const newGeneratedLists = [];

            const startTime = performance.now();

            // Generate the requested number of linked lists
            for (let i = 0; i < numLists; i++) {
              // Initialize the head of the linked list with the given value
              let head = {
                value: atStart ? startValue : headValue,
                next: null,
              };

              // Generate additional nodes for the linked list
              let current = head;
              for (let j = 1; j < listSize; j++) {
                // Generate a random value within the specified range
                const value =
                  Math.floor(Math.random() * (maxValue - minValue + 1)) +
                  parseInt(minValue);

                // Add the new node to the linked list
                current.next = { value, next: null };
                current = current.next;
              }

              // Add the given value to the middle of the linked list
              if (atMiddle) {
                // Calculate the index of the middle element
                const middleIndex = Math.floor(listSize / 2);

                // Traverse the list to the middle element
                current = head;
                for (let j = 0; j < middleIndex; j++) {
                  current = current.next;
                }

                // Insert the new node after the middle element
                const newNode = { value: middleValue, next: current.next };
                current.next = newNode;
              }

              // Add the given value to the end of the linked list
              if (atEnd) {
                current.next = { value: endValue, next: null };
              }

              // Add the given value at a random index of the linked list
              if (atRandom) {
                // Generate a random index between 0 and the length of the linked list
                const index = randomIndex;

                // Iterate over the linked list to find the node at the random index
                let current = head;
                let previous = null;
                let currentIndex = 0;
                while (current && currentIndex !== index) {
                  previous = current;
                  current = current.next;
                  currentIndex++;
                }

                // Insert the new node at the random index
                const newNode = { value: randomValue, next: current };
                if (previous) {
                  previous.next = newNode;
                } else {
                  head = newNode;
                }
              }

              // Add the completed linked list to the array of generated lists
              newGeneratedLists.push(head);
            }

            const endTime = performance.now();
            const timeDiff = endTime - startTime;
            const formattedTime =
              timeDiff < 1 ? "less than 1 ms" : `${timeDiff.toFixed(2)} ms`;
            setTimeTaken(formattedTime);
            // Update state with the concatenated string of all values
            setGeneratedLists(newGeneratedLists);
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
    if (!generatedLists.length) {
      toast.error("Please generate values first");
      return;
    }

    setIsLoading(true);
    const totalLists = advanceOptions.includes("Show Total List")
      ? `${numLists}\n`
      : "";
    const listsString = generatedLists
      .map((list) => {
        const lengthString = advanceOptions.includes("Show List Size")
          ? `${listSize}\n`
          : "";
        return (
          totalLists +
          lengthString +
          (list
            ? (() => {
                let current = list;
                let result = "";
                while (current) {
                  result += current.value + " ";
                  current = current.next;
                }
                return result.trim();
              })()
            : "Empty List")
        );
      })
      .join("\n");

    navigator.clipboard.writeText(`${totalLists}\n${listsString}\n`);
    toast.promise(
      navigator.clipboard.writeText(listsString),
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
    if (!generatedLists.length) {
      toast.error("Please generate values first");
      return;
    }

    setIsLoading(true);
    const totalLists = advanceOptions.includes("Show Total List")
      ? `${numLists}\n`
      : "";
    const listsString = generatedLists
      .map((list) => {
        const lengthString = advanceOptions.includes("Show List Size")
          ? `${listSize}\n`
          : "";
        return (
          totalLists +
          lengthString +
          (list
            ? list.value +
              (list.next
                ? " " +
                  (() => {
                    let current = list.next;
                    let result = "";
                    while (current) {
                      result += current.value + " ";
                      current = current.next;
                    }
                    return result;
                  })()
                : "") +
              "\n"
            : "Empty List\n")
        );
      })
      .join("\n");

    const element = document.createElement("a");
    const file = new Blob([`${totalLists}${listsString}`], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "linked-lists.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
    toast.promise(new Promise((resolve) => setTimeout(() => resolve(), 500)), {
      pending: "Downloading values...",
      success: "Values downloaded!",
      error: "Failed to download values",
    });
    setIsLoading(false);
  };

  const handleResetValues = () => {
    setIsLoading(true);
    setHeadValue(0);
    setListSize(10);
    setMinValue(-100);
    setMaxValue(100);
    setNumLists(1);
    setGeneratedLists([]);
    setTimeTaken("Click the button to generate linked lists");
    setCopied(false);
    setAtStart(false);
    setAtEnd(false);
    setAtMiddle(false);
    setAtRandom(false);
    setStartValue(0);
    setEndValue(0);
    setMiddleValue(0);
    setRandomValue(0);
    setRandomIndex(0);
    setAddNode(false);
    setUpdateNode(false);
    toast.promise(new Promise((resolve) => setTimeout(() => resolve(), 500)), {
      pending: "Resetting values...",
      success: "Values reset successfully!",
      error: "Error resetting values",
    });
    setIsLoading(false);
    setAdvanceOptions(["Show Total List"]);
  };

  // when select circular linked list or doubly linked list show toast message
  useEffect(() => {
    if (circularLinkedList) {
      toast.error("Under Construction");
    }
    if (doublyLinkedList) {
      toast.error("Under Construction");
    }
  }, [circularLinkedList, doublyLinkedList]);

  useEffect(() => {
    if (addNode) {
      toast(
        "This will add a node and increase the size of the linked list by 1",
        {
          icon: "⛔",
        }
      );
    }
  }, [addNode]);

  useEffect(() => {
    if (updateNode) {
      toast(
        "This will update a node and keep the size of the linked list the same",
        {
          icon: "⛔",
        }
      );
    }
  }, [updateNode]);

  return {
    headValue,
    setHeadValue,
    listSize,
    setListSize,
    minValue,
    setMinValue,
    maxValue,
    setMaxValue,
    numLists,
    setNumLists,
    generatedLists,
    timeTaken,
    copied,
    atStart,
    setAtStart,
    atEnd,
    setAtEnd,
    atMiddle,
    setAtMiddle,
    atRandom,
    setAtRandom,
    startValue,
    setStartValue,
    endValue,
    setEndValue,
    middleValue,
    setMiddleValue,
    randomValue,
    setRandomValue,
    randomIndex,
    setRandomIndex,
    addNode,
    setAddNode,
    updateNode,
    setUpdateNode,
    advanceOptions,
    circularLinkedList,
    setCircularLinkedList,
    singleLinkedList,
    setSingleLinkedList,
    doublyLinkedList,
    setDoublyLinkedList,
    isLoading,
    handleAdvanceOptionChange,
    handleUpdateGenerateValues,
    handleAddGenerateValues,
    handleCopyValues,
    handleDownloadValues,
    handleResetValues,
  };
};

export default LinkedListGeneratorFunc;
