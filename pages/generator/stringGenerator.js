import { useState } from 'react'

import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Typography,
  IconButton,
  Tooltip,
  FormControlLabel,
  Checkbox,
  Radio,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@mui/material'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import RefreshIcon from '@mui/icons-material/Refresh'
import GenerateIcon from '@mui/icons-material/PlayArrow'
import DownloadIcon from '@mui/icons-material/GetApp'
import { styled } from '@mui/material/styles'

import toast, { Toaster } from 'react-hot-toast'

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  borderRadius: '12px',
  width: '100%',
  height: '100%',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column'
}))

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  textAlign: 'center',
  color: '#fff'
}))

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}))

const StyledGrid = styled(Grid)(({ theme }) => ({
  height: '100vh'
}))

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: '#fff',
  fontWeight: 'bold'
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& label': {
    color: '#fff',
    fontWeight: 'bold'
  },
  '& input': {
    color: '#fff',
    fontWeight: 'bold'
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: '#fff'
  }
}))

const StyledButton = styled(Button)(({ theme }) => ({
  background: '#fff',
  color: '#FF8E53',
  fontWeight: 'bold',
  '&:hover': {
    background: '#FF8E53',
    color: '#fff'
  }
}))

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: '#fff'
}))

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: '300px',
  '& .MuiSelect-select': {
    paddingRight: theme.spacing(4)
  },
  '& .MuiSelect-icon': {
    right: 0
  }
}))

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.secondary.main,
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: theme.palette.secondary.light
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  '&.Mui-selected:hover': {
    backgroundColor: theme.palette.primary.light
  }
}))

const StyledSelect = styled(Select)(({ theme }) => ({
  '&.MuiSelect-select': {
    paddingRight: theme.spacing(2),
    '&:focus': {
      backgroundColor: 'transparent'
    }
  },
  '& .MuiSelect-icon': {
    color: theme.palette.secondary.main
  }
}))

const options = [
  'Hide Length',
  'Hide Number of Strings',
  'Distinct Strings',
  'Distinct Strings (Case Insensitive)',
  'Distinct Characters'
]

