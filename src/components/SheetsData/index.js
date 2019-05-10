import { FETCH } from 'utils/FETCH';

key = 'AIzaSyCQ7_0LJbkOSwEni30tqih4e_vN2fDIZ9k';

ID = Object.freeze({
  root: '1fIbkh2C2daDOJPk-vvpWKOTbHOwvjiS2',
  derived: '1qMCRSfBtrOWzzYP5HQjk9J4uipNkbaDP',
  measurements: '1nvk-XK9SY1_KmdSXyGzGLjNIJXDipFKO',
  solcast: '1Tgn9yD6HzDxOV4uOBrOHWWQ2FVuc41yJ',
});

async function getRange(spreadsheetId, range = 'A1:Z1000000') {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${key}`;
  return (await FETCH(url)).values;
}

async function mostRecentFile(folder) {
  const url = `https://www.googleapis.com/drive/v3/files?orderBy=recency&q=%27${
    ID[folder]
  }%27%20in%20parents&pageSize=1&key=${key}`;
  return (await FETCH(url)).files[0].id;
}

export default {};
