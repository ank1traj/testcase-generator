import { useState, useEffect } from "react";
import { sendConfirmation } from "@/lib/api";
import { DataSet } from "vis-data";
import toast from "react-hot-toast";
"use client";
import { useUser } from "@clerk/nextjs";

const GraphGeneratorFunc = () => {
  const [numVertices, setNumVertices] = useState(5);
  const [numEdges, setNumEdges] = useState(8);
  const [numGraph, setNumGraph] = useState(1);
  const [minWeight, setMinWeight] = useState(1);
  const [maxWeight, setMaxWeight] = useState(100);
  const [weightedGraph, setWeightedGraph] = useState(false);
  const [allowMultipleEdges, setAllowMultipleEdges] = useState(false);
  const [allowSelfLoops, setAllowSelfLoops] = useState(false);
  const [allowCycles, setAllowCycles] = useState(false);
  const [isDirected, setIsDirected] = useState(false);
  const [isArrow, setIsArrow] = useState(false);
  const [isColon, setIsColon] = useState(false);
  const [useCharacters, setUseCharacters] = useState(false);

  const [copied, setCopied] = useState(false);
  const [timeTaken, setTimeTaken] = useState(
    "Click the button to generate values"
  );

  const [generatedGraph, setGeneratedGraph] = useState(null);

  const [advanceOptions, setAdvanceOptions] = useState(["Show Total Cases"]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (
      useCharacters &&
      !advanceOptions.includes("a-z") &&
      !advanceOptions.includes("A-Z")
    ) {
      toast.error(
        "Please select 'a-z' or 'A-Z' from advanced options when using characters."
      );
    }
  }, [useCharacters, advanceOptions]);

  const handleAdvanceOptionChange = (event) => {
    const { value } = event.target;
    setAdvanceOptions(value);
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
  const handleGenerateValues = async (numGraphs) => {
    setIsLoading(true); // set isLoading to true
    const errorOccurred = false; // add this flag variable
    let generatedData=[];
    try {
      await toast.promise(
        new Promise((resolve, reject) => {
          // add reject parameter to the promise
          setTimeout(() => {
            if (numVertices <= 1) {
              reject(new Error("Number of vertices must be greater than 0"));
              return;
            }
            const maxNumEdges = isDirected
              ? numVertices * (numVertices - 1)
              : (numVertices * (numVertices - 1)) / 2;
            if (numEdges > maxNumEdges) {
              reject(
                new Error(
                  `Number of edges must be less than or equal to ${maxNumEdges} for ${numVertices} vertices`
                )
              );
              return;
            }
            if (weightedGraph && minWeight >= maxWeight) {
              reject(
                new Error("Minimum weight must be less than maximum weight")
              );
              return;
            }

            const startTime = performance.now();

            for (let i = 0; i < numGraphs; i++) {
              const nodes = new DataSet(
                Array.from({ length: numVertices }, (_, i) => ({
                  id: i,
                  label: i.toString(),
                }))
              );

              const alphabet = "abcdefghijklmnopqrstuvwxyz";
              if (useCharacters && advanceOptions.includes("A-Z")) {
                nodes.forEach((node) => {
                  const char = alphabet[node.id];
                  node.label = char.toUpperCase();
                });
              }

              if (useCharacters && advanceOptions.includes("a-z")) {
                nodes.forEach((node) => {
                  const char = alphabet[node.id];
                  node.label = char;
                });
              }

              const edges = new DataSet();
              const graphData = { nodes: nodes.get(), edges: [] };

              while (edges.length < numEdges) {
                const from = Math.floor(Math.random() * numVertices);
                const to = Math.floor(Math.random() * numVertices);
                const isSelfLoop = from === to;
                const isCycle =
                  allowCycles &&
                  edges
                    .get()
                    .some((edge) => edge.from === to && edge.to === from);
                const isMultipleEdge =
                  allowMultipleEdges &&
                  edges
                    .get()
                    .some((edge) => edge.from === from && edge.to === to);

                if (
                  !isSelfLoop &&
                  !isCycle &&
                  (!isMultipleEdge ||
                    allowSelfLoops ||
                    !edges
                      .get()
                      .some((edge) => edge.from === to && edge.to === from))
                ) {
                  const type = isDirected ? "arrow" : undefined;
                  const weight = weightedGraph
                    ? Math.floor(Math.random() * (maxWeight - minWeight + 1)) +
                      parseInt(minWeight)
                    : undefined;
                  const edgeData = { from, to };
                  if (type) {
                    edgeData.type = type;
                  }
                  if (weight) {
                    edgeData.label = weight;
                  }
                  if (useCharacters && advanceOptions.includes("A-Z")) {
                    const charCodeA = 65; // ASCII code for 'A'
                    const charCodeZ = 90; // ASCII code for 'Z'
                    const randomChar = () =>
                      String.fromCharCode(
                        Math.floor(
                          Math.random() * (charCodeZ - charCodeA + 1)
                        ) + charCodeA
                      );

                    edgeData.to = randomChar();
                    edgeData.from = randomChar();
                  }

                  if (useCharacters && advanceOptions.includes("a-z")) {
                    const charCodeA = 97; // ASCII code for 'a'
                    const charCodeZ = 122; // ASCII code for 'z'
                    const randomChar = () =>
                      String.fromCharCode(
                        Math.floor(
                          Math.random() * (charCodeZ - charCodeA + 1)
                        ) + charCodeA
                      );

                    edgeData.to = randomChar();
                    edgeData.from = randomChar();
                  }

                  edges.add(edgeData);
                  graphData.edges.push(edgeData);
                }
              }

              //   const container = document.createElement("div");
              //   container.id = `graph-${i + 1}`;
              //   document.body.appendChild(container);

              // const data = { nodes, edges };
              // const options = {
              //   edges: {
              //     font: {
              //       size: 16,
              //     },
              //   },
              // };

              //   const network = new Network(container, data, options);

              generatedData.push(graphData);
            }

            setGeneratedGraph(generatedData);
            const endTime = performance.now();
            const timeDiff = endTime - startTime;
            const formattedTime =
              timeDiff < 1 ? "less than 1 ms" : `${timeDiff.toFixed(2)} ms`;

            setTimeTaken(formattedTime);
            setCopied(false);
            resolve();
          }, 2000);
        }),
        {
          loading: "Generating values...",
          success: (success)=>{
            send=true;
            return "Values generated successfully!!";
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
    const graphStrings = generatedData.map((graph) => {
      const nodes = graph.nodes.map((node) => node.label);
      const edges = graph.edges.map((edge) => {
        const from = edge.from;
        const to = edge.to;
        const type = edge.type;
        const label = edge.label;
        const edgeString = isDirected
          ? `${from} ${type} ${to}`
          : `${from} ${to} \n`;
        return label ? `${edgeString} : ${label}` : edgeString;
      });
      const graphString = `${nodes.join(" ")}\n${edges.join("")}`;

      if (
        advanceOptions.includes("Show Total Edges & Vertices") &&
        advanceOptions.includes("Show Total Cases")
      ) {
        return `${numGraph}\nTotal Edges: ${graph.edges.length}\nTotal Vertices: ${graph.nodes.length}\n${graphString}\n`;
      }

      if (advanceOptions.includes("Show Total Cases")) {
        return `${numGraph}\n${graphString}\nTotal Cases: ${graph.edges.length}`;
      }

      if (advanceOptions.includes("Show Total Edges & Vertices")) {
        return `Total Edges: ${graph.edges.length}\nTotal Vertices: ${graph.nodes.length}\n${graphString}\n`;
      }

      return graphString;
    });

    const text = graphStrings.join("\n\n");
    setIsLoading(false); // set isLoading to false
    await generateMail(text);
  };

  const handleCopyGraphs = () => {
    if (!generatedGraph) {
      toast.error("Please generate values first");
      return;
    }
    setIsLoading(true);

    const graphStrings = generatedGraph.map((graph) => {
      const nodes = graph.nodes.map((node) => node.label);
      const edges = graph.edges.map((edge) => {
        const from = edge.from;
        const to = edge.to;
        // const type = edge.type;
        const label = edge.label;
        let edgeString = isDirected ? `${from} -> ${to}` : `${from} ${to}`;
        edgeString = isArrow ? `${from} -> ${to}` : `${from} ${to}`;

        if (weightedGraph && label) {
          edgeString += isColon ? ` : ${label}` : ` ${label}`;
        }

        return edgeString;
      });

      const graphString = `${nodes.join("\n")}\n${edges.join("\n")}`;

      if (
        advanceOptions.includes("Show Total Edges & Vertices") &&
        advanceOptions.includes("Show Total Cases")
      ) {
        return `${numGraph}\n${graph.edges.length} ${graph.nodes.length}\n${graphString}\n`;
      }

      if (advanceOptions.includes("Show Total Cases")) {
        return `${numGraph}\n${graphString}`;
      }

      if (advanceOptions.includes("Show Total Edges & Vertices")) {
        return `${graph.edges.length} ${graph.nodes.length}\n${graphString}\n`;
      }

      return graphString;
    });

    const text = graphStrings.join("\n\n");

    navigator.clipboard.writeText(text);
    toast.promise(
      navigator.clipboard.writeText(graphStrings),
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
    if (!generatedGraph) {
      toast.error("Please generate values first");
      return;
    }

    setIsLoading(true);

    const graphStrings = generatedGraph.map((graph) => {
      const nodes = graph.nodes.map((node) => node.label);
      const edges = graph.edges.map((edge) => {
        const from = edge.from;
        const to = edge.to;
        const type = edge.type;
        const label = edge.label;
        const edgeString = isDirected
          ? `${from} ${type} ${to}`
          : `${from} ${to} \n`;
        return label ? `${edgeString} : ${label}` : edgeString;
      });
      const graphString = `${nodes.join(" ")}\n${edges.join("")}`;

      if (
        advanceOptions.includes("Show Total Edges & Vertices") &&
        advanceOptions.includes("Show Total Cases")
      ) {
        return `${numGraph}\nTotal Edges: ${graph.edges.length}\nTotal Vertices: ${graph.nodes.length}\n${graphString}\n`;
      }

      if (advanceOptions.includes("Show Total Cases")) {
        return `${numGraph}\n${graphString}\nTotal Cases: ${graph.edges.length}`;
      }

      if (advanceOptions.includes("Show Total Edges & Vertices")) {
        return `Total Edges: ${graph.edges.length}\nTotal Vertices: ${graph.nodes.length}\n${graphString}\n`;
      }

      return graphString;
    });

    const text = graphStrings.join("\n\n");

    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "graph.txt";
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
    setNumVertices(5);
    setNumEdges(8);
    setNumGraph(1);
    setMinWeight(1);
    setMaxWeight(100);
    setWeightedGraph(false);
    setAllowMultipleEdges(false);
    setAllowSelfLoops(false);
    setAllowCycles(false);
    setIsDirected(false);
    setUseCharacters(false);
    setGeneratedGraph(null);
    setCopied(false);
    setAdvanceOptions(["Show Total Cases"]);
    toast.promise(new Promise((resolve) => setTimeout(() => resolve(), 500)), {
      pending: "Resetting values...",
      success: "Values reset successfully!",
      error: "Error resetting values",
    });
    setIsLoading(false);
  };

  return {
    numVertices,
    setNumVertices,
    numEdges,
    setNumEdges,
    numGraph,
    setNumGraph,
    minWeight,
    setMinWeight,
    maxWeight,
    setMaxWeight,
    weightedGraph,
    setWeightedGraph,
    allowMultipleEdges,
    setAllowMultipleEdges,
    allowSelfLoops,
    setAllowSelfLoops,
    allowCycles,
    setAllowCycles,
    isDirected,
    setIsDirected,
    useCharacters,
    setUseCharacters,
    generatedGraph,
    advanceOptions,
    isArrow,
    setIsArrow,
    isColon,
    setIsColon,
    copied,
    handleGenerateValues,
    handleCopyGraphs,
    handleDownloadValues,
    handleResetValues,
    handleAdvanceOptionChange,
    timeTaken,
    isLoading,
  };
};

export default GraphGeneratorFunc;
