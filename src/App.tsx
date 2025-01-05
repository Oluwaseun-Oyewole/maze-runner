import { ChangeEvent, useState } from "react";
import generateRandomMaze, {
  getColorsByMode,
  getRandomIndex,
  ModeType,
  resizeModeGrid,
} from "./utils";

function App() {
  const [dimensions, setDimensions] = useState(generateRandomMaze());
  const [selectMode, setSelectMode] = useState<ModeType>("Easy");
  const [colors, setColor] = useState<string[]>(getColorsByMode(selectMode));

  function resizeMaze(mode: ModeType) {
    switch (mode) {
      case "Easy":
        return setDimensions(generateRandomMaze(25));
      case "Medium":
        return setDimensions(generateRandomMaze(30));
      default:
        return setDimensions(generateRandomMaze(35));
    }
  }

  const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectMode(e.target.value as ModeType);
    resizeMaze(e.target.value as ModeType);
    setColor(getColorsByMode(e.target.value as ModeType));
  };

  return (
    <main
      className="relative flex-col h-screen w-full text-white flex items-center justify-center overflow-x-hidden"
      style={{ backgroundColor: colors[getRandomIndex()] }}
    >
      <section className="max-w-[1300px] mx-auto">
        <div className="pb-5">
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
        </div>
        <ul
          className="border-2 border-gray-300 bg-gray-900"
          style={{
            display: "grid",
            gridTemplateColumns: resizeModeGrid(selectMode),
          }}
        >
          {dimensions?.map((dimension) => {
            return dimension?.map((col, index) => {
              return (
                <li
                  key={index}
                  className={`${
                    col === 0 ? "" : "border-2 w-6 h-6 border-gray-400"
                  } flex  items-center justify-center`}
                >
                  {/* {col} */}
                </li>
              );
            });
          })}
        </ul>
      </section>
    </main>
  );
}

export default App;
