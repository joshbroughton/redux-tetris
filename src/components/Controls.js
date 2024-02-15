import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { moveDown, moveLeft, moveRight, rotate } from '../features/gameSlice';

export default function Controls(props) {
  const dispatch = useDispatch();
  const { isRunning, speed } = useSelector((state) => state)

  const requestRef = useRef()
  const lastUpdateTimeRef = useRef(0)
  const progressTimeRef = useRef(0)

  const update = (time) => {
    requestRef.current = requestAnimationFrame(update)
    // if the game isn't running, do nothing
    if (!isRunning) {
      return
    }
    // if the time ref isn't set, set it to time
    if (!lastUpdateTimeRef.current) {
      lastUpdateTimeRef.current = time
    }
    // set deltatime to the difference between time and last time
    const deltaTime = time - lastUpdateTimeRef.current
    progressTimeRef.current += deltaTime
    // if if the progress time is now greater than speed, issue a moveDown
    if (progressTimeRef.current > speed) {
      dispatch(moveDown())
      // and reset current time to 0
      progressTimeRef.current = 0
    }
    lastUpdateTimeRef.current = time
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current)
  }, [isRunning])

  return (
  <div className="controls">
    {/* left */}
    <button
      disabled={!isRunning}
      className="control-button"
      onClick={(e) => {
          dispatch(moveLeft());
        }
      }>Left</button>

    {/* right */}
    <button
      disabled={!isRunning}
      className="control-button"
      onClick={(e) => {
          dispatch(moveRight());
        }
      }>Right</button>

    {/* rotate */}
    <button
      disabled={!isRunning}
      className="control-button"
      onClick={(e) => {
          dispatch(rotate());
        }
      }>Rotate</button>

    {/* down */}
    <button
      disabled={!isRunning}
      className="control-button"
      onClick={(e) => {
          dispatch(moveDown());
        }
      }>Down</button>
  </div>
  )
}
