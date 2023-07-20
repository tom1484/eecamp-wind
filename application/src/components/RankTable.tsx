import '@styles/components/RankTable.css'
import { useState } from 'react'

import { FetchedTeamData } from '@/libs/mongo/teams'
import RankEntry from '@/components/RankEntry'


interface RankProps {
  rank?: FetchedTeamData[]
  splitWidth: string[]
  historySplitWidth: string[]
}


export default function RankTable(props: RankProps) {

  const [expandIndex, setExpandIndex] = useState(-1)

  function toggleExpand(index: number) {
    if (index === expandIndex) {
      setExpandIndex(-1)
    }
    else {
      setExpandIndex(index)
    }
  }

  return (
    <div
      className="RankTable" >
      <RankEntry
        type={"header"}
        splitWidth={props.splitWidth}
        historySplitWidth={props.historySplitWidth}
        expand={false} />
      {
        props.rank?.map((team, index) => (
          <RankEntry
            key={team.id}
            onClick={() => { toggleExpand(index) }}
            type={"content"}
            splitWidth={props.splitWidth}
            historySplitWidth={props.historySplitWidth}
            expand={index === expandIndex}
            rank={index + 1}
            entry={team} />
        ))
      }
    </div>
  )
}
