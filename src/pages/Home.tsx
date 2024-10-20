import { Select } from "@components/Select";
import { useState } from "react";

export const Home = () => {
  const [state, setState] = useState("");
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Select
        options={[<div>Option 1</div>, <div>Option 2</div>]}
        keyProp="label"
        value={state}
        onChange={(e) => setState(e)}
      />
    </div>
  );
};
