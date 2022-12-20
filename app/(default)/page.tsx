import { SVGProps } from "react"
import Link from 'next/link'

import PointsCard from "./PointsCard"

const points = 1000
const friendsRank = 1
const communityRank = 1
const games = [
  {
    name: 'Community leaderboard',
    image: '/community.jpg',
    link: '/community'
  },
  {
    name: 'Friend leaderboard',
    image: '/friends.jpg',
    link: '/friends'
  }
]

export default function LoginPage() {
  return (
    <div>
      <PointsCard points={points} friendsRank={friendsRank} communityRank={communityRank} />

      <div className="grid grid-cols-2 gap-2 mt-3">
        <Link href="/find" className="hover:scale-[102%] duration-75">
          <div className="card card-bordered card-compact w-full bg-base-200 text-base-content">
            <div className="card-body">
              <div className="flex justify-between align-center">
                <h2 className="font-semibold">Find a Bincent</h2>
                <MaterialSymbolsSearch />
              </div>
            </div>
          </div>
        </Link>

        <Link href="/spend" className="hover:scale-[102%] duration-75">
          <div className="card card-bordered card-compact w-full bg-base-200 text-base-content">
            <div className="card-body">
              <div className="flex justify-between align-center">
                <h2 className="font-semibold">Spend your points</h2>
                <MaterialSymbolsWallet />
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-8">
        <h1 className="text-xl font-bold">
          Binteractive games
        </h1>

        {games ? (
          <div className="carousel w-full h-64 mt-3 gap-5">
            {games.map((game, idx) => (
              <div
                id={idx.toString()}
                key={idx.toString()}
                className="carousel-item relative w-64 rounded-xl overflow-hidden drop-shadow-lg"
              >
                <img src="game.image" className="absolute inset-0 object-fill max-w-none h-full w-full" />

                <Link href="game.link" className=" absolute inset-0 p-3">
                  <h2 className="text-white">
                    {game.name}
                  </h2>
                </Link>

                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 text-white">
                  <a href="'#' + (idx > 0 ? idx - 1 : games.length - 1).toString()"
                    className="btn btn-circle btn-sm btn-ghost">❮</a>
                  <a href="'#' + (idx < games.length - 1 ? idx + 1 : 0).toString()"
                    className="btn btn-circle btn-sm btn-ghost">❯</a>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div >
    </div >
  )
}


export function MaterialSymbolsSearch(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="#888888" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95Q10.6 16 9.5 16q-2.725 0-4.612-1.887Q3 12.225 3 9.5q0-2.725 1.888-4.613Q6.775 3 9.5 3t4.613 1.887Q16 6.775 16 9.5q0 1.1-.35 2.075q-.35.975-.95 1.725l6.3 6.3ZM9.5 14q1.875 0 3.188-1.312Q14 11.375 14 9.5q0-1.875-1.312-3.188Q11.375 5 9.5 5Q7.625 5 6.312 6.312Q5 7.625 5 9.5q0 1.875 1.312 3.188Q7.625 14 9.5 14Z"></path></svg>
  )
}

export function MaterialSymbolsWallet(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="#888888" d="M6 20q-1.65 0-2.825-1.175Q2 17.65 2 16V8q0-1.65 1.175-2.825Q4.35 4 6 4h12q1.65 0 2.825 1.175Q22 6.35 22 8v8q0 1.65-1.175 2.825Q19.65 20 18 20ZM6 8h12q.55 0 1.05.125t.95.4V8q0-.825-.587-1.412Q18.825 6 18 6H6q-.825 0-1.412.588Q4 7.175 4 8v.525q.45-.275.95-.4Q5.45 8 6 8Zm-1.85 3.25l11.125 2.7q.225.05.45 0t.425-.2l3.475-2.9q-.275-.375-.7-.612Q18.5 10 18 10H6q-.65 0-1.137.337q-.488.338-.713.913Z"></path></svg>
  )
}
