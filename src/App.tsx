import { ChangeEvent, useEffect, useState } from "react";
import generateRandomMaze, {
  getColorsByMode,
  getRandomIndex,
  ModeType,
  resizeModeGrid,
} from "./utils";

const directions = {
  ArrowUp: [-1, 0],
  ArrowDown: [1, 0],
  ArrowLeft: [0, -1],
  ArrowRight: [0, 1],
};

function App() {
  const [dimensions, setDimensions] = useState(generateRandomMaze());
  const [selectMode, setSelectMode] = useState<ModeType>("Easy");
  const [colors, setColors] = useState<string[]>(getColorsByMode(selectMode));
  const [positions, setPositions] = useState({
    start: [0, 0],
    end: [dimensions?.length - 1, dimensions.length - 1],
  });
  const [steps, setSteps] = useState(0);
  const [gameWon, setGameWon] = useState(true);

  function walkingThroughMaze(direction: keyof typeof directions) {
    if (gameWon) return;
    const [x, y] = directions[direction];
    const [x0, y0] = positions.start;
    const currentPositionX = x + x0;
    const currentPositionY = y + y0;

    if (
      currentPositionX >= 0 &&
      currentPositionX < dimensions.length &&
      currentPositionY >= 0 &&
      currentPositionY < dimensions.length &&
      dimensions[currentPositionX][currentPositionY] === 0
    ) {
      setSteps((count) => count + 1);
      setPositions((prev) => {
        return { ...prev, start: [currentPositionX, currentPositionY] };
      });

      if (
        currentPositionX === dimensions.length - 1 &&
        currentPositionY === dimensions.length - 1
      ) {
        setGameWon(true);
      }
    }
  }

  useEffect(() => {
    setPositions((prev) => {
      return { ...prev, end: [dimensions?.length - 1, dimensions.length - 1] };
    });
  }, [dimensions]);
  useEffect(() => {
    const handleKeyboardMovement = (event: KeyboardEvent) => {
      if (event.key in directions)
        walkingThroughMaze(event.key as keyof typeof directions);
    };

    document.addEventListener("keydown", handleKeyboardMovement);
    return () =>
      document.removeEventListener("keydown", handleKeyboardMovement);
  }, [positions.start]);

  useEffect(() => {
    const [x, y] = positions.start;
    dimensions[x][y] = 1;
  }, [positions.start]);

  function resizeMaze(mode: ModeType) {
    switch (mode) {
      case "Easy":
        return setDimensions(generateRandomMaze(15));
      case "Medium":
        return setDimensions(generateRandomMaze(17));
      default:
        return setDimensions(generateRandomMaze(20));
    }
  }

  const handleGameReset = (mode: ModeType) => {
    resizeMaze(mode);
    setPositions((positions) => {
      return { ...positions, start: [0, 0] };
    });
    setSteps(0);
    setGameWon(false);
  };

  const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectMode(e.target.value as ModeType);
    resizeMaze(e.target.value as ModeType);
    setColors(getColorsByMode(e.target.value as ModeType));
  };

  return (
    <main
      className="relative bg-gray-800 flex-col h-screen w-full text-white flex items-center justify-center overflow-x-hidden"
      // style={{ backgroundColor: colors[getRandomIndex()] }}
    >
      <section className="max-w-[1300px] mx-auto">
        <div
          className={`pb-5 flex items-center justify-between ${
            gameWon ? "z-0" : "z-50"
          } relative`}
        >
          <select
            name=""
            id=""
            value={selectMode}
            onChange={selectHandler}
            className="bg-black text-white border-2 border-gray-800 rounded py-2 w-[130px] px-2"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <p>Steps moved - {steps}</p>
          <button
            className="bg-gray-800 text-sm px-5 py-3 rounded-lg"
            onClick={() => handleGameReset(selectMode)}
          >
            Reset Game
          </button>
        </div>

        <div
          className={`fixed bg-gray-900 rounded-md  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] flex items-center justify-center transition-all flex-col eas-in-out duration-500 ${
            gameWon ? "opacity-80" : "opacity-0"
          }`}
        >
          <h1>You Win</h1>
          <h1></h1>
          <button
            className="bg-green-900 px-7 py-2 rounded-md block mt-3"
            onClick={() => handleGameReset(selectMode)}
          >
            Restart
          </button>
        </div>

        <ul
          className="border-2 border-gray-300 bg-gray-900"
          style={{
            display: "grid",
            gridTemplateColumns: resizeModeGrid(selectMode),
            backgroundColor: colors[getRandomIndex()],
          }}
        >
          {dimensions?.map((dimension, rowIndex) => {
            return dimension?.map((col, colIndex) => {
              return (
                <li
                  key={`${rowIndex}-${colIndex}`}
                  className={`${
                    col === 0 ? "" : "border-2 w-8 h-8 border-gray-400"
                  } flex items-center justify-center ${
                    positions?.start[0] === rowIndex &&
                    positions?.start[1] === colIndex
                      ? "bg-blue-500"
                      : col === 1
                      ? "bg-green-900"
                      : ""
                  } ${
                    positions?.end[0] === rowIndex &&
                    positions?.end[0] === colIndex &&
                    "bg-yellow-300"
                  } 
               
                  `}
                />
              );
            });
          })}
        </ul>
      </section>
    </main>
  );
}

export default App;
