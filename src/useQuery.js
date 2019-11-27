import React, { useState } from 'react';
import { Input } from 'pivotal-ui/react/inputs';
import { Dropdown } from 'pivotal-ui/react/dropdowns';
import { useHttp } from './useHttp';

const specToQuery = doc => doc.spec.indicators.map(i => i.promql)
const useAllQueries = () => {
  const { loading, error, data } = useHttp('/debug/allSpecs', [])
  return { loading, error, data: data.flatMap(specToQuery) }
}

export const useQuery = () => {
  const [query, setQuery] = useState('rate(log_store_ingress_count{source_id="log_store"}[5m])');
  const { data: allQueries } = useAllQueries();
  const queryInput = (
    <Input
      type="text"
      style={{ width: '100%', fontSize: 'small' }}
      placeholder="Search"
      icon="search"
      value={query}
      onChange={e => setQuery(e.target.value)}
    />
  );
  const QuerySelector = () => (
    <Dropdown title={query} id="querySelector" scroll floatMenu>
      {allQueries.map(q => (
        <a href="#" onClick={e => setQuery(e.target.text)}>{q}</a>
      ))}
    </Dropdown>
  )

  return { query, queryInput, QuerySelector };
};

