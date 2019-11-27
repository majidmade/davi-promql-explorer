import React, { useState } from 'react';
import { Input } from 'pivotal-ui/react/inputs';

export const useQuery = () => {
  const [query, setQuery] = useState('rate(log_store_ingress_count{source_id="log_store"}[5m])');
  const queryInput = (
    <Input
      style={{ width: '100%' }}
      placeholder="Search"
      icon="search"
      value={query}
      onChange={e => setQuery(e.target.value)}
    />
  );
  
  return { query, queryInput };
};

