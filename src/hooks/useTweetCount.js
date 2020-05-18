import { useState } from "react";

export function useTweetCount(max_chars) {
  const [state, setState] = useState({ chars_left: max_chars });
  const handlecharChange = (event, cb) => {
    var input = event.target.value;
    setState({
      chars_left: max_chars - input.length,
    });
    if (cb) {
      cb();
    }
  };
  return [state, handlecharChange];
}
