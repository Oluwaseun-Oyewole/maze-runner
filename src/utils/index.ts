export default function generateRandomMaze(board_size: number = 15) {
  const board_dimension = Array.from({ length: board_size }, () =>
    Array.from({ length: board_size }, () =>
      Math.floor(Math.random() > 0.7 ? 1 : 0)
    )
  );
  board_dimension[0][0] = 0;
  board_dimension[0][1] = 0;
  board_dimension[1][1] = 0;
  board_dimension[3][3] = 0;
  board_dimension[board_dimension.length - 1][board_dimension.length - 1] = 0;
  board_dimension[board_dimension.length - 1][board_dimension.length - 2] = 0;
  board_dimension[board_dimension.length - 2][board_dimension.length - 2] = 0;
  board_dimension[board_dimension.length - 2][board_dimension.length - 4] = 0;
  return board_dimension;
}

export const randomMazeBoolean = (mode: ModeType) => {
  switch (mode) {
    case "Easy":
      return new Array(15).fill("").map(() => new Array(15).fill(false));
    case "Medium":
      return new Array(17).fill("").map(() => new Array(17).fill(false));
    default:
      return new Array(20).fill("").map(() => new Array(20).fill(false));
  }
};
export type ModeType = "Easy" | "Medium" | "Hard";

function getRandomColor(): string {
  // Generate a random hex color
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const getColorsByMode = (mode: ModeType): string[] => {
  let colorCount: number;

  switch (mode) {
    case "Easy":
      colorCount = 3;
      break;
    case "Medium":
      colorCount = 6;
      break;
    case "Hard":
      colorCount = 9;
      break;
    default:
      throw new Error("Invalid mode");
  }

  const colors: string[] = [];
  for (let i = 0; i < colorCount; i++) {
    colors.push(getRandomColor());
  }

  return colors;
};

export const getRandomIndex = () => {
  return Math.floor(Math.random() * (6 - 0) + 0);
};
