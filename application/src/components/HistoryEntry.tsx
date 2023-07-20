import { FetchedHistoryData } from '@/libs/mongo/teams'
import '@styles/components/HistoryEntry.css'

interface HistoryEntryProps {
  type: string
  splitWidth: string[]
  onClick?: () => void
  entry?: FetchedHistoryData
}

export default function HistoryHistoryEntry(props: HistoryEntryProps) {

  if (props.type === "header") {
    return (
      <div className="HistoryHeader">
        <div className="HistoryCell" style={{ width: props.splitWidth[0] }}>
          RFID
        </div>
        <div className="HistoryCell" style={{ width: props.splitWidth[1] }}>
          Score
        </div>
        <div className="HistoryCell" style={{ width: props.splitWidth[2] }}>
          Time
        </div>
      </div>
    )
  }
  else if (props.type === "content") {
    return (
      <div className="HistoryEntry" onClick={props.onClick}>
        <div className="HistoryCell" style={{ width: props.splitWidth[0] }}>
          {props.entry?.RFID}
        </div>
        <div className="HistoryCell" style={{ width: props.splitWidth[1] }}>
          {props.entry?.score}
        </div>
        <div className="HistoryCell" style={{ width: props.splitWidth[2] }}>
          {props.entry?.timestamp}
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="HistoryEntry" onClick={props.onClick}>
        <div className="HistoryCell" style={{ width: props.splitWidth[0] }}>
          No Record
        </div>
      </div>
    )
  }
}
