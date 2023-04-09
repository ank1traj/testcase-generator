import { useState } from "react";
import { Grid, Tooltip } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import RefreshIcon from "@mui/icons-material/Refresh";
import GenerateIcon from "@mui/icons-material/PlayArrow";
import {
  StyledButton,
  StyledCard,
  StyledCardContent,
  StyledCardHeader,
  StyledGrid,
  StyledTextField,
  StyledTypography,
} from "@/lib/styles";

const GenerateInteger = () => {
  const [min, setMin] = useState(-100)
  const [max, setMax] = useState(100)
  const [numValues, setNumValues] = useState(10)
  const [generatedValues, setGeneratedValues] = useState([])
  const [copied, setCopied] = useState(false)
  const [timeTaken, setTimeTaken] = useState(
    'Click the button to generate values'
  )

  const handleGenerateValues = () => {
    const startTime = performance.now()
    const newValues = Array.from(
      { length: numValues },
      () =>
        Math.floor(Math.random() * (parseInt(max) - parseInt(min) + 1)) +
        parseInt(min)
    )
    const endTime = performance.now()
    const timeDiff = endTime - startTime
    const formattedTime =
      timeDiff < 1 ? 'less than 1 ms' : `${timeDiff.toFixed(2)} ms`
    setTimeTaken(formattedTime)
    setGeneratedValues(newValues)
    setCopied(false)
  }

  const handleCopyValues = () => {
    const valuesString = generatedValues.join(', ')
    navigator.clipboard.writeText(valuesString)
    setCopied(true)
  }

  const handleResetValues = () => {
    setMin(-100)
    setMax(100)
    setNumValues(10)
    setGeneratedValues([])
    setCopied(false)
    setTimeTaken(null)
  }

  return (
    <>
      <StyledGrid container>
        <Grid item xs={12} sm={8} md={6} sx={{ margin: 'auto' }}>
          <StyledCard>
            <StyledCardHeader title='Random Integer Generator' />
            <StyledCardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Tooltip title='Enter the minimum value for the generated integers'>
                    <StyledTextField
                      label='Min'
                      type='number'
                      value={min}
                      onChange={(e) => setMin(e.target.value)}
                      fullWidth
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <Tooltip title='Enter the maximum value for the generated integers'>
                    <StyledTextField
                      label='Max'
                      type='number'
                      value={max}
                      onChange={(e) => setMax(e.target.value)}
                      fullWidth
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <Tooltip title='Enter the number of integers to generate'>
                    <StyledTextField
                      label='Number of Integers'
                      type='number'
                      value={numValues}
                      onChange={(e) => setNumValues(e.target.value)}
                      fullWidth
                    />
                  </Tooltip>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
                <Grid item xs={12}>
                  <StyledButton
                    variant='contained'
                    fullWidth
                    startIcon={<GenerateIcon />}
                    onClick={handleGenerateValues}
                  >
                    Generate Integers
                  </StyledButton>
                </Grid>
                <Grid item xs={6}>
                  <CopyToClipboard
                    text={generatedValues.join(', ')}
                    onCopy={handleCopyValues}
                  >
                    <StyledButton
                      variant='contained'
                      fullWidth
                      startIcon={<FileCopyIcon />}
                    >
                      {copied ? 'Copied!' : 'Copy Integers'}
                    </StyledButton>
                  </CopyToClipboard>
                </Grid>
                <Grid item xs={6}>
                  <StyledButton
                    variant='contained'
                    fullWidth
                    startIcon={<RefreshIcon />}
                    onClick={handleResetValues}
                  >
                    Reset
                  </StyledButton>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
                <Grid item xs={6}>
                  {timeTaken && <p>Time taken: {timeTaken}</p>}
                  <StyledTypography variant='h6'>
                    Generated Integer
                  </StyledTypography>
                </Grid>
                <Grid item xs={12}>
                  <StyledTypography variant='body2' my={2}>
                    {generatedValues.length > 0
                      ? generatedValues.map((value, index) => (
                        <div key={index}>{value}</div>
                      ))
                      : 'No Integer generated yet'}
                  </StyledTypography>
                </Grid>
              </Grid>
            </StyledCardContent>
          </StyledCard>
        </Grid>
      </StyledGrid>
    </>
  )
}

export default GenerateInteger
