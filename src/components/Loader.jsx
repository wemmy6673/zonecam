import {
  ClipLoader,
  PulseLoader,
  CircleLoader,
  GridLoader,
} from "react-spinners";

const spinnersMap = {
  pulse: PulseLoader,
  circle: CircleLoader,
  default: ClipLoader,
  grid: GridLoader,
};

export default function Loader({
  type = "default",
  size = 20,
  color = "349B54",
  inverted = false,
  speedMultiplier = 1.2,
  ...rest
}) {
  if (inverted) color = "#ffffff";

  const RenderProp = spinnersMap[type] || ClipLoader;

  return (
    <div className="flex py-1 flex-row justify-center items-center">
      <RenderProp
        size={size}
        color={color}
        speedMultiplier={speedMultiplier}
        {...rest}
      />
    </div>
  );
}
