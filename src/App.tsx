import React, { useState } from 'react';
import axios from 'axios';
import './App.css'

const VALID_ARGUMENTS = [
  "batterysize", "month", "cutoff", "consumptionday", "lat", "usehorizon",
  "lon", "userhorizon", "raddatabase", "peakpower", "pvtechchoice",
  "mountingplace", "loss", "fixed", "angle", "aspect", "optimalinclination",
  "optimalangles", "inclined_axis", "inclined_optimum", "inclinedaxisangle",
  "vertical_axis", "vertical_optimum", "verticalaxisangle", "twoaxis",
  "pvprice", "systemcost", "interest", "lifetime", "outputformat", "browser"
];

const BASE_API_URL = "/api"; // Relative path for the proxy

function App() {
  const [toolName, setToolName] = useState('');
  const [args, setArgs] = useState<{ [key: string]: string }>({});
  const [response, setResponse] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'toolName') {
      setToolName(value);
    } else {
      setArgs((prevArgs) => ({ ...prevArgs, [name]: value }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const apiUrl = getApiUrl();

    try {
      const res = await axios.get(apiUrl);
      const responseData = res.data;
      setResponse(JSON.stringify(responseData, null, 2));
    } catch (error: any) {
      console.error('API request failed:', error);
      setResponse('API request failed');
    }
  };

  const getApiUrl = () => {
    let apiUrl = `${BASE_API_URL}/${toolName}?`;

    for (const arg in args) {
      if (args.hasOwnProperty(arg) && VALID_ARGUMENTS.includes(arg)) {
        apiUrl += `${arg}=${args[arg]}&`;
      }
    }

    return apiUrl;
  };

  return (
    <div className='web-page'>
      <h1>API Request</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label htmlFor="toolName" className="input-label">
            Tool Name:
          </label>
          <input
            type="text"
            name="toolName"
            id="toolName"
            value={toolName}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        {VALID_ARGUMENTS.map((arg) => (
          <div key={arg}>
            <label htmlFor={arg} className="input-label">
              {arg}:
            </label>
            <input
              type="text"
              name={arg}
              id={arg}
              value={args[arg] ?? ''}
              onChange={handleInputChange}
              className="input-field"
            />
          </div>
        ))}
        <button type="submit" className='submit-button'>Send API Request</button>
      </form>
      <div className='API-response'>
        <h2 className='API-response_h1'>API Response:</h2>
        <pre>{response}</pre>
      </div>
    </div>
  );
}

export default App;
