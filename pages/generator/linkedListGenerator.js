import { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Typography,
  Tooltip,
  FormControlLabel,
  Checkbox,
  Radio,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import RefreshIcon from "@mui/icons-material/Refresh";
import GenerateIcon from "@mui/icons-material/PlayArrow";
import DownloadIcon from "@mui/icons-material/GetApp";
import { styled } from "@mui/material/styles";

import toast, { Toaster } from "react-hot-toast";

const StyledCard = styled(Card)(({ theme }) => ({
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  borderRadius: "12px",
  width: "100%",
  height: "100%",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  textAlign: "center",
  color: "#fff",
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
  height: "100vh",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontWeight: "bold",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& label": {
    color: "#fff",
    fontWeight: "bold",
  },
  "& input": {
    color: "#fff",
    fontWeight: "bold",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "#fff",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: "#fff",
  color: "#FF8E53",
  fontWeight: "bold",
  "&:hover": {
    background: "#FF8E53",
    color: "#fff",
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: "300px",
  "& .MuiSelect-select": {
    paddingRight: theme.spacing(4),
  },
  "& .MuiSelect-icon": {
    right: 0,
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  "&.MuiSelect-select": {
    paddingRight: theme.spacing(2),
    "&:focus": {
      backgroundColor: "transparent",
    },
  },
  "& .MuiSelect-icon": {
    color: theme.palette.secondary.main,
  },
}));

const options = ["Show Total List", "Show List Size"];

const GenerateLinkedList = () => {
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

  return (
    <>
      <StyledGrid container>
        <Toaster />
        <Grid item xs={12} sm={8} md={8} sx={{ margin: "auto" }}>
          <StyledCard>
            <StyledCardHeader title="Linked List Generator" />
            <StyledCardContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Tooltip title="Enter the value of the head node.">
                    <StyledTextField
                      label="Head Value"
                      type="number"
                      value={headValue}
                      onChange={(e) => setHeadValue(parseInt(e.target.value))}
                      disabled={atStart}
                      fullWidth
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={6}>
                  <Tooltip title="Enter the number of nodes in the linked list.">
                    <StyledTextField
                      label="List Size"
                      type="number"
                      value={listSize}
                      onChange={(e) => setListSize(parseInt(e.target.value))}
                      fullWidth
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={6}>
                  <Tooltip title="Enter the minimum value of the nodes in the linked list.">
                    <StyledTextField
                      label="Min Value"
                      type="number"
                      value={minValue}
                      onChange={(e) => setMinValue(parseInt(e.target.value))}
                      fullWidth
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={6}>
                  <Tooltip title="Enter the maximum value of the nodes in the linked list.">
                    <StyledTextField
                      label="Max Value"
                      type="number"
                      value={maxValue}
                      onChange={(e) => setMaxValue(parseInt(e.target.value))}
                      fullWidth
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={6}>
                  <Tooltip title="Enter the number of linked lists to generate.">
                    <StyledTextField
                      label="Number of Lists"
                      type="number"
                      value={numLists}
                      onChange={(e) => setNumLists(parseInt(e.target.value))}
                      fullWidth
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={4}>
                  <Tooltip title="Advanced options">
                    <StyledFormControl>
                      <InputLabel>Advanced Options</InputLabel>
                      <StyledSelect
                        value={advanceOptions}
                        onChange={handleAdvanceOptionChange}
                        multiple
                      >
                        {options.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </StyledSelect>
                    </StyledFormControl>
                  </Tooltip>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
                <Grid item xs={2}>
                  <Tooltip title="Click to select the single linked list.">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={singleLinkedList}
                          onChange={(e) => {
                            setSingleLinkedList(e.target.checked);
                            setDoublyLinkedList(false);
                            setCircularLinkedList(false);
                          }}
                          color="primary"
                        />
                      }
                      label="Single"
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={2}>
                  <Tooltip title="Click to select the doubly linked list.">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={doublyLinkedList}
                          onChange={(e) => {
                            setDoublyLinkedList(e.target.checked);
                            setSingleLinkedList(false);
                            setCircularLinkedList(false);
                          }}
                          color="primary"
                        />
                      }
                      label="Doubly"
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={2}>
                  <Tooltip title="Click to select the circular linked list.">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={circularLinkedList}
                          onChange={(e) => {
                            setCircularLinkedList(e.target.checked);
                            setSingleLinkedList(false);
                            setDoublyLinkedList(false);
                          }}
                          color="primary"
                        />
                      }
                      label="Circular"
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={2}>
                  <Tooltip title="Click to select to update node">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={updateNode}
                          onChange={(e) => {
                            setUpdateNode(e.target.checked);
                            setAddNode(false);
                          }}
                          color="primary"
                        />
                      }
                      label="Update"
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={2}>
                  <Tooltip title="Click to select to add node">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={addNode}
                          onChange={(e) => {
                            setAddNode(e.target.checked);
                            setUpdateNode(false);
                          }}
                          color="primary"
                        />
                      }
                      label="Add"
                    />
                  </Tooltip>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
                <Grid item xs={2}>
                  <Tooltip title="Click to add the node at the start of the linked list.">
                    <FormControlLabel
                      control={
                        <Radio
                          checked={atStart}
                          onChange={() => {
                            setAtStart(true);
                            setAtEnd(false);
                            setAtMiddle(false);
                            setAtRandom(false);
                          }}
                          disabled={!(addNode || updateNode)}
                          name="atStart"
                          color="primary"
                        />
                      }
                      label="Start"
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={2}>
                  <Tooltip title="Click to add the node at the end of the linked list.">
                    <FormControlLabel
                      control={
                        <Radio
                          checked={atEnd}
                          onChange={() => {
                            setAtStart(false);
                            setAtEnd(true);
                            setAtMiddle(false);
                            setAtRandom(false);
                          }}
                          disabled={!(addNode || updateNode)}
                          name="atEnd"
                          color="primary"
                        />
                      }
                      label="End"
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={2}>
                  <Tooltip title="Click to add the node at the middle of the linked list.">
                    <FormControlLabel
                      control={
                        <Radio
                          checked={atMiddle}
                          onChange={() => {
                            setAtStart(false);
                            setAtEnd(false);
                            setAtMiddle(true);
                            setAtRandom(false);
                          }}
                          disabled={!(addNode || updateNode)}
                          name="atMiddle"
                          color="primary"
                        />
                      }
                      label="Middle"
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={2}>
                  <Tooltip title="Click to add the node at a random position in the linked list.">
                    <FormControlLabel
                      control={
                        <Radio
                          checked={atRandom}
                          onChange={() => {
                            setAtStart(false);
                            setAtEnd(false);
                            setAtMiddle(false);
                            setAtRandom(true);
                          }}
                          disabled={!(addNode || updateNode)}
                          name="atRandom"
                          color="primary"
                        />
                      }
                      label="Random"
                    />
                  </Tooltip>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
                {atStart ? (
                  <Grid item xs={6}>
                    <Tooltip title="Enter the value of the node to be added at the start of the linked list.">
                      <StyledTextField
                        label="Node Value"
                        type="number"
                        value={startValue}
                        onChange={(e) =>
                          setStartValue(parseInt(e.target.value))
                        }
                        fullWidth
                      />
                    </Tooltip>
                  </Grid>
                ) : null}
                {atEnd ? (
                  <Grid item xs={6}>
                    <Tooltip title="Enter the value of the node to be added at the end of the linked list.">
                      <StyledTextField
                        label="Node Value"
                        type="number"
                        value={endValue}
                        onChange={(e) => setEndValue(parseInt(e.target.value))}
                        fullWidth
                      />
                    </Tooltip>
                  </Grid>
                ) : null}
                {atMiddle ? (
                  <Grid item xs={6}>
                    <Tooltip title="Enter the value of the node to be added at the middle of the linked list.">
                      <StyledTextField
                        label="Node Value"
                        type="number"
                        value={middleValue}
                        onChange={(e) =>
                          setMiddleValue(parseInt(e.target.value))
                        }
                        fullWidth
                      />
                    </Tooltip>
                  </Grid>
                ) : null}
                {atRandom ? (
                  <>
                    <Grid item xs={6}>
                      <Tooltip title="Enter the value of the node to be added at a random position in the linked list.">
                        <StyledTextField
                          label="Node Value"
                          type="number"
                          value={randomValue}
                          onChange={(e) =>
                            setRandomValue(parseInt(e.target.value))
                          }
                          fullWidth
                        />
                      </Tooltip>
                    </Grid>
                    <Grid item xs={6}>
                      <Tooltip title="Enter the position at which the node is to be added in the linked list.">
                        <StyledTextField
                          label="Node Position"
                          type="number"
                          value={randomIndex}
                          onChange={(e) =>
                            setRandomIndex(parseInt(e.target.value))
                          }
                          fullWidth
                        />
                      </Tooltip>
                    </Grid>
                  </>
                ) : null}
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
                <Grid item xs={12}>
                  <StyledButton
                    variant="contained"
                    fullWidth
                    startIcon={<GenerateIcon />}
                    onClick={
                      addNode
                        ? handleAddGenerateValues
                        : handleUpdateGenerateValues
                    }
                    disabled={
                      isLoading || doublyLinkedList || circularLinkedList
                    }
                  >
                    Generate Linked Lists
                  </StyledButton>
                </Grid>
                <Grid item xs={6}>
                  <CopyToClipboard onCopy={handleCopyValues}>
                    <StyledButton
                      variant="contained"
                      fullWidth
                      startIcon={<FileCopyIcon />}
                      disabled={
                        isLoading || doublyLinkedList || circularLinkedList
                      }
                    >
                      {copied ? "Copied" : "Copy to clipboard"}
                    </StyledButton>
                  </CopyToClipboard>
                </Grid>
                <Grid item xs={6}>
                  <StyledButton
                    variant="contained"
                    fullWidth
                    startIcon={<RefreshIcon />}
                    onClick={handleResetValues}
                    disabled={
                      isLoading || doublyLinkedList || circularLinkedList
                    }
                  >
                    Reset
                  </StyledButton>
                </Grid>
                <Grid item xs={12}>
                  <StyledButton
                    variant="contained"
                    fullWidth
                    startIcon={<DownloadIcon />}
                    onClick={handleDownloadValues}
                    disabled={
                      isLoading || doublyLinkedList || circularLinkedList
                    }
                  >
                    Download
                  </StyledButton>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
                <Grid item xs={6}>
                  {timeTaken && <p>Time taken: {timeTaken}</p>}
                  <StyledTypography variant="h6">
                    Generated Linked Lists
                  </StyledTypography>
                </Grid>
                <Grid item xs={12}>
                  <StyledTypography variant="subtitle" my={2}>
                    {!(generatedLists.length > 0) ? (
                      <div>No LinkedList generated yet</div>
                    ) : null}
                  </StyledTypography>
                  <StyledTypography variant="subtitle">
                    {generatedLists.length > 0 &&
                    advanceOptions.includes("Show Total List") &&
                    advanceOptions.includes("Show List Size") ? (
                      <div>{numLists}</div>
                    ) : null}
                    {generatedLists.length > 0 &&
                    advanceOptions.includes("Show List Size") &&
                    advanceOptions.includes("Show Total List")
                      ? generatedLists.map((list, index) => (
                          <div key={index}>
                            <div>{listSize}</div>
                            {list
                              ? list.value +
                                (list.next
                                  ? " -> " +
                                    (() => {
                                      let current = list.next;
                                      let result = "";
                                      while (current) {
                                        result +=
                                          current.value +
                                          (current.next ? " -> " : "");
                                        current = current.next;
                                      }
                                      return result;
                                    })()
                                  : "")
                              : "Empty List"}
                          </div>
                        ))
                      : null}

                    {generatedLists.length > 0 &&
                    advanceOptions.includes("Show Total List") &&
                    !advanceOptions.includes("Show List Size") ? (
                      <div>{numLists}</div>
                    ) : null}
                    {generatedLists.length > 0 &&
                    !advanceOptions.includes("Show List Size") &&
                    advanceOptions.includes("Show Total List")
                      ? generatedLists.map((list, index) => (
                          <div key={index}>
                            {list
                              ? list.value +
                                (list.next
                                  ? " -> " +
                                    (() => {
                                      let current = list.next;
                                      let result = "";
                                      while (current) {
                                        result +=
                                          current.value +
                                          (current.next ? " -> " : "");
                                        current = current.next;
                                      }
                                      return result;
                                    })()
                                  : "")
                              : "Empty List"}
                          </div>
                        ))
                      : null}

                    {generatedLists.length > 0 &&
                    advanceOptions.includes("Show List Size") &&
                    !advanceOptions.includes("Show Total List")
                      ? generatedLists.map((list, index) => (
                          <div key={index}>
                            <div>{listSize}</div>
                            {list
                              ? list.value +
                                (list.next
                                  ? " -> " +
                                    (() => {
                                      let current = list.next;
                                      let result = "";
                                      while (current) {
                                        result +=
                                          current.value +
                                          (current.next ? " -> " : "");
                                        current = current.next;
                                      }
                                      return result;
                                    })()
                                  : "")
                              : "Empty List"}
                          </div>
                        ))
                      : null}

                    {generatedLists.length > 0 &&
                    !advanceOptions.includes("Show List Size") &&
                    !advanceOptions.includes("Show Total List")
                      ? generatedLists.map((list, index) => (
                          <div key={index}>
                            {list
                              ? list.value +
                                (list.next
                                  ? " -> " +
                                    (() => {
                                      let current = list.next;
                                      let result = "";
                                      while (current) {
                                        result +=
                                          current.value +
                                          (current.next ? " -> " : "");
                                        current = current.next;
                                      }
                                      return result;
                                    })()
                                  : "")
                              : "Empty List"}
                          </div>
                        ))
                      : null}
                  </StyledTypography>
                </Grid>
              </Grid>
            </StyledCardContent>
          </StyledCard>
        </Grid>
      </StyledGrid>
    </>
  );
};

export default GenerateLinkedList;
