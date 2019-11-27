import { useState, useEffect } from 'react';
import { SECOND } from './time';

const QUERY_URL = '/api/metrics?query='
const MAX_POINTS = 1200;

const getStep = ({ xStart, xEnd, fallback = 60 }) => {
  const timeDiffInSeconds = xEnd / SECOND - xStart / SECOND;
  return Math.max(Math.floor(timeDiffInSeconds / MAX_POINTS), fallback) || fallback;
}

const useHttp = (path, deps) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [data, setData] = useState([])
  const [controller, setController] = useState(new AbortController());

  useEffect(() => {
    setError(null);
    setLoading(true);
    controller.abort();
    const newController = new AbortController();
    setController(newController);
    fetch(path, newController)
      .then((res) => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [...deps]);

  return { loading, error, data }
}

export const useData = ({ query, zoom }) => {
  const { xStart, xEnd } = zoom;
  const path = `${QUERY_URL}${query}&start=${xStart}&end=${xEnd}&step=${getStep({ xStart, xEnd })}`
  return useHttp(path, [query, xStart, xEnd])
}