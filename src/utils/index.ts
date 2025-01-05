export default function generateRandomMaze(board_size: number = 20) {
  const board_dimension = Array.from({ length: board_size }, () =>
    Array.from({ length: board_size }, () =>
      Math.floor(Math.random() > 0.5 ? 1 : 0)
    )
  );
  board_dimension[0][0] = 0;
  board_dimension[board_dimension.length - 1][board_dimension.length - 1] = 0;
  return board_dimension;
}

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
      colorCount = 3; // Few colors
      break;
    case "Medium":
      colorCount = 6; // Moderate colors
      break;
    case "Hard":
      colorCount = 9; // More colors
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

export const resizeModeGrid = (mode: ModeType) => {
  switch (mode) {
    case "Easy":
      return "repeat(25, 1fr)";
    case "Medium":
      return "repeat(35, 1fr)";
    default:
      return "repeat(45, 1fr)";
  }
};

export const getRandomIndex = () => {
  return Math.floor(Math.random() * (6 - 0) + 0);
};
