import { MonitorModel } from '@/database/models/monitor-model'
import { monitorRepository } from '@/database/repositories/monitor-repository'
import React, { useContext } from 'react'

interface MonitorContext {
  monitors: MonitorModel[]
  selectedMonitor: MonitorModel | null
}

interface MonitorContextProviderProps {
  children: React.ReactNode
}

const MonitorContext = React.createContext({} as MonitorContext)

const MonitorContextProvider = (props: MonitorContextProviderProps) => {
  const [monitors, setMonitors] = React.useState<MonitorModel[]>([])
  const [selectedMonitor, setSelectedMonitor] =
    React.useState<MonitorModel | null>(null)

  React.useEffect(() => {
    const monitorsSubscription = monitorRepository
      .observeAll()
      .subscribe((monitors) => setMonitors(monitors))

    const selectedMonitorSubscription = monitorRepository
      .observeSelected()
      .subscribe((monitors) => setSelectedMonitor(monitors[0] ?? null))

    return () => {
      monitorsSubscription.unsubscribe()
      selectedMonitorSubscription.unsubscribe()
    }
  }, [])

  return (
    <MonitorContext.Provider
      value={{
        monitors,
        selectedMonitor,
      }}
    >
      {props.children}
    </MonitorContext.Provider>
  )
}

const useMonitor = () => useContext(MonitorContext)

export { MonitorContextProvider, useMonitor }
