import initMaterials from './materials';

const materials = initMaterials;

type plasterBoardType = 'Standard' | 'Insulated';

type metalMaterial = 'Steel' | 'Aluminium';

type materialType = 'timber' | 'concrete';

export const calculateOrder = (
  wallLength: number,
  wallHeight: number = 8,
  plasterBoardType: plasterBoardType = 'Standard',
  floorMaterial: materialType = 'timber',
  ceilingMaterial: materialType = 'timber',
  connectedWallMaterial: materialType = 'timber',
  metalFrameMaterial: metalMaterial = 'Steel',
) => {
  materials['plasterBoards'] = materials['plasterBoards'][plasterBoardType];
  materials['metalFrames'] = materials['metalFrames'][metalFrameMaterial];

  
  floorMaterial=='timber'? 
    materials['fixings']['waferHeadScrews']+= Math.ceil(wallLength/2)+1 : 
    materials['fixings']['nailablePlugs']+= Math.ceil(wallLength/2)+1

  
  connectedWallMaterial=='timber'? 
    materials['fixings']['highThreadScrews']+= Math.ceil(wallHeight/2) : 
    materials['fixings']['nailablePlugs']+= Math.ceil(wallHeight/2)

  ceilingMaterial=='timber'? 
    materials['fixings']['highThreadScrews']+= Math.ceil(wallLength/2)+1 : 
    materials['fixings']['nailablePlugs']+= Math.ceil(wallLength/2)+1



    console.log(materials);
  // chooseTracks(wallLength);

  const boards = calculateBoards(wallLength, wallHeight);
  // const data = Object.keys(materials["plasterBoards"][_plasterBoardType]);
  if (!boards) {
    return 'Lack of boards';
  }

  return boards;
};

const chooseTracks = (wallLength: number) => {
  let chosenTracks: any = Object.entries(Object.entries(materials['metalFrames'])[0][1]);

  console.log(chosenTracks);

  let minimumTracks = Number.MAX_SAFE_INTEGER;

  chosenTracks = chosenTracks.map((track: any) => {
    track[1].quantity = 2*Math.ceil(wallLength / track[1].length);
    if (minimumTracks >= track[1].quantity) {
      minimumTracks = track[1].quantity;
      return track;
    }
  });



  chosenTracks = chosenTracks.filter((track: any) => track[1].quantity == minimumTracks);

  console.log(chosenTracks);
  return chosenTracks;
};



const calculateBoards = (wallLength: number, wallHeight: number) => {
  let chosenBoards: any = Object.entries(materials['plasterBoards']);

  let index = 0;

  while (chosenBoards[index][1].height < wallHeight) {
    index++;
    if (index == chosenBoards.length) {
      return false;
    }
  }

  chosenBoards = chosenBoards.splice(index);
  chosenBoards = chosenBoards.filter((length: any) => length[1].height == chosenBoards[0][1].height);

  let minimumBoards = Number.MAX_SAFE_INTEGER;

  chosenBoards = chosenBoards.map((board: any) => {
    board[1].quantity =
      Math.ceil(wallLength / board[1].width) + Math.ceil((wallLength - board[1].width / 2) / board[1].width);
    if (minimumBoards >= board[1].quantity) {
      minimumBoards = board[1].quantity;
      return board;
    }
  });

  chosenBoards = chosenBoards.filter((board: any) => board[1].quantity == minimumBoards);
  return chosenBoards;
};
