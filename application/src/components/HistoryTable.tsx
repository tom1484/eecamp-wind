import '@styles/components/HistoryTable.css'
import { useRef } from 'react'

import { FetchedHistoryData } from '@/libs/mongo/teams'
import HistoryEntry from '@/components/HistoryEntry'


interface HistoryProps {
  splitWidth: string[]
  expand: boolean
  history?: FetchedHistoryData[]
}


export default function HistoryTable(props: HistoryProps) {

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      data-expand={props.expand}
      data-height={ref.current?.clientHeight}
      tabIndex={0}
      className="HistoryTableContainer">
      <div
        // ref={animationParent}
        data-expand={props.expand}
        className="HistoryTable" >
        <HistoryEntry type={"header"} splitWidth={props.splitWidth} />
        <div className="HistoryList">
          {
            props.history?.length === 0 ?
              <HistoryEntry
                type={"empty"}
                splitWidth={["100%"]}
              /> :
              props.history?.map((entry, index) => (
                <HistoryEntry
                  key={index}
                  type={"content"}
                  splitWidth={props.splitWidth}
                  entry={entry} />
              ))
          }
        </div>
      </div>
    </div>
  )
}
