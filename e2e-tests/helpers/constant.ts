export class Constant {
  static readonly TIMEOUT = 20000;
  uniqueValue() {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; // months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const hour = dateObj.getUTCHours();
    const min = dateObj.getUTCMinutes();
    const sec = dateObj.getUTCSeconds();
    const dateString = '' + day + month + year + hour + min + sec;
    return dateString;
  }

  randomFutureDay() {
    const min = new Date(); // today
    const max = new Date().setDate(min.getDate() + 2 * 365); // 5 years ahead
    const dateObj = this.randomDate(min, max);
    const month = dateObj.getUTCMonth() + 1; // months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const dateString = '' + month + '/' + day + '/' + year;
    return dateString;
  }

  randomDate(start, end) {
    const date = new Date(+start + Math.random() * (end - start));
    return date;
  }
  getTime() {
    return new Date()
      .toISOString()
      .replace('T', ' ')
      .replace('Z', '');
  }
  getTimeInSting() {
    return new Date()
      .toISOString()
      .replace('T', '')
      .replace(/\..*$/, '')
      .replace(/:/g, '')
      .replace(/-/g, '');
  }
}
