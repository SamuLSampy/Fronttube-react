function convertTime(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)

    if(!match) return { sec: 0, min: 0, hour: 0, concat: "AO VIVO", live: true}
    const sec = (match[3] || '').replace('S', '') || 0;
    const min = (match[2] || '').replace('M', '') || 0;
    const hour = (match[1] || '').replace('H', '') || 0;
    const concat = () => {
        const format = (num) => String(num).padStart(2, '0');

        if (hour > 0) {
          return `${hour}:${format(min)}:${format(sec)}`;
        }
        return `${min}:${format(sec)}`;
    }
    return {sec: sec, min: min, hour: hour, concat: concat(), live: false}
}

export default convertTime
