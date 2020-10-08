import Hashids from 'hashids'
import classNames from 'classnames'

export function parseURL (url) {
  let parser = document.createElement('a'),
    searchObject = {},
    queries, split, i;
  // Let the browser do the work
  parser.href = url;
  // Convert query string to object
  queries = parser.search.replace(/^\?/, '').split('&');
  for( i = 0; i < queries.length; i++ ) {
    split = queries[i].split('=');
    searchObject[split[0]] = split[1];
  }
  return {
    protocol: parser.protocol,
    host: parser.host,
    hostname: parser.hostname,
    port: parser.port,
    pathname: parser.pathname,
    search: parser.search,
    searchObject: searchObject,
    hash: parser.hash
  };
}

export function parseDomain(url) {
  const psl = require('psl');
  const parsedUrl = parseURL(url)
  const parsed = psl.parse(parsedUrl.hostname);

  return parsed.domain
}

export function generateHashId (value) {
  const hashids = new Hashids()
  return hashids.encode(value)
}

export function getUpDownClass (rank) {
  return classNames(
    {
      'text-success': rank > 0,
      'text-danger': rank < 0,
    })
}

export function storeHiddenColumnEffect ({hiddenColumnsKey, hiddenColumns}) {
  function storeColumns(columns) {
    if(columns.length) {
      window.localStorage.setItem(hiddenColumnsKey, JSON.stringify(columns))
    }
  }

  storeColumns(hiddenColumns)
}