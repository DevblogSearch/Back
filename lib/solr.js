var SolrNode = require('solr-node');

var solrClient = new SolrNode({
      host: 'ec2-52-78-115-199.ap-northeast-2.compute.amazonaws.com',
      port: '8983',
      core: 'naratmalssm',
      protocol: 'http',
      debugLevel: 'ERROR' 
});

module.exports = function() {
  return solrClient;
}
