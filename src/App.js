import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from 'pivotal-ui/react/theme-context'
import { Input } from 'pivotal-ui/react/inputs';
import { SyncProvider, Container, StepChart } from 'davi-js';

const containerTitle = { 
  text: <Input style={{ width: '100%' }} placeholder="Search" icon="search" /> 
};

const useFetch = query => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [data, setData] = useState([])
  return { loading, error, data }
}

function App() {
  const { loading, error, data } =  useFetch()
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: '90%' }}>
          <ThemeProvider theme="dark">
            <Container title={containerTitle} loading={true}>
              <SyncProvider>
                {sync => (
                  <StepChart
                    {...sync}
                    zoomEnabled
                    generateFakeData={true}
                    data={data}
                  />
                )}
              </SyncProvider>
            </Container>
          </ThemeProvider>
        </div>
      </header>
    </div>
  );
}

export default App;
