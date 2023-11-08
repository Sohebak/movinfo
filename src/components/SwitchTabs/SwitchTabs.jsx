import {useState} from 'react'
import "./styles.scss"

const SwitchTabs = ({data, onTabChange}) => {

  const [selectedTab, setSelectedTab] = useState(0)
  const [left, setleft] = useState(0)

  const activeTab = (tab, index) => {
    setleft(index * 100)
    setTimeout(() => {
      setSelectedTab(index)
    }, 300);
    onTabChange(tab, index)
  }

  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((tab, index) => (
          <span 
            key={index} 
            className={`tabItem ${selectedTab === index ? "active" : ""}`} 
            onClick={() => activeTab(tab, index)} 
          >
            {tab}
          </span>
        ))}
        <span className="movingBg" style={{left}} />
      </div>
    </div>
  )
}

export default SwitchTabs