
import { useRegisterSW } from 'virtual:pwa-register/react'

function ReloadPrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      
      console.log('SW Registered: ' + r)
    },
    onRegisterError(error) {
      console.log('SW registration error', error)
    },
  })

  const close = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  return (
    <div className="p-0 m-0 w-0 h-0">
      { (offlineReady || needRefresh)
        && <div className="fixed right-0 bottom-0 m-4 p-3 border border-gray-400/30 rounded z-10 text-left shadow-md bg-white text-black">
            <div className="mb-2">
              { offlineReady
                ? <span>App ready to work offline</span>
                : <span>New content available, click on reload button to update.</span>
              }
            </div>
            { needRefresh && <button className="border border-gray-400/30 outline-none mr-2 rounded px-2 py-1" onClick={() => updateServiceWorker(true)}>Reload</button> }
            <button className="border border-gray-400/30 outline-none mr-2 rounded px-2 py-1" onClick={() => close()}>Close</button>
        </div>
      }
    </div>
  )
}

export default ReloadPrompt