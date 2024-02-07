import React from 'react'

const InitialPlayersSelectionModal  = ({isOpen,players,onSelect,onClose}) => {
    if(!isOpen)
        return null
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-bold">Select a Player</h4>
          <button onClick={onClose} className="text-black">&times;</button>
        </div>
        <ul className="max-h-60 overflow-y-auto">
          {players.map((player, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelect(player)}
            >
              {player.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default InitialPlayersSelectionModal 