import { FetchedTeamData } from '@/libs/mongo/teams'
import '@styles/components/RankEntry.css'
import HistoryTable from './HistoryTable'

interface RankEntryProps {
  type: string
  splitWidth: string[]
  historySplitWidth: string[]
  expand: boolean
  onClick?: () => void
  rank?: number
  entry?: FetchedTeamData
}

export default function RankEntry(props: RankEntryProps) {

  function onClick() {
    props.onClick?.()
    // setTimeout(() => ref.current?.scrollIntoView({
    //   behavior: "smooth",
    // }), 500)
    // console.log(ref.current?.clientHeight)
  }

  if (props.type === "header") {
    return (
      <div className="RankHeader">
        <div className="RankCell" style={{ width: props.splitWidth[0] }}>
          Rank
        </div>
        <div className="RankCell" style={{ width: props.splitWidth[1] }}>
          Team Name
        </div>
        <div className="RankCell" style={{ width: props.splitWidth[2] }}>
          Score
        </div>
      </div>
    )
  }
  else {
    return (
      <div>
        <div
          className="RankEntry"
          onClick={onClick}>
          <div className="RankCell" style={{ width: props.splitWidth[0] }}>
            {props.rank}
          </div>
          <div className="RankCell" style={{ width: props.splitWidth[1] }}>
            {props.entry?.name}
          </div>
          <div className="RankCell" style={{ width: props.splitWidth[2] }}>
            {props.entry?.score}
          </div>
        </div>
        <HistoryTable
          history={props.entry?.history.slice().reverse()}
          splitWidth={props.historySplitWidth}
          expand={props.expand} />
      </div>
    )
  }
}
