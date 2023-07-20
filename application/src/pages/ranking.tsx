import { useEffect, useState } from 'react'
import '@styles/pages/ranking.css'

import { FetchResult, FetchedTeamData } from '@/libs/mongo/teams'
import RankTable from '@/components/RankTable'

const API_URI: string = process.env.NEXT_PUBLIC_API_URI ?? "http://localhost:3000"
const FETCH_URI = `${API_URI}/api/teams/fetch`


export default function Ranking() {

  const [teams, setTeams] = useState<FetchedTeamData[] | undefined>(undefined)

  async function fetchTeams() {
    try {
      const fetchTeamsRes = await fetch(FETCH_URI)
      if (!fetchTeamsRes.ok) {
        throw new Error("Failed to fetch teams")
      }
      const fetchTeamsResult = (await fetchTeamsRes.json()) as FetchResult
      if (fetchTeamsResult.error) {
        throw fetchTeamsResult.error
      }

      const fetchedTeams = fetchTeamsResult.result as FetchedTeamData[]
      console.log(fetchedTeams)
      setTeams(fetchedTeams.sort((a, b) => b.score - a.score))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTeams()
    const interval = setInterval(fetchTeams, 5000)
    return () => clearInterval(interval)
  }, [])


  const rankWidth = "7em"
  const teamNameWidth = "10em"
  const scoreWidth = "7em"
  const splitWidth = [
    rankWidth, teamNameWidth, scoreWidth
  ]

  const historyRFIDWidth = "40%"
  const historyScoreWidth = "15%"
  const historyTimestampWidth = "45%"
  const historySplitWidth = [
    historyRFIDWidth,
    historyScoreWidth,
    historyTimestampWidth
  ]

  return (
    <div className="Body">
      <div className="Layout">
        <h1 className="Title">NTUEE Camp - lEvEl up</h1>
        <RankTable
          rank={teams}
          splitWidth={splitWidth}
          historySplitWidth={historySplitWidth} />
      </div>
    </div>
  )
}
