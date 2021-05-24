import initMaterials from './materials';

const materials = initMaterials;


type plasterBoardType =
  | "Standard"
  | "Insulated";

type materialType =
  | "timber"
  | "concrete";


export const calculateOrder = (wallLength: number, _wallHeight: number = 8, _plasterBoardType: plasterBoardType = "Standard") => {
  const data = calculateBoards(wallLength,_plasterBoardType, _wallHeight);
  // const data = Object.keys(materials["plasterBoards"][_plasterBoardType]);
  return data;
}


const calculateBoards = (wallLength: number, plasterBoardType: plasterBoardType, wallHeight:number) => {
  
  let chosenBoards = Object.entries(materials["plasterBoards"][plasterBoardType]).sort((a,b)=> a[1].height-b[1].height);

  let index = 0;

  console.log(chosenBoards)

  while(chosenBoards[index][1].height<wallHeight){
    index++;
    if(index==chosenBoards.length){
      return 'Wrong size'
    }
  }
  // if(index==chosenBoards.length){
  //   return 'Wrong size'
  // }

  chosenBoards = chosenBoards.splice(index);

  chosenBoards = chosenBoards.filter((length) => length[1].height==chosenBoards[0][1].height);


  chosenBoards.map((value, number) => {
    chosenBoards[number][1].quantity = Math.round(wallLength/chosenBoards[number][1].width);
  })

  console.log(chosenBoards);
  return chosenBoards;

}

