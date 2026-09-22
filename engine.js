/* MeetingTax engine - pure functions for meeting cost math. */
(function (root) {
  'use strict';

  // work year: 52 weeks * 40 hours
  function salaryToHourly(annual) { return annual / 2080; }

  // attendees: [{role, count, hourly}]
  function ratePerSecond(attendees) {
    return attendees.reduce(function (s, a) {
      return s + (Number(a.count) || 0) * (Number(a.hourly) || 0);
    }, 0) / 3600;
  }

  function cost(attendees, seconds) {
    return ratePerSecond(attendees) * seconds;
  }

  function headcount(attendees) {
    return attendees.reduce(function (s, a) { return s + (Number(a.count) || 0); }, 0);
  }

  // per-person-per-hour blended rate (what the "average seat" costs)
  function blendedHourly(attendees) {
    var hc = headcount(attendees);
    if (!hc) return 0;
    return attendees.reduce(function (s, a) {
      return s + (Number(a.count) || 0) * (Number(a.hourly) || 0);
    }, 0) / hc;
  }

  // what a recurring meeting costs per year
  function annualized(attendees, secondsPerMeeting, meetingsPerWeek) {
    return cost(attendees, secondsPerMeeting) * meetingsPerWeek * 52;
  }

  function verdict(totalCost) {
    if (totalCost < 100) return { tier: 'cheap', label: 'cheap enough' };
    if (totalCost < 500) return { tier: 'normal', label: 'normal meeting' };
    if (totalCost < 2000) return { tier: 'pricey', label: 'pricey - worth an agenda?' };
    return { tier: 'email', label: 'this should have been an email' };
  }

  var api = { salaryToHourly: salaryToHourly, ratePerSecond: ratePerSecond, cost: cost, headcount: headcount, blendedHourly: blendedHourly, annualized: annualized, verdict: verdict };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.MeetingTax = api;
})(typeof window !== 'undefined' ? window : this);
