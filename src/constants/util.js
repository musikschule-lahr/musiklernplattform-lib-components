export const playerTypes = {
  KORREPETITION: 0,
  ENSEMBLE_BAND: 1,
  SOLO: 2,
};
export const getFilePath = (name, libElement) => `${
  process.env.FILE_SERVER_BASE_URL}${libElement.productionNo.replace(/-/g, '_')}/${name}`;

export default { playerTypes, getFilePath };
