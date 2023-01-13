import {Component} from 'react'
import './index.css'
import {format} from 'date-fns'
// Write your code here
class DigitalTimer extends Component {
  state = {isActive: false, date: new Date()}

  onChangePlayPauseImg = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive,
    }))
  }

  render() {
    const {isActive, date} = this.state
    const newDate = format(date, 'yyyy:MM:dd h:mm')
    console.log(newDate)
    const image = isActive
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startPauseOption = isActive ? 'Pause' : 'Start'

    return (
      <div className="digital-Timer-bg-container">
        <h1 className="digital-Timer-heading">Digital Timer</h1>
        <div className="digital-timer-card-container">
          <div className="digital-timer-container">
            <div className="timer-container">
              <p className="timer-para">
                {newDate.toLocalTimeString()} <br />
                <span className="status-para">status</span>
              </p>
            </div>
          </div>
          <div className="reset-start-pause-container">
            <div className="start-pause-btn-container">
              <button
                className="start-pause-btn"
                type="button"
                onClick={this.onChangePlayPauseImg}
              >
                <img src={image} alt="play icon" className="img-size" />
              </button>
              <p className="btn-para">{startPauseOption}</p>
              <button className="reset-btn" type="button">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="reset-img-size"
                />
              </button>
              <p className="reset-btn-para">Reset</p>
            </div>
            <p className="set-timer-limit-para">Set Timer Limit</p>
            <div className="plus-minus-symbol-container">
              <button className="minus-btn" type="button">
                -
              </button>
              <p className="number-para">45</p>
              <button className="plus-btn" type="button">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
