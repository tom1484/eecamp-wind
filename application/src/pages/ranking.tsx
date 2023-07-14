import { FetchResult, FetchedTeamData } from '@/libs/mongo/teams'
import '@styles/pages/ranking.css' 
import { useEffect, useState } from 'react';


const API_URI: string = process.env.NEXT_PUBLIC_API_URI ?? "http://localhost:3000"
const FETCH_URI = `${API_URI}/api/teams/fetch`


export default function Ranking() {

  const [teams, setTeams] = useState<FetchedTeamData[] | undefined>(undefined)

  async function fetchTeams() {
    const fetchTeamsRes = await fetch(FETCH_URI)
    if (!fetchTeamsRes.ok) {
      // throw new Error("Failed to fetch teams")
      console.log(new Error("Failed to fetch teams"))
      return
    }

    const fetchTeamsResult = (await fetchTeamsRes.json()) as FetchResult;
    if (fetchTeamsResult.error) {
      // throw new Error(fetchTeamsResult.error)
      console.log(fetchTeamsResult.error)
      return
    }

    const fetchedTeams = fetchTeamsResult.result as FetchedTeamData[]
    console.log(fetchedTeams)
    setTeams(fetchedTeams)
  }

  useEffect(() => {
    fetchTeams()
    const interval = setInterval(fetchTeams, 1000)
    return () => clearInterval(interval)
  }, [])


  return (
    <div className="Layout">
      <h1 className="Title">NTUEE Camp - lEvEl up</h1>
      <div className="Content">
      </div>
    </div>
  )
}
