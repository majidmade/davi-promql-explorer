import React, { useState } from 'react';
import { TimeSelector } from 'davi-js';
import { HOUR, NOW } from './time'

export const useZoom = () => {
  const [zoom, setZoom] = useState({ 
    xStart: NOW - 3 * HOUR,
    xEnd: NOW
  })
  const zoomInput = (
    <TimeSelector
      numberOfDaysOfData={90}
      maxDaysToSelect={42}
      onSelectedRangeChanged={setZoom}
      startDate={zoom.xStart}
      endDate={zoom.xEnd}
      showLiveToggle={false}
    />
  )

  return { zoom, setZoom, zoomInput }
}