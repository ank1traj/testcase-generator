import { StyledComponents } from "components/style";
import {
  Grid,
  Tooltip,
  FormControlLabel,
  Checkbox,
  Radio,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import RefreshIcon from "@mui/icons-material/Refresh";
import GenerateIcon from "@mui/icons-material/PlayArrow";
import DownloadIcon from "@mui/icons-material/GetApp";

import { Toaster } from "react-hot-toast";

import LinkedListGeneratorFunc from "components/generator/linkedList/linkedListGeneratorFunc";
import Nav from "@/pages/nav";
import Footer from "@/pages/footer";

const options = ["Show Total List", "Show List Size"];

const GenerateLinkedList = () => {
  const {
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
  } = LinkedListGeneratorFunc();

  return (
    <div>
    <Nav />
    <StyledComponents.StyledGrid container>
      <Toaster />
      <Grid item xs={12} sm={8} md={8} sx={{ margin: "auto" }}>
        <StyledComponents.StyledCard>
          <StyledComponents.StyledCardHeader title="Linked List Generator" />
          <StyledComponents.StyledCardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Tooltip title="Enter the value of the head node.">
                  <StyledComponents.StyledTextField
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
                  <StyledComponents.StyledTextField
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
                  <StyledComponents.StyledTextField
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
                  <StyledComponents.StyledTextField
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
                  <StyledComponents.StyledTextField
                    label="Number of Lists"
                    type="number"
                    value={numLists}
                    onChange={(e) => setNumLists(parseInt(e.target.value))}
                    fullWidth
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={6}>
                <Tooltip title="Select Advanced options" style={{width:"100%", position:"relative"}}>
                  <StyledComponents.StyledFormControl>
                    <InputLabel>Advanced Options</InputLabel>
                    <StyledComponents.StyledSelect
                      value={advanceOptions}
                      onChange={handleAdvanceOptionChange}
                      multiple
                    >
                      {options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </StyledComponents.StyledSelect>
                  </StyledComponents.StyledFormControl>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
              <Grid item xs={4}>
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
              <Grid item xs={4}>
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
              <Grid item xs={4}>
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
              <Grid item xs={4}>
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
              <Grid item xs={4}>
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
              <Grid item xs={3}>
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
              <Grid item xs={3}>
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
              <Grid item xs={3}>
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
              <Grid item xs={3}>
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
                    <StyledComponents.StyledTextField
                      label="Node Value"
                      type="number"
                      value={startValue}
                      onChange={(e) => setStartValue(parseInt(e.target.value))}
                      fullWidth
                    />
                  </Tooltip>
                </Grid>
              ) : null}
              {atEnd ? (
                <Grid item xs={6}>
                  <Tooltip title="Enter the value of the node to be added at the end of the linked list.">
                    <StyledComponents.StyledTextField
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
                    <StyledComponents.StyledTextField
                      label="Node Value"
                      type="number"
                      value={middleValue}
                      onChange={(e) => setMiddleValue(parseInt(e.target.value))}
                      fullWidth
                    />
                  </Tooltip>
                </Grid>
              ) : null}
              {atRandom ? (
                <>
                  <Grid item xs={6}>
                    <Tooltip title="Enter the value of the node to be added at a random position in the linked list.">
                      <StyledComponents.StyledTextField
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
                      <StyledComponents.StyledTextField
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
                <StyledComponents.StyledButton
                  variant="contained"
                  fullWidth
                  startIcon={<GenerateIcon />}
                  onClick={
                    addNode
                      ? handleAddGenerateValues
                      : handleUpdateGenerateValues
                  }
                  disabled={isLoading || doublyLinkedList || circularLinkedList}
                >
                  Generate Linked Lists
                </StyledComponents.StyledButton>
              </Grid>
              <Grid item xs={6}>
                <CopyToClipboard onCopy={handleCopyValues}>
                  <StyledComponents.StyledButton
                    variant="contained"
                    fullWidth
                    startIcon={<FileCopyIcon />}
                    disabled={
                      isLoading || doublyLinkedList || circularLinkedList
                    }
                  >
                    {copied ? "Copied" : "Copy to clipboard"}
                  </StyledComponents.StyledButton>
                </CopyToClipboard>
              </Grid>
              <Grid item xs={6}>
                <StyledComponents.StyledButton
                  variant="contained"
                  fullWidth
                  startIcon={<RefreshIcon />}
                  onClick={handleResetValues}
                  disabled={isLoading || doublyLinkedList || circularLinkedList}
                >
                  Reset
                </StyledComponents.StyledButton>
              </Grid>
              <Grid item xs={12}>
                <StyledComponents.StyledButton
                  variant="contained"
                  fullWidth
                  startIcon={<DownloadIcon />}
                  onClick={handleDownloadValues}
                  disabled={isLoading || doublyLinkedList || circularLinkedList}
                >
                  Download
                </StyledComponents.StyledButton>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
              <Grid item xs={6}>
                {timeTaken && <p>Time taken: {timeTaken}</p>}
                <StyledComponents.StyledTypography variant="h6">
                  Generated Linked Lists
                </StyledComponents.StyledTypography>
              </Grid>
              <Grid item xs={12}>
                <StyledComponents.StyledTypography variant="subtitle" my={2}>
                  {!(generatedLists.length > 0) ? (
                    <div>No LinkedList generated yet</div>
                  ) : null}
                </StyledComponents.StyledTypography>
                <StyledComponents.StyledTypography variant="subtitle">
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
                </StyledComponents.StyledTypography>
              </Grid>
            </Grid>
          </StyledComponents.StyledCardContent>
        </StyledComponents.StyledCard>
      </Grid>
    </StyledComponents.StyledGrid>
    <Footer />
    </div>
  );
};

export default GenerateLinkedList;
