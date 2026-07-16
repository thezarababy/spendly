import Expenses from "./expenses";
import Income from "./income";

export default function Summary() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Income />
      <Expenses />
    </div>
  );
}
