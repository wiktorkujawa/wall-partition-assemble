export type IplasterBoardType = 'Standard' | 'Insulated';

export type ImetalMaterial = 'Steel' | 'Aluminium';

export type ImaterialType = 'Lumber' | 'Concrete';

interface ITrackProperties {
  length: number;
  width: number;
  quantity: number;
  image: string;
}

export type ITrack = [string, ITrackProperties];

interface IBoardProperties {
  width: number;
  height: number;
  thickness: number;
  quantity: number;
  image: string;
}

export type IBoard = [string, IBoardProperties];
