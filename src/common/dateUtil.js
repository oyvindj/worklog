const findSeparator = (time) => {
  const seps = [':', '.', ',', '-']
  for (const sep of seps) {
    console.log(sep)
    if (time.indexOf(sep) !== -1) {
      return sep
    }
  }
  return null
}

export class MyTime {
  constructor (time) {
    let sep = findSeparator(time)
    if (sep === null) {
      time = time + ':00'
      sep = ':'
    }
    const hours = time.split(sep)[0]
    const min = time.split(sep)[1]
    this.hours = get2Digits(parseInt(hours))
    this.min = get2Digits(parseInt(min))
  }
  getTime () {
    return this.hours + ':' + this.min
  }
}

export const formatDate = (d) => {
  const date = new MyDate(d)
  return date.toString()
}

export const getCurrentTimeString = (date) => {
  const d = new MyDate(date)
  const ds = get2Digits(d.hours) + d.TIME_SEP + get2Digits(d.min)
  console.log(d)
  console.log(ds)
  return ds
}

const get2Digits = (min) => {
  if (min < 10) {
    return '0' + min
  } else {
    return min
  }
}
export const duration = (d1, d2) => {
  return d2 - d1
}
export const formattedDuration = (d1, d2) => {
  const duration = new MyDuration(d1, d2)
  return duration.toString()
}

export class MyDuration {
  HOURS = 'h '
  MIN = 'm '
  SEC = 's '
  constructor (d1, d2) {
    const dur = duration(d1, d2)
    let sec = Math.floor(dur / 1000)
    const millis = dur - (sec * 1000)
    const hours = Math.floor(sec / 3600)
    sec = sec - (hours * 3600)
    const min = Math.floor(sec / 60)
    sec = sec - (min * 60)
    sec = Math.round(sec)
    this.hours = hours
    this.min = min
    this.sec = sec
    this.millis = millis
  }
  toString () {
    return this.hours + this.HOURS + this.min + this.MIN + this.sec + this.SEC
  }
}
export class MyDate {
  DATE_SEP = '.'
  constructor (date) {
    this.TIME_SEP = ':'
    this.date = date
    this.month = date.getMonth() + 1
    this.year = date.getFullYear()
    this.hours = date.getHours()
    this.min = date.getMinutes()
    this.sec = date.getSeconds()
    this.day = date.getDate()
  }
  toString () {
    return this.getDateString() + ' - ' + this.getTimeString()
  }
  getDateString () {
    return get2Digits(this.day) + this.DATE_SEP + get2Digits(this.month) + this.DATE_SEP + this.year
  }
  getTimeString () {
    return get2Digits(this.hours) + this.TIME_SEP + get2Digits(this.min)
  }
}
