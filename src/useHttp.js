import { useState, useEffect } from 'react';

export const useHttp = (path, deps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [controller, setController] = useState(new AbortController());
  useEffect(() => {
    setError(null);
    setLoading(true);
    controller.abort();
    const newController = new AbortController();
    setController(newController);
    fetch(path, newController)
      .then(res => res.json())
      .then(setData)
      .catch(e => {
        const cancelled = e instanceof DOMException
        setError(cancelled ? null : e)
      })
      .finally(() => setLoading(false));
  }, [...deps]);
  return { loading, error, data };
};
