import React from 'react';
import './App.css';
import { useData } from './useData';
import { useQuery } from './useQuery';
import { useZoom } from './useZoom';
import { ThemeProvider } from 'pivotal-ui/react/theme-context'
import { SyncProvider, Container, StepChart } from 'davi-js';

function App() {
  const { query, queryInput } = useQuery();
  const { zoom, setZoom, zoomInput } = useZoom();
  const { loading, error, data } = useData({ query, zoom })
  
  const chartData = loading || error ? [] : data;
  
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: '90%' }}>
          <ThemeProvider theme="dark">
            <Container 
              title={{ text: queryInput }}
              subtitle={{ text: zoomInput }}
              loading={loading}
              errorIndicator={!!error}
            >
              <SyncProvider zoom={zoom} zoomCallback={setZoom}>
                {sync => (
                  <StepChart
                    {...sync}
                    zoomEnabled
                    data={chartData}
                    xAxisTooltipFormat={Date}
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
