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

type Mode = "Easy" | "Medium" | "Hard";

function getRandomColor(): string {
  // Generate a random hex color
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const getColorsByMode = (mode: Mode): string[] => {
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
