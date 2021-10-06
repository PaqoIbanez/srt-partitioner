const srtTimestamp = (seconds) => {
    let $milliseconds = seconds*1000;
    
    $seconds = Math.floor($milliseconds / 1000);
    $minutes = Math.floor($seconds / 60);
    $hours = Math.floor($minutes / 60);
    $milliseconds = $milliseconds % 1000;
    $seconds = $seconds % 60;
    $minutes = $minutes % 60;
    return ($hours < 10 ? '0' : '') + $hours + ':'
         + ($minutes < 10 ? '0' : '') + $minutes + ':'
         + ($seconds < 10 ? '0' : '') + $seconds + ','
         + ($milliseconds < 100 ? '0' : '') + ($milliseconds < 10 ? '0' : '') + $milliseconds;
}

const toSeconds = (time) => {
    const t = time.split(':')
  
    try {
      let s = t[2].split(',')
  
      if (s.length === 1) {
        s = t[2].split('.')
      }
  
      return parseFloat(t[0], 10) * 3600 + parseFloat(t[1], 10) * 60 + parseFloat(s[0], 10) + parseFloat(s[1], 10) / 1000
    } catch (e) {
      return 0
    }
}

module.exports = {
    srtTimestamp,
    toSeconds
}