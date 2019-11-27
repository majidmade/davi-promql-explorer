import { SECOND } from './time';
import { useHttp } from './useHttp';

const QUERY_URL = '/api/metrics?query='
const MAX_POINTS = 1200;

const getStep = ({ xStart, xEnd, fallback = 60 }) => {
  const timeDiffInSeconds = xEnd / SECOND - xStart / SECOND;
  return Math.max(Math.floor(timeDiffInSeconds / MAX_POINTS), fallback) || fallback;
}

export const useData = ({ query, zoom }) => {
  const { xStart, xEnd } = zoom;
  const path = `${QUERY_URL}${query}&start=${xStart}&end=${xEnd}&step=${getStep({ xStart, xEnd })}`
  return useHttp(path, [query, xStart, xEnd])
}