import {Component} from 'react'
import './index.css'

const initialState = {
  isActive: false,
  timerInMinute: 25,
  timerInSeconds: 0,
}

// Write your code here
class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  tikTok = () => {
    const {timerInMinute, timerInSeconds} = this.state
    const isTimerCompleted = timerInSeconds === timerInMinute * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isActive: false})
    } else {
      this.setState(prevState => ({
        timerInSeconds: prevState.timerInSeconds + 1,
      }))
    }
  }

  onChangePlayPauseBtn = () => {
    const {isActive, timerInMinute, timerInSeconds} = this.state
    const isTimerCompleted = timerInSeconds === timerInMinute * 60

    if (isTimerCompleted) {
      this.setState({timerInSeconds: 0})
    }

    if (isActive) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.tikTok, 1000)
    }

    this.setState(prevState => ({
      isActive: !prevState.isActive,
    }))
  }

  getElapsedTime = () => {
    const {timerInMinute, timerInSeconds} = this.state
    const totalTimeRemaining = timerInMinute * 60 - timerInSeconds
    const minutes = Math.floor(totalTimeRemaining / 60)
    const seconds = Math.floor(totalTimeRemaining % 60)

    const stringifyMinutes = minutes < 10 ? `0${minutes}` : minutes
    const stringifyseconds = seconds < 10 ? `0${seconds}` : seconds

    return `${stringifyMinutes} : ${stringifyseconds}`
  }

  onDecrementMinutes = () => {
    const {timerInMinute} = this.state
    if (timerInMinute === 0) {
      this.setState({
        timerInMinute: 0,
      })
    } else {
      this.setState(prevState => ({
        timerInMinute: prevState.timerInMinute - 1,
      }))
    }
  }

  onIncrementMinutes = () => {
    this.setState(prevState => ({
      timerInMinute: prevState.timerInMinute + 1,
    }))
  }

  onResetTimerAndStatus = () => {
    this.setState({timerInMinute: 25, timerInSeconds: 0, isActive: false})
    this.clearTimerInterval()
  }

  render() {
    const {isActive, timerInMinute} = this.state
    const image = isActive
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altValue = isActive ? 'pause icon' : 'play icon'

    const startPauseOption = isActive ? 'Pause' : 'Start'
    const runningPause = isActive ? 'Running' : 'Paused'

    return (
      <div className="digital-Timer-bg-container">
        <h1 className="digital-Timer-heading">Digital Timer</h1>
        <div className="digital-timer-card-container">
          <div className="digital-timer-container">
            <div className="timer-container">
              <h1 className="timer-para">
                {this.getElapsedTime()} <br />
                <span className="status-para">{runningPause}</span>
              </h1>
            </div>
          </div>
          <div className="reset-start-pause-container">
            <div className="start-pause-btn-container">
              <button
                className="start-pause-btn"
                type="button"
                onClick={this.onChangePlayPauseBtn}
              >
                <img src={image} alt={altValue} className="img-size" />
              </button>
              <p className="btn-para">{startPauseOption}</p>
              <button className="reset-btn" type="button">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="reset-img-size"
                  onClick={this.onResetTimerAndStatus}
                />
              </button>
              <p className="reset-btn-para">Reset</p>
            </div>
            <p className="set-timer-limit-para">Set Timer Limit</p>
            <div className="plus-minus-symbol-container">
              <button
                className="minus-btn"
                type="button"
                onClick={this.onDecrementMinutes}
                disabled={isActive}
              >
                -
              </button>
              <p className="number-para">{timerInMinute}</p>
              <button
                className="plus-btn"
                type="button"
                onClick={this.onIncrementMinutes}
                disabled={isActive}
              >
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
