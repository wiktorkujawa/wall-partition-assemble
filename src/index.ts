import initMaterials from './materials';
import { IBoard, ImaterialType, ImetalMaterial, IplasterBoardType, ITrack } from './types';

let materials = { ...initMaterials };

export const calculateOrder = (
  wallLength: number,
  wallHeight: number = 8,
  plasterBoardType: IplasterBoardType = 'Standard',
  floorMaterial: ImaterialType = 'Lumber',
  ceilingMaterial: ImaterialType = 'Lumber',
  connectedWallMaterial: ImaterialType = 'Lumber',
  metalFrameMaterial: ImetalMaterial = 'Steel',
) => {
  // Init materials
  materials = { ...initMaterials };

  // Filtering materials
  materials.plasterBoards = materials.plasterBoards[plasterBoardType];
  materials.metalFrames = materials.metalFrames[metalFrameMaterial];

  materials.fixings.waferHeadScrews.quantity = 0;
  materials.fixings.nailablePlugs.quantity = 0;
  materials.fixings.highThreadScrews.quantity = 0;

  // Connecting bottom track to floor
  floorMaterial === 'Lumber'
    ? (materials.fixings.waferHeadScrews.quantity += Math.ceil(wallLength / 2) + 1)
    : (materials.fixings.nailablePlugs.quantity += Math.ceil(wallLength / 2) + 1);

  // Connecting first stud to wall
  connectedWallMaterial === 'Lumber'
    ? (materials.fixings.highThreadScrews.quantity += Math.ceil(wallHeight / 2))
    : (materials.fixings.nailablePlugs.quantity += Math.ceil(wallHeight / 2));

  // Connecting upper track to ceiling
  ceilingMaterial === 'Lumber'
    ? (materials.fixings.highThreadScrews.quantity += Math.ceil(wallLength / 2) + 1)
    : (materials.fixings.nailablePlugs.quantity += Math.ceil(wallLength / 2) + 1);

  // Connecting last stud to both tracks
  materials.fixings.waferHeadScrews.quantity += 4;

  const boards = calculateBoards(wallLength, wallHeight);

  if (!boards) {
    return [];
  }

  const stoods = calculateStoodsAndTapingScrews(boards, wallHeight);

  const tracks = chooseTracks(wallLength);

  const firstChoice = [
    {
      name: boards[0][0],
      quantity: boards[0][1].quantity,
      image: boards[0][1].image,
    },
    {
      name: stoods[0][0],
      quantity: stoods[0][1].quantity,
      image: stoods[0][1].image,
    },
    {
      name: tracks[0][0],
      quantity: tracks[0][1].quantity,
      image: tracks[0][1].image,
    },
  ];

  Object.entries(materials.fixings).map((screws) => {
    if (screws[1].quantity !== 0)
      firstChoice.push({ name: screws[0], quantity: screws[1].quantity, image: screws[1].image });
  });

  return firstChoice;
};

const chooseTracks = (wallLength: number) => {
  let chosenTracks: ITrack[] = Object.entries(Object.entries(materials.metalFrames)[0][1]);

  let minimumTracks = Number.MAX_SAFE_INTEGER;

  // Setting number of tracks
  chosenTracks = chosenTracks.map((track: any) => {
    track[1].quantity = 2 * Math.ceil(wallLength / track[1].length);
    if (minimumTracks >= track[1].quantity) {
      minimumTracks = track[1].quantity;
      return track;
    }
  });

  chosenTracks = chosenTracks.filter((track: ITrack) => track[1].quantity === minimumTracks);

  return chosenTracks;
};

const calculateBoards = (wallLength: number, wallHeight: number) => {
  let chosenBoards: IBoard[] = Object.entries(materials.plasterBoards);

  let index = 0;

  // Removing too short boards

  chosenBoards.sort((board1: IBoard, board2: IBoard) => board1[1].height - board2[1].height);

  while (chosenBoards[index][1].height < wallHeight) {
    index++;
    if (index === chosenBoards.length) {
      return false;
    }
  }

  chosenBoards = chosenBoards.splice(index);

  // Keeping the most optimal boards
  chosenBoards = chosenBoards.filter((board: IBoard) => board[1].height === chosenBoards[0][1].height);

  // Calculating number of boards
  let minimumBoards = Number.MAX_SAFE_INTEGER;

  chosenBoards = chosenBoards.map((board: any) => {
    board[1].quantity =
      Math.ceil(wallLength / board[1].width) + Math.ceil((wallLength - board[1].width / 2) / board[1].width);

    if (board[1].width >= 2 * wallLength) {
      board[1].quantity = 1;
    }

    if (board[1].width < 2 * wallLength && board[1].width >= wallLength) {
      board[1].quantity = 2;
    }

    if (minimumBoards >= board[1].quantity) {
      minimumBoards = board[1].quantity;
      return board;
    }
  });

  // Keeping the smallest amount options
  chosenBoards = chosenBoards.filter((board: IBoard) => board[1].quantity === minimumBoards);
  return chosenBoards;
};

const calculateStoodsAndTapingScrews = (boards: IBoard[], wallHeight: number) => {
  let chosenStoods: ITrack[] = Object.entries(Object.entries(materials.metalFrames)[1][1]);

  // Removing too short stoods
  chosenStoods = chosenStoods.filter((stood: ITrack) => stood[1].length >= wallHeight);

  let chosenStood: ITrack;
  // Keeping most optimal stood type
  if (chosenStoods.length > 1) {
    let optimalStoodLength = chosenStoods[0][1].length;
    chosenStood = chosenStoods.reduce((acc: any, stood: any) => {
      if (optimalStoodLength >= stood[1].length) {
        optimalStoodLength = stood[1].length;
        return (acc = stood);
      }
    }, []);
  }
  if (chosenStoods.length === 1) {
    chosenStood = chosenStoods[0];
  }

  // Creating array of stoods with length of boards options
  const newStoods: ITrack[] = [];
  let numberOfStoods = boards[0][1].quantity + 1;
  boards.map((board: IBoard, index: number) => {
    numberOfStoods = board[1].quantity + 1;
    newStoods.push(chosenStood);
    newStoods[index][1].quantity = numberOfStoods;
  });

  // 1 Plug per 1 foot
  if (numberOfStoods === 2) {
    numberOfStoods = 3;
  }

  materials.fixings.selfTapingSrews.quantity =
    4 * wallHeight +
    Math.floor((numberOfStoods - 2) / 2) * 4 * wallHeight +
    (Math.floor((numberOfStoods - 2) / 2) + 1) * 2 * wallHeight;

  return newStoods;
};
