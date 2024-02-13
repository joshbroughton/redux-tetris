import { useSelector } from "react-redux";

// Displays a message
export default function MessagePopup(props) {
  const { isRunning, gameOver } = useSelector((state) => state)

  return (
    <div className={isRunning && !gameOver ? 'message-popup hidden' : 'message-popup'}>
      <h1>{gameOver ? 'Game Over' : 'Paused'}</h1>
    </div>
  )
}
