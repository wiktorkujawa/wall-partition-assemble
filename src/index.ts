import initMaterials from './materials';

let materials = { ...initMaterials };

type IplasterBoardType = 'Standard' | 'Insulated';

type ImetalMaterial = 'Steel' | 'Aluminium';

type ImaterialType = 'Lumber' | 'Concrete';

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

  materials.fixings.waferHeadScrews = 0;
  materials.fixings.nailablePlugs = 0;
  materials.fixings.highThreadScrews = 0;

  // Connecting bottom track to floor
  floorMaterial === 'Lumber'
    ? (materials.fixings.waferHeadScrews += Math.ceil(wallLength / 2) + 1)
    : (materials.fixings.nailablePlugs += Math.ceil(wallLength / 2) + 1);

  // Connecting first stud to wall
  connectedWallMaterial === 'Lumber'
    ? (materials.fixings.highThreadScrews += Math.ceil(wallHeight / 2))
    : (materials.fixings.nailablePlugs += Math.ceil(wallHeight / 2));

  // Connecting upper track to ceiling
  ceilingMaterial === 'Lumber'
    ? (materials.fixings.highThreadScrews += Math.ceil(wallLength / 2) + 1)
    : (materials.fixings.nailablePlugs += Math.ceil(wallLength / 2) + 1);

  // Connecting last stud to both tracks
  materials.fixings.waferHeadScrews += 4;

  const boards = calculateBoards(wallLength, wallHeight);

  if (!boards) {
    return 'Theres no boards for that high wall';
  }

  const stoods = calculateStoodsAndTapingScrews(boards, wallHeight);

  const tracks = chooseTracks(wallLength);

  const firstChoice = [
    {
      name: boards[0][0],
      quantity: boards[0][1].quantity,
    },
    {
      name: stoods[0][0],
      quantity: stoods[0][1].quantity,
    },
    {
      name: tracks[0][0],
      quantity: tracks[0][1].quantity,
    },
  ];

  Object.entries(materials.fixings).map((screws) => {
    if (screws[1] !== 0) firstChoice.push({ name: screws[0], quantity: screws[1] });
  });

  return firstChoice;
};

const chooseTracks = (wallLength: number) => {
  let chosenTracks: any = Object.entries(Object.entries(materials.metalFrames)[0][1]);

  let minimumTracks = Number.MAX_SAFE_INTEGER;

  // Setting number of tracks
  chosenTracks = chosenTracks.map((track: any) => {
    track[1].quantity = 2 * Math.ceil(wallLength / track[1].length);
    if (minimumTracks >= track[1].quantity) {
      minimumTracks = track[1].quantity;
      return track;
    }
  });

  chosenTracks = chosenTracks.filter((track: any) => track[1].quantity === minimumTracks);

  return chosenTracks;
};

const calculateBoards = (wallLength: number, wallHeight: number) => {
  let chosenBoards: any = Object.entries(materials.plasterBoards);

  let index = 0;

  // Removing too short boards

  chosenBoards.sort((board1: any, board2: any) => board1[1].height - board2[1].height);

  while (chosenBoards[index][1].height < wallHeight) {
    index++;
    if (index === chosenBoards.length) {
      return false;
    }
  }

  chosenBoards = chosenBoards.splice(index);

  // Keeping the most optimal boards
  chosenBoards = chosenBoards.filter((length: any) => length[1].height === chosenBoards[0][1].height);

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
  chosenBoards = chosenBoards.filter((board: any) => board[1].quantity === minimumBoards);
  return chosenBoards;
};

const calculateStoodsAndTapingScrews = (boards: any, wallHeight: number) => {
  let chosenStoods: any = Object.entries(Object.entries(materials.metalFrames)[1][1]);

  // Removing too short stoods
  chosenStoods = chosenStoods.filter((stood: any) => stood[1].length >= wallHeight);

  // Keeping most optimal stood type
  if (chosenStoods.length > 1) {
    let optimalStoodLength = chosenStoods[0][1].length;
    chosenStoods = chosenStoods.reduce((acc: any, stood: any) => {
      if (optimalStoodLength >= stood[1].length) {
        optimalStoodLength = stood[1].length;
        return (acc = stood);
      }
    }, []);
  }

  // Creating array of stoods with length of boards options
  const newStoods: any[] = [];
  let numberOfStoods = boards[0][1].quantity + 1;
  boards.map((board: any, index: number) => {
    numberOfStoods = board[1].quantity + 1;
    newStoods.push(chosenStoods);
    newStoods[index][1].quantity = numberOfStoods;
  });

  // 1 Plug per 1 foot
  if (numberOfStoods === 2) {
    numberOfStoods = 3;
  }

  materials.fixings.selfTapingSrews =
    2 * ((numberOfStoods - 2) * 2 * wallHeight + (2 + numberOfStoods - 1) * wallHeight);

  return newStoods;
};
