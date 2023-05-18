import React from 'react'

import {BsCheckCircle} from 'react-icons/bs'
import { Link } from 'react-router-dom'

export default function SuccessModal({message, to}) {
  return (
    <div className="bg-zinc-200 opacity-90 fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        <div className="border-2 border-gray-300 rounded bg-white px-6 py-5 w-1/3">
        <div className="text-6xl text-center text-green-500 flex justify-center mt-5">
            <BsCheckCircle/>
        </div>
            <div className="text-center mt-5">
                <p className="text-lg font-bold mb-2">Thành Công</p>
                <p className="text-gray-800">{message}</p>
                <a href={to} className="border-2 border-green-600 rounded-lg px-10 py-2 mt-5 text-green-600 block w-1/2 mx-auto">OK</a>
            </div >
        </div>
      </div>
    </div>
  )
}
