# MeetingTax

Meetings are the largest invisible line item in any company: eight people in a room
for an hour is $700 of payroll, and it shows up in no budget. MeetingTax puts the
meter on the wall - a live cost ticker for the meeting happening right now, with the
blended hourly rate, per-person cost, the annualized damage if it runs weekly, and
a verdict when it ends: cheap enough, normal, pricey, or should have been an email.

- Live per-second cost ticker for the meeting in progress
- Role presets (intern through exec) with editable counts
- Blended hourly rate, per-person cost, annualized cost for recurring meetings
- End-of-meeting verdict tiers
- No signup, nothing to install - pure static HTML/JS; attendees persist in `localStorage`
- `engine.js` holds the cost math as pure functions, shared between the app and
  node tests

## Use it

Open `index.html`, or visit the deployed site.

## Run locally

Any static server works:

```
python3 -m http.server
```

Then open http://localhost:8000/.

## Engine tests

The node suite covers salary-to-hourly conversion, per-second rate and
accumulation, headcount and blended rate, annualization, empty meetings, and every
verdict boundary ($100 / $500 / $2000).
