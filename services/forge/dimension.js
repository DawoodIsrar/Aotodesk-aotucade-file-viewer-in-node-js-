const { AuthClientTwoLegged, DerivativesApi } = require('forge-apis');
const { FORGE_CLIENT_ID, FORGE_CLIENT_SECRET } = require('../../config.js');

let internalAuthClient = new AuthClientTwoLegged(FORGE_CLIENT_ID, FORGE_CLIENT_SECRET, ['data:read', 'data:write', 'data:create', 'viewables:read'], true);
let derivativesApi = new DerivativesApi();

async function getInternalToken() {
  if (!internalAuthClient.isAuthorized()) {
    await internalAuthClient.authenticate();
  }
  return internalAuthClient.getCredentials();
}

async function getDimensions(urn) {
  let token = await getInternalToken();
  let response = await derivativesApi.getMetadata(urn, {}, {Authorization: 'Bearer ' + token.access_token});
  let metadata = response.body.data.metadata;
  let properties = metadata.data.objects[0].properties;
  let xLength = properties.Extents.Max.x - properties.Extents.Min.x;
  let yLength = properties.Extents.Max.y - properties.Extents.Min.y;
  let zLength = properties.Extents.Max.z - properties.Extents.Min.z;
  console.log(xLengthy+"y"+yLength+"z"+ zLength)
  return {x: xLength, y: yLength, z: zLength};
}

module.exports = {
  getDimensions
};