const GenerateString = () => {
  const [stringLength, setStringLength] = useState(10)
  const [numStrings, setNumStrings] = useState(1)
  const [excludedChars, setExcludedChars] = useState('')
  const [includedChars, setIncludedChars] = useState('')
  const [generatedStrings, setGeneratedStrings] = useState([])
  const [randomSize, setRandomSize] = useState(false)
  const [copied, setCopied] = useState(false)
  const [timeTaken, setTimeTaken] = useState(
    'Click the button to generate values'
  )
  const [smallAlphabets, setSmallAlphabets] = useState(true)
  const [capitalAlphabets, setCapitalAlphabets] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [specialChars, setSpecialChars] = useState(false)

  const [increasing, setIncreasing] = useState(false) // for sorting in increasing order
  const [decreasing, setDecreasing] = useState(false) // for sorting in decreasing order
  const [random, setRandom] = useState(false) // for random order

  const [advanceOptions, setAdvanceOptions] = useState(['Hide Length'])

  const [isLoading, setIsLoading] = useState(false)

  const handleAdvanceOptionChange = (event) => {
    const { value } = event.target
    setAdvanceOptions(value)
  }

  const handleSortChange = (event) => {
    if (
      (event.target.value === 'increasing' ||
        event.target.value === 'decreasing' ||
        event.target.value === 'random') &&
      numStrings === 1
    ) {
      toast.error('Please generate more than one string to sort')
      return
    }
    switch (event.target.value) {
      case 'increasing':
        setIncreasing(true)
        setDecreasing(false)
        setRandom(false)
        break
      case 'decreasing':
        setIncreasing(false)
        setDecreasing(true)
        setRandom(false)
        break
      case 'random':
        setIncreasing(false)
        setDecreasing(false)
        setRandom(true)
        break
      default:
        setIncreasing(false)
        setDecreasing(false)
        setRandom(false)
        break
    }
  }

  const handleGenerateStrings = async () => {
    setIsLoading(true) // set isLoading to true
    const errorOccurred = false // add this flag variable

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
              includedChars === ''
            ) {
              reject(
                new Error(
                  'Please select at least one character set from a-z or A-Z or special characters or numbers or included characters'
                )
              )
              return
            }

            // Check if any character is included in both includeChars and excludedChars
            const commonChars = [
              ...new Set(
                [...includedChars].filter((char) =>
                  excludedChars.includes(char)
                )
              )
            ]
            if (commonChars.length > 0) {
              reject(
                new Error(
                  `Please do not include the same characters (${commonChars.join(
                    ', '
                  )}) in both include and exclude fields.`
                )
              )
              return
            }

            const startTime = performance.now()

            // Define the character sets to include in the generated strings
            let chars = ''
            if (smallAlphabets) chars += 'abcdefghijklmnopqrstuvwxyz'
            if (capitalAlphabets) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            if (numbers) chars += '0123456789'
            if (specialChars) chars += '!@#$%^&*()_+-={}[]|:;"<>,.?/~`'
            if (includedChars) chars += includedChars

            // Exclude any characters specified by the user
            if (excludedChars) {
              excludedChars.split('').forEach((char) => {
                chars = chars.split(char).join('')
              })
            }

            let newStrings = []
            for (let i = 0; i < numStrings; i++) {
              // Generate a random length for the current string
              const length =
                randomSize && stringLength > 1
                  ? Math.floor(Math.random() * (stringLength - 1)) + 1
                  : stringLength

              // Generate the string using the selected character set and length
              let newString = ''

              const includeCharsPos = Math.floor(Math.random() * length)
              for (let j = 0; j < length; j++) {
                if (j === includeCharsPos) {
                  newString += includedChars
                }
                const char = chars.charAt(
                  Math.floor(Math.random() * chars.length)
                )
                newString += char
              }

              newStrings.push(newString)
            }

            if (advanceOptions.includes('distinct strings')) {
              newStrings = [...new Set(newStrings)]
            }
            if (advanceOptions.includes('distinct strings(case sensitive)')) {
              newStrings = Array.from(
                new Set(newStrings.map((s) => s.toLowerCase()))
              ).map((s) => newStrings.find((t) => s === t.toLowerCase()))
            }

            if (increasing) newStrings.sort((a, b) => a.localeCompare(b))
            if (decreasing) newStrings.sort((a, b) => b.localeCompare(a))
            if (random) newStrings.sort(() => Math.random() - 0.5)

            const endTime = performance.now()
            const timeDiff = endTime - startTime
            const formattedTime =
              timeDiff < 1 ? 'less than 1 ms' : `${timeDiff.toFixed(2)} ms`

            setTimeTaken(formattedTime)
            setGeneratedStrings(newStrings)
            setCopied(false)
            resolve()
          }, 2000)
        }),
        {
          loading: 'Generating values...',
          success: 'Values generated successfully!',
          error: (error) => {
            if (errorOccurred) {
              // show toast error if flag variable is true
              return error.message
            } else {
              return 'An error occurred while generating values'
            }
          }
        }
      )
    } catch (error) {
      toast.error(error.message)
    }
    setIsLoading(false) // set isLoading to false
  }

  const handleCopyStrings = () => {
    if (!generatedStrings.length) {
      toast.error('Please generate values first')
      return
    }

    setIsLoading(true) // set isLoading to true

    let valuesString = ''
    let totalCases = 0

    if (advanceOptions.includes('Hide Length')) {
      valuesString = generatedStrings.join('\n')
      if (!advanceOptions.includes('Hide Number of Strings')) {
        totalCases = numStrings
        valuesString = `${totalCases}\n${valuesString}`
      }
    } else if (advanceOptions.includes('Hide Number of Strings')) {
      valuesString = generatedStrings
        .map((str) => `${str.length}\n${str}`)
        .join('\n')
    } else {
      totalCases = numStrings
      valuesString = generatedStrings
        .map((str) => `${str.length}\n${str},`)
        .join('\n')
      valuesString = `${totalCases}\n${valuesString}`
    }

    navigator.clipboard.writeText(valuesString)
    toast.promise(
      navigator.clipboard.writeText(valuesString),
      {
        loading: 'Copying values...',
        success: 'Values copied!',
        error: 'Failed to copy values'
      },
      {
        style: {
          minWidth: '250px'
        }
      }
    )
    setCopied(true)
    setIsLoading(false) // set isLoading to false
  }

  const handleDownloadValues = () => {
    if (!generatedStrings.length) {
      toast.error('Please generate values first')
      return
    }

    setIsLoading(true) // set isLoading to true

    let valuesString = ''
    let totalCases = 0

    if (advanceOptions.includes('Hide Length')) {
      if (advanceOptions.includes('Hide Number of Strings')) {
        valuesString = generatedStrings.join(', ')
      } else {
        totalCases = numStrings
        valuesString = `${numStrings}\n${generatedStrings.join('\n')}`
      }
    } else if (advanceOptions.includes('Hide Number of Strings')) {
      valuesString = generatedStrings
        .map((str) => `${str.length}\n${str}`)
        .join('\n')
    } else {
      totalCases = numStrings
      valuesString = `${numStrings}\n${generatedStrings
        .map((str) => `${str.length}\n${str}`)
        .join('\n')}`
    }

    const element = document.createElement('a')
    const file = new Blob([valuesString], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'generated_values.txt'
    element.click()
    toast.promise(new Promise((resolve) => setTimeout(() => resolve(), 500)), {
      pending: 'Downloading values...',
      success: 'Values downloaded!',
      error: 'Failed to download values'
    })
    setIsLoading(false) // set isLoading to false
  }

  const handleResetValues = () => {
    setIsLoading(true) // set isLoading to true
    setStringLength(10)
    setNumStrings(1)
    setExcludedChars('')
    setIncludedChars('')
    setGeneratedStrings([])
    setCopied(false)
    setTimeTaken(null)
    setSmallAlphabets(true)
    setCapitalAlphabets(false)
    setNumbers(false)
    setSpecialChars(false)
    setRandomSize(false)
    setAdvanceOptions(['Hide Length'])
    toast.promise(new Promise((resolve) => setTimeout(() => resolve(), 500)), {
      pending: 'Resetting values...',
      success: 'Values reset successfully!',
      error: 'Error resetting values'
    })
    setIsLoading(false) // set isLoading to false
  }

  return (
    <StyledGrid container>
      <Toaster reverseOrder />
      <Grid item xs={12} sm={8} md={8} sx={{ margin: 'auto' }}>
        <StyledCard>
          <StyledCardHeader title='Random String Generator' />
          <StyledCardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Tooltip title='Enter the number of string'>
                  <StyledTextField
                    label='Number of Strings'
                    type='number'
                    value={numStrings}
                    onChange={(e) => {
                      if (e.target.value < 0) {
                        toast.error('Please enter a positive number')
                        setNumStrings(1)
                      } else {
                        setNumStrings(e.target.value)
                      }
                    }}
                    fullWidth
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={6}>
                <Tooltip title='Enter the length of the string'>
                  <StyledTextField
                    label='string length'
                    type='number'
                    value={stringLength}
                    onChange={(e) => {
                      if (e.target.value < 0) {
                        toast.error('Please enter a positive number')
                        setStringLength(10)
                      } else {
                        setStringLength(e.target.value)
                      }
                    }}
                    fullWidth
                  />
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
              <Grid item xs={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={randomSize}
                      onChange={(e) => setRandomSize(e.target.checked)}
                      color='primary'
                    />
                  }
                  label='Random Size'
                />
              </Grid>
              <Grid item xs={4}>
                <Tooltip title='Advanced options'>
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
            <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
              <Grid item xs={3}>
                <Tooltip title='Check to include a-z'>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={smallAlphabets}
                        onChange={(e) => setSmallAlphabets(e.target.checked)}
                        name='a-z'
                      />
                    }
                    label='a-z'
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={3}>
                <Tooltip title='Check to include A-Z'>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={capitalAlphabets}
                        onChange={(e) => setCapitalAlphabets(e.target.checked)}
                        name='A-Z'
                      />
                    }
                    label='A-Z'
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={3}>
                <Tooltip title='Check to include 0-9'>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={numbers}
                        onChange={(e) => setNumbers(e.target.checked)}
                        name='0-9'
                      />
                    }
                    label='0-9'
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={3}>
                <Tooltip title='Check to include special chars'>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={specialChars}
                        onChange={(e) => setSpecialChars(e.target.checked)}
                        name='special chars'
                      />
                    }
                    label='special chars'
                  />
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
              <Grid item xs={6}>
                <Tooltip title='Enter the chars to be exclude'>
                  <StyledTextField
                    label='Exclude Characters'
                    value={excludedChars}
                    onChange={(e) => setExcludedChars(e.target.value)}
                    fullWidth
                  />
                </Tooltip>
              </Grid>

              <Grid item xs={6}>
                <Tooltip title='Enter the chars to be include'>
                  <StyledTextField
                    label='Include Characters'
                    value={includedChars}
                    onChange={(e) => setIncludedChars(e.target.value)}
                    fullWidth
                  />
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
              <Grid item xs={4}>
                <Tooltip title='Check to generate increasing values(Only work with multiple strings)'>
                  <FormControlLabel
                    control={
                      <Radio
                        checked={increasing}
                        onChange={handleSortChange}
                        value='increasing'
                        name='radio-button-demo'
                        inputProps={{ 'aria-label': 'increasing' }}
                        disabled={numStrings <= 1}
                      />
                    }
                    label='Increasing'
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={4}>
                <Tooltip title='Check to generate decreasing values(Only work with multiple strings)'>
                  <FormControlLabel
                    control={
                      <Radio
                        checked={decreasing}
                        onChange={handleSortChange}
                        value='decreasing'
                        name='radio-button-demo'
                        inputProps={{ 'aria-label': 'decreasing' }}
                        disabled={numStrings <= 1}
                      />
                    }
                    label='Decreasing'
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={4}>
                <Tooltip title='Check to generate random values(Only work with multiple strings)'>
                  <FormControlLabel
                    control={
                      <Radio
                        checked={random}
                        onChange={handleSortChange}
                        value='random'
                        name='radio-button-demo'
                        inputProps={{ 'aria-label': 'random' }}
                        disabled={numStrings <= 1}
                      />
                    }
                    label='Random'
                  />
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
              <Grid item xs={12}>
                <StyledButton
                  variant='contained'
                  onClick={handleGenerateStrings}
                  disabled={isLoading}
                  fullWidth
                  startIcon={<GenerateIcon />}
                >
                  Generate
                </StyledButton>
              </Grid>
              <Grid item xs={6}>
                <StyledButton
                  variant='contained'
                  onClick={handleCopyStrings}
                  disabled={isLoading}
                  fullWidth
                  startIcon={
                    <CopyToClipboard onCopy={handleCopyStrings}>
                      <FileCopyIcon />
                    </CopyToClipboard>
                  }
                >
                  {copied ? 'Copied' : 'Copy'}
                </StyledButton>
              </Grid>
              <Grid item xs={6}>
                <StyledButton
                  variant='contained'
                  onClick={handleResetValues}
                  disabled={isLoading}
                  fullWidth
                  startIcon={<RefreshIcon />}
                >
                  Reset
                </StyledButton>
              </Grid>
              <Grid item xs={12}>
                <StyledButton
                  variant='contained'
                  fullWidth
                  startIcon={<DownloadIcon />}
                  onClick={handleDownloadValues}
                  disabled={isLoading}
                >
                  Download
                </StyledButton>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
              <Grid item xs={6}>
                {timeTaken && <p>Time taken: {timeTaken}</p>}
                <StyledTypography variant='h6'>
                  Generated String
                </StyledTypography>
              </Grid>
              <Grid item xs={12}>
                <StyledTypography variant='subtitle'>
                  {generatedStrings.length > 0 && (
                    <>
                      <Typography variant='subtitle'>
                        {!advanceOptions.includes('Hide Number of Strings') &&
                          generatedStrings.length}
                        {generatedStrings.map((str, index) => (
                          <div key={index}>
                            {!advanceOptions.includes('Hide Length') && (
                              <div>{str.length}</div>
                            )}
                            {str}
                          </div>
                        ))}
                      </Typography>
                    </>
                  )}
                </StyledTypography>
              </Grid>
            </Grid>
          </StyledCardContent>
        </StyledCard>
      </Grid>
    </StyledGrid>
  )
}

export default GenerateString
