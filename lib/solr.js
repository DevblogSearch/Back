var SolrNode = require('solr-node');

var solrClient = new SolrNode({
  host: 'localhost',
  port: '8983',
  core: 'naratmalssm',
  protocol: 'http',
  debugLevel: 'ERROR' 
});

module.exports = function() {
  return solrClient;
}
