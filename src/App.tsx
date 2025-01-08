import { ChangeEvent, useEffect, useState } from "react";
import generateRandomMaze, { ModeType, randomMazeBoolean } from "./utils";

const directions = {
  ArrowUp: [-1, 0],
  ArrowDown: [1, 0],
  ArrowLeft: [0, -1],
  ArrowRight: [0, 1],
};

function App() {
  const [dimensions, setDimensions] = useState(generateRandomMaze);
  const [selectMode, setSelectMode] = useState<ModeType>("Easy");
  const [positions, setPositions] = useState({
    start: [0, 0],
    end: [dimensions?.length - 1, dimensions.length - 1],
  });
  const [steps, setSteps] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [isRevealed, setIsRevealed] = useState(randomMazeBoolean(selectMode));

  function walkingThroughMaze(direction: keyof typeof directions) {
    if (gameWon) return;
    const newRevealed = [...isRevealed];
    const [x, y] = directions[direction];
    const [x0, y0] = positions.start;
    const currentPositionX = x + x0;
    const currentPositionY = y + y0;
    if (dimensions[currentPositionX][currentPositionY] === 1) return;

    newRevealed[0][0] = true;
    newRevealed[currentPositionX][currentPositionY] = true;
    setIsRevealed([...newRevealed]);

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
    setIsRevealed(randomMazeBoolean(mode));
  };

  const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectMode(e.target.value as ModeType);
    resizeMaze(e.target.value as ModeType);
    handleGameReset(e.target.value as ModeType);
  };

  return (
    <main className="relative bg-gray-800 flex-col h-screen w-full text-white flex items-center justify-center overflow-x-hidden">
      <section className="px-10 lg:max-w-[1300px] lg:mx-auto">
        <div
          className={`pb-5 flex items-center justify-between ${
            gameWon ? "z-0 opacity-30" : "z-50"
          } relative`}
        >
          <select
            name=""
            id=""
            disabled={gameWon}
            value={selectMode}
            onChange={selectHandler}
            className="bg-black text-white border-2 border-gray-800 rounded py-2 w-[130px] px-2"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <button
            disabled={gameWon}
            className="bg-gray-800 text-sm px-4 py-2 rounded-lg border-2 border-gray-300"
            onClick={() => handleGameReset(selectMode)}
          >
            Reset Game
          </button>
        </div>

        <div
          className={`fixed bg-gray-900 rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all flex-col eas-in-out duration-500 ${
            gameWon ? "opacity-80" : "opacity-0"
          } ${
            selectMode === "Easy"
              ? "h-[60vh] w-[36%]"
              : selectMode === "Medium"
              ? "h-[70vh] w-[40%]"
              : "h-[80vh] w-[45%]"
          } `}
          onClick={() => handleGameReset(selectMode)}
        >
          <h1>You Win</h1>
          <p>Steps- You moved {steps} times</p>
          <button
            className="bg-green-900 px-7 py-2 rounded-md block mt-3"
            onClick={() => handleGameReset(selectMode)}
          >
            Restart
          </button>
        </div>

        <ul
          className={`border-2 border-gray-300 ${
            selectMode === "Easy"
              ? "bg-gray-900"
              : selectMode === "Medium"
              ? "bg-red-900"
              : "bg-yellow-900"
          } grid ${
            selectMode === "Easy"
              ? "grid-cols-easy-responsive md:grid-cols-easy"
              : selectMode === "Medium"
              ? "grid-cols-medium"
              : "grid-cols-hard"
          }
          
          `}
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
                    gameWon === false
                      ? "bg-yellow-300"
                      : gameWon
                      ? "bg-blue-900"
                      : ""
                  } 
                  ${isRevealed[rowIndex][colIndex] && "bg-yellow-500"}
                  `}
                />
              );
            });
          })}
        </ul>

        <ul
          className={`text-center pt-4 ${
            gameWon ? "opacity-30" : "opacity-100"
          }`}
        >
          <li>Navigate the maze with your arrow keys</li>
          <li>You can only move once through the maze</li>
        </ul>
      </section>
    </main>
  );
}

export default App;
