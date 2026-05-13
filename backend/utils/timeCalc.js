function calculateHours(startTime, endTime, addExtra12Hours = false) {

    if (!startTime || !endTime) return 0;
  
    const [sh, sm] = startTime.split(":").map(Number);
    const [eh, em] = endTime.split(":").map(Number);
  
    if (
      isNaN(sh) || isNaN(sm) ||
      isNaN(eh) || isNaN(em)
    ) {
      return 0; // 🔥 prevent NaN crash
    }
  
    let start = sh * 60 + sm;
    let end = eh * 60 + em;
  
    // overnight handling
    if (end <= start) {
      end += 24 * 60;
    }
  
    let diff = end - start;
  
    if (addExtra12Hours === true) {
      diff += 12 * 60;
    }
  
    const hours = diff / 60;
  
    return Number(hours.toFixed(2)); // 🔥 IMPORTANT: return NUMBER not string
  }
  
  module.exports = calculateHours;