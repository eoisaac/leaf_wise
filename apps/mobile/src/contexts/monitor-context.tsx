import { MonitorModel } from '@/database/models/monitor-model'
import { monitorRepository } from '@/database/repositories/monitor-repository'
import { useMQTT } from '@/hooks/use-mqtt'
import React, { useContext } from 'react'

interface MonitorContext {
  monitors: MonitorModel[]
  selectedMonitor: MonitorModel | null

  flushMonitors: () => void
}

interface MonitorContextProviderProps {
  children: React.ReactNode
}

const MonitorContext = React.createContext({} as MonitorContext)

const MonitorContextProvider = (props: MonitorContextProviderProps) => {
  const [monitors, setMonitors] = React.useState<MonitorModel[]>([])
  const [monitorTopic, setMonitorTopic] = React.useState<string>('')
  const [selectedMonitor, setSelectedMonitor] =
    React.useState<MonitorModel | null>(null)

  const mqtt = useMQTT()

  React.useEffect(() => {
    const monitorsSubscription = monitorRepository
      .observeAll()
      .subscribe((monitors) => setMonitors(monitors))

    const selectedMonitorSubscription = monitorRepository
      .observeSelected()
      .subscribe((monitors) => {
        const monitor = monitors[0] ?? null
        if (!monitor) return

        setSelectedMonitor(monitor)
        mqtt.unsubscribe(monitorTopic)
        setMonitorTopic(monitor.id)
      })

    return () => {
      monitorsSubscription.unsubscribe()
      selectedMonitorSubscription.unsubscribe()
    }
  }, [])

  const flushMonitors = () => {
    setMonitors([])
    setSelectedMonitor(null)
    setMonitorTopic('')
  }

  return (
    <MonitorContext.Provider
      value={{
        monitors,
        selectedMonitor,

        flushMonitors,
      }}
    >
      {props.children}
    </MonitorContext.Provider>
  )
}

const useMonitor = () => useContext(MonitorContext)

export { MonitorContextProvider, useMonitor }
