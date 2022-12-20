import Link from 'next/link'

export default function PointsCard({ points, friendsRank, communityRank }: { points: number, friendsRank: number, communityRank: number }) {
  return (
    <div className="card card-compact w-full bg-secondary text-secondary-content">
      <div className="card-body">
        {points ? (
          <h2 className="card-title text-4xl">{points} points</h2>
        ) : (
          <progress className="progress w-56"></progress>
        )}


        <div className="grid grid-cols-2 mt-3">
          <div>
            <h3 className="text-sm font-bold">Community rank</h3>
            <span className="text-lg">
              #{communityRank}
            </span>
          </div>

          <div>
            <h3 className="text-sm font-bold">Friends rank</h3>
            <span className="text-lg">
              #{friendsRank}
            </span>
          </div>
        </div>

        <div className="card-actions justify-end">
          <Link href="/breakdown" className="btn btn-sm">View breakdown</Link>
        </div>
      </div>
    </div>
  )
}
